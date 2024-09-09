import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import App from "./App";
import AuthProvider from "./auth/AuthProvider";
import { constants } from "@utils/constants";
import "./index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import "@assets/styles/Mui/Alerte.scss";
import "@assets/styles/Mui/Datatable.scss";
import "@assets/styles/Mui/Input.scss";
import "@assets/styles/Mui/Tooltip.scss";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={new QueryClient()}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <React.StrictMode>
          <AuthProvider>
            <ToastContainer />
            <GoogleReCaptchaProvider reCaptchaKey={constants.RECAPTCHA_SITE_KEY}>
              <App />
            </GoogleReCaptchaProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen />
        </React.StrictMode>
      </ThemeProvider>
    </StyledEngineProvider>
  </QueryClientProvider>
);
