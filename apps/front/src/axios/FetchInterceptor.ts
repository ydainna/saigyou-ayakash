import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { constants } from "@utils/constants";
import { notify } from "@components/layout-components/Notification/Notification";

type ServiceTypes = {
  baseURL: string;
  timeout: number;
};

const service = axios.create({
  baseURL: constants.API_URL,
  timeout: 10000,
} as ServiceTypes);

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);

    // If no content type header is set, set it to application/json
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // If no accept header is set, set it to application/json
    if (!config.headers["Accept"]) {
      config.headers["Accept"] = "application/json";
    }

    // If a token is set, add it to the request
    if (jwtToken) {
      config.headers[constants.TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
    }

    // If no token is set and the request is not public, reload the page
    if (!jwtToken && !config.headers["X-Public-Request"]) {
      window.location.reload();
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notify.error("Une erreur est survenue, veuillez réessayer");
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is a success, return it directly
    return response;
  },
  (error) => {
    console.log(error);

    // If the response is an error, display the error message
    if (error.response == null) {
      notify.error("Une erreur est survenue, veuillez réessayer");
      return Promise.reject(error);
    }

    // If the response is an error, display the error message
    if (error.response.data != null) {
      let errorStatus = error.response.data.status;
      let errorMessage = error.response.data.message;
      if (errorStatus != null) {
        notify.error(errorStatus);
      }
      if (errorMessage != null) {
        notify.error(errorMessage);
      }
    }

    // Remove token and redirect
    if (error.response.status === 403) {
      localStorage.removeItem(constants.AUTH_TOKEN_KEY);
      window.location.reload();
    }

    // If the response is an error, display the error message
    if (error.response.status === 500) {
      notify.error("Internal server error");
    }

    return Promise.reject(error);
  }
);

export default service;
