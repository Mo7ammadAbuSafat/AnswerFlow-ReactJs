import { Button } from "@mui/material";
import React, { useContext } from "react";
import PopUpModal from "./PopUpModal";
import AuthContext from "../Store/AuthProvider";

const PopUpWithButton = ({ name, open, handleOpen, handleClose, children }) => {
  const authContext = useContext(AuthContext);
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
        disabled={!authContext.isLoggedIn}
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
