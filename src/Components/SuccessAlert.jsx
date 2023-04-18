import { Snackbar } from "@mui/material";
import React, { forwardRef, useContext } from "react";
import AlertContext from "./Store/AlertProvider";
import MuiAlert from "@mui/material/Alert";

const SuccessAlert = () => {
  const alertStates = useContext(AlertContext);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        open={alertStates.successAlert}
        autoHideDuration={3000}
        onClose={alertStates.handleCloseSuccessAlert}
      >
        <Alert
          onClose={alertStates.handleCloseSuccessAlert}
          severity="success"
          sx={{ width: "300px" }}
        >
          Success
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessAlert;
