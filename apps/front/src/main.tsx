import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import App from "./App";
import AuthProvider from "./auth/AuthProvider";
import "./index.scss";
import "react-toastify/dist/ReactToastify.min.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

Sentry.init({
  dsn: "https://ab3fd8e9bbdf47eaace4c1fd5b4c533b@o4504728954470400.ingest.sentry.io/4504728956436480",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
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
