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
  (config: InternalAxiosRequestConfig) => {
    const jwtToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);

    // If the request is not public, add the token to the header
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // If the request is not public, add the token to the header
    if (!config.headers["Accept"]) {
      config.headers["Accept"] = "application/json";
    }

    // If the request is not public, add the token to the header
    if (jwtToken) {
      config.headers[constants.TOKEN_PAYLOAD_KEY] = "Bearer " + jwtToken;
    }

    return config;
  },
  (error) => {
    // Do something with request error here
    notify.error("Une erreur est survenue, veuillez réessayer");
    Promise.reject(error);
  }
);

// API Response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // If the token is not valid, remove it from storage
      if (status === 401) {
        localStorage.removeItem(constants.AUTH_TOKEN_KEY);
        notify.error("Votre session a expiré, veuillez vous reconnecter");
      }

      if (status === 403) {
        notify.error("Vous n'avez pas les droits pour effectuer cette action");
      }

      if (status === 500) {
        notify.error("Une erreur est survenue, veuillez réessayer");
      }
    }

    return Promise.reject(error);
  }
);

export default service;
