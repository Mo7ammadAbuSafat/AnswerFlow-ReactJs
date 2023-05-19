import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import AuthContext from "../../../Components/Store/AuthProvider";

const ReportActionMenu = ({ reportId, reportStatus, type, handleTrigger }) => {
  const authContext = useContext(AuthContext);
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
      .put(
        `https://localhost:7127/api/${type}-reports/${reportId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      )
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
      </Menu>
    </>
  );
};

export default ReportActionMenu;
