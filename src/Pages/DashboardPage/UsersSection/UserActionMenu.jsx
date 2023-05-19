import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import PopUpModal from "../../../Components/Popup/PopUpModal";
import FormToEditRole from "./FormToEditRole";
import { useContext } from "react";
import AuthContext from "../../../Components/Store/AuthProvider";

const UserActionMenu = ({
  userId,
  userType,
  isBlockedFromPosting,
  handleTrigger,
}) => {
  const authContext = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openEditRolePopup, setOpenEditRolePopup] = useState(false);
  const handleEditRoleClick = () => {
    setOpenEditRolePopup(true);
    handleClose();
  };
  const handleCloseEditRolePopup = () => {
    setOpenEditRolePopup(false);
  };

  const handleBlockClick = async () => {
    await axios
      .put(
        `https://localhost:7127/api/users/${userId}/posting-permissions?newValue=${!isBlockedFromPosting}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        handleTrigger();
        handleClose();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
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
          disabled={userId === authContext.user.id}
          onClick={handleEditRoleClick}
        >
          Change Role
        </MenuItem>
        <MenuItem
          disabled={userType === 2 || userType === 3}
          onClick={handleBlockClick}
        >
          {isBlockedFromPosting ? "Unblock" : "Block"}
        </MenuItem>
      </Menu>
      <PopUpModal
        name={"Change Role"}
        open={openEditRolePopup}
        fullWidth={false}
        handleClose={handleCloseEditRolePopup}
      >
        <FormToEditRole
          userId={userId}
          userType={userType}
          handleTrigger={handleTrigger}
          onClose={handleCloseEditRolePopup}
        />
      </PopUpModal>
    </>
  );
};

export default UserActionMenu;
