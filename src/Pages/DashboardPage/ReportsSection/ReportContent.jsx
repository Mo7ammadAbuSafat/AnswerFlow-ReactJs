import { Button } from "@mui/material";
import React, { useState } from "react";
import PopUpModal from "../../../Components/Popup/PopUpModal";

const ReportContent = ({ contentType, children }) => {
  const [openContentPopup, setOpenContentPopup] = useState(false);
  const handleContentClick = () => {
    setOpenContentPopup(true);
  };
  const handleCloseContentPopup = () => {
    setOpenContentPopup(false);
  };

  return (
    <>
      <Button
        onClick={handleContentClick}
        size="small"
        variant="outlined"
        sx={{ fontSize: 12, width: "85px" }}
      >
        {contentType}
      </Button>
      <PopUpModal
        name={contentType}
        open={openContentPopup}
        fullWidth={true}
        handleClose={handleCloseContentPopup}
      >
        {children}
      </PopUpModal>
    </>
  );
};

export default ReportContent;
