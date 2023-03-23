import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AlertContextProvider } from "./Components/Store/AlertProvider";
import { AuthContextProvider } from "./Components/Store/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </AuthContextProvider>
);
