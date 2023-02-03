import React from "react";
import ReactDOM from "react-dom/client";
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
