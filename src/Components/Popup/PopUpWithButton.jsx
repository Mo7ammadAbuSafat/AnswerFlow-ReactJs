import { Button } from "@mui/material";
import React, { useContext } from "react";
import PopUpModal from "./PopUpModal";
import AuthContext from "../Store/AuthProvider";

const PopUpWithButton = ({
  isForExpert,
  name,
  open,
  handleOpen,
  handleClose,
  children,
}) => {
  const authContext = useContext(AuthContext);

  var disabledButton = true;
  if (authContext.isLoggedIn) {
    if (isForExpert !== null && isForExpert) {
      disabledButton = !(authContext.user.type === 2);
    } else disabledButton = false;
  }
  return (
    <>
      <Button
        sx={{
          width: "100%",
          height: "45px",
          background: "#4489f8",
          textTransform: "none",
        }}
        onClick={() => handleOpen()}
        variant="contained"
        size="medium"
        disabled={disabledButton}
      >
        {name}
      </Button>
      <PopUpModal
        name={name}
        open={open}
        fullWidth={true}
        handleClose={handleClose}
      >
        {children}
      </PopUpModal>
    </>
  );
};

export default PopUpWithButton;
