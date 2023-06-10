import React from "react";
import { useState } from "react";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";
import { useContext } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";

const ProfilePhotoSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = () => {
    if (authContext.user.image !== null) {
      onChangePhoto();
    } else {
      onAddPhoto();
    }
  };

  const onChangePhoto = async (e) => {
    if (file !== null) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .put(
          `https://localhost:7127/api/users/${authContext.user.id}/profile-picture`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          authContext.refreshUser();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            var errorMessage = error.response.data.error;
            alert("Error: ", errorMessage);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  const onAddPhoto = async (e) => {
    if (file !== null) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .post(
          `https://localhost:7127/api/users/${authContext.user.id}/profile-picture`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          authContext.refreshUser();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            var errorMessage = error.response.data.error;
            alert("Error: ", errorMessage);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  const onDelete = async (e) => {
    if (authContext.user.image !== null) {
      setIsLoading2(true);
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .delete(
          `https://localhost:7127/api/users/${authContext.user.id}/profile-picture`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          authContext.refreshUser();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            var errorMessage = error.response.data.error;
            alert("Error: ", errorMessage);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading2(false);
  };
  return (
    <Stack spacing={3} alignItems={"center"}>
      <img
        style={{ borderRadius: "50%", objectFit: "cover" }}
        width={"250px"}
        height={"250px"}
        alt=""
        src={
          authContext.user.image !== null &&
          authContext.user.image.imagePath !== null
            ? authContext.user.image.imagePath
            : "/Assets/defaultAvatar.png"
        }
      />
      <input type="file" onChange={handleFileChange} />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <ButtonWithLoading
          onClick={onDelete}
          isLoading={isLoading2}
          label={"Delete Photo"}
        />
        <ButtonWithLoading
          onClick={onSubmit}
          isLoading={isLoading}
          label={"Update"}
        />
      </Stack>
    </Stack>
  );
};

export default ProfilePhotoSection;
