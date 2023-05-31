import React from "react";
import { useState, createContext } from "react";

const AlertContext = createContext();

export function AlertContextProvider(props) {
  const [successAlert, setSuccessAlert] = useState(false);
  const handleOpenSuccessAlert = () => {
    setSuccessAlert(true);
  };
  const handleCloseSuccessAlert = () => {
    setSuccessAlert(false);
  };

  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpenErrorAlert = (message) => {
    setErrorAlert(true);
    setErrorMessage(message);
  };
  const handleCloseErrorAlert = () => {
    setErrorAlert(false);
  };
  return (
    <AlertContext.Provider
      value={{
        successAlert,
        handleOpenSuccessAlert,
        handleCloseSuccessAlert,
        errorAlert,
        errorMessage,
        handleOpenErrorAlert,
        handleCloseErrorAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
