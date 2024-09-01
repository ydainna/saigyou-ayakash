import api from "@axios/FetchInterceptor";
import forge from "node-forge";

const AuthService: any = {};

// login
AuthService.login = async (data: any) => {
  const res = await api("/admin/login", {
    method: "POST",
    headers: {
      // application/json is the default content type for axios
      Accept: "application/json",
      // application/json is the default content type for axios
      "Content-Type": "application/json",
      // x-public-request is a custom header
      // that allows the request to be made without authentication
      "X-Public-Request": "true",
    },
    data: {
      username: data.username,
      password: forge.md.sha256.create().update(data.password).digest().toHex(),
      token: data.token,
    },
  });
  return res.data;
};

// logout
AuthService.logout = async () => {
  await api("/admin/logout", {
    method: "GET",
  });
};

export default AuthService;
