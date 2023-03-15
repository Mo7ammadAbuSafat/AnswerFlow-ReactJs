import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormStepper from "./FormStepper";

export const Custom = ({ onClose }) => {
  return (
    <DialogTitle>
      Post a question
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 12,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

const PopUpModal = ({ handleClose, open }) => {
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <Custom onClose={handleClose} />
        <DialogContent>
          <FormStepper onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PopUpModal;
