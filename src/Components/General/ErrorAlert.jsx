import { Snackbar } from "@mui/material";
import React, { forwardRef, useContext } from "react";
import AlertContext from "../Store/AlertProvider";
import MuiAlert from "@mui/material/Alert";

const ErrorAlert = () => {
  const alertStates = useContext(AlertContext);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        open={alertStates.errorAlert}
        autoHideDuration={3000}
        onClose={alertStates.handleCloseErrorAlert}
      >
        <Alert
          onClose={alertStates.handleErrorSuccessAlert}
          severity="error"
          sx={{ width: "300px" }}
        >
          {alertStates.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorAlert;
