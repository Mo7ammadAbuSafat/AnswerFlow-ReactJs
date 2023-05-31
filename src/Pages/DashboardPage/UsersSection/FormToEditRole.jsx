import { Box, MenuItem, Select } from "@mui/material";
import React, { useContext, useState } from "react";
import ButtonWithLoading from "../../../Components/Buttons/ButtonWithLoading";
import axios from "axios";
import AuthContext from "../../../Components/Store/AuthProvider";
import AlertContext from "../../../Components/Store/AlertProvider";

const FormToEditRole = ({ userId, userType, handleTrigger, onClose }) => {
  const authContext = useContext(AuthContext);
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(null);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEditRoleClick = async () => {
    setIsLoading(true);
    await axios
      .put(
        `https://localhost:7127/api/users/${userId}/roles?newType=${role}`,
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
        alertStates.handleOpenSuccessAlert();
        handleTrigger();
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          alertStates.handleOpenErrorAlert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <Box width="300px" height={"150px"}>
        <Select
          id="demo-simple-select"
          value={role}
          onChange={handleRoleChange}
          sx={{ height: "45px", width: "90%", margin: "15px 15px 15px 0" }}
        >
          <MenuItem disabled={userType === 1} value={1}>
            Normal User
          </MenuItem>
          <MenuItem disabled={userType === 2} value={2}>
            Expert
          </MenuItem>
          <MenuItem disabled={userType === 3} value={3}>
            Admin
          </MenuItem>
        </Select>
        <ButtonWithLoading
          isLoading={isLoading}
          onClick={handleEditRoleClick}
          label={"Edit"}
        />
      </Box>
    </>
  );
};

export default FormToEditRole;
