import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

Sentry.init({
  dsn: constants.SENTRY_DSN as string,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["all"],
    }),
    new Sentry.Replay(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={new QueryClient()}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <React.StrictMode>
          <AuthProvider>
            <ToastContainer />
            <App />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen />
        </React.StrictMode>
      </ThemeProvider>
    </StyledEngineProvider>
  </QueryClientProvider>
);
