import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AlertContextProvider } from "./Components/Store/AlertProvider";
import { AuthContextProvider } from "./Components/Store/AuthProvider";
import { ThemeProvider } from "@mui/material";
import theme from "./Components/Theme/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AlertContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AlertContextProvider>
  </AuthContextProvider>
);
