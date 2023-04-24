import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const ReportActionMenu = ({
  reportId,
  reportStatus,
  contentType,
  handleTrigger,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseClick = async () => {
    setIsLoading(true);
    await axios
      .put(`https://localhost:7127/api/reports/${contentType}s/${reportId}`)
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    handleClose();
    handleTrigger();
    setIsLoading(false);
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          disabled={reportStatus === 1 || isLoading}
          onClick={handleCloseClick}
        >
          Close Report
        </MenuItem>
        {/* <MenuItem onClick={() => console.log(id)}>
          Block user from posting
        </MenuItem>
        <MenuItem onClick={() => console.log(id)}>Send Email To</MenuItem> */}
      </Menu>
    </>
  );
};

export default ReportActionMenu;
