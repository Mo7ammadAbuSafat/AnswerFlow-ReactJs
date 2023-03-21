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
  return (
    <AlertContext.Provider
      value={{
        successAlert,
        handleOpenSuccessAlert,
        handleCloseSuccessAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
