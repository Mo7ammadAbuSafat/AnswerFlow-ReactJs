import React, { useContext, useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import axios from "axios";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";

const FormToAddTag = ({ handleClose }) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);

  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(true);
  const [nameValidationMassage, setNameValidationMassage] = useState(" ");

  const [tagUrl, setTagUrl] = useState("");
  const [tagUrlValidation, setTagUrlValidation] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameValidation(true);
    setNameValidationMassage(" ");
  };
  const handleTagUrlChange = (e) => {
    setTagUrl(e.target.value);
    setTagUrlValidation(true);
  };

  const handleAddClick = async () => {
    if (name !== "" && tagUrl !== "") {
      setIsLoading(true);
      const data = {
        name: name,
        sourceLink: tagUrl,
      };
      await axios
        .post(`https://localhost:7127/api/tags`, JSON.stringify(data), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          handleClose();
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.error === "tag already exist") {
              setNameValidation(false);
              setNameValidationMassage("tag already exist");
            } else alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
      setIsLoading(false);
      handleClose();
    } else {
      if (name === "") {
        setNameValidation(false);
      }
      if (tagUrl === "") {
        setTagUrlValidation(false);
      }
    }
  };

  return (
    <Stack
      width={"100%"}
      padding={"20px 20px 0 20px"}
      alignItems={"flex-end"}
      spacing={1}
    >
      <TextField
        sx={{ width: "100%" }}
        id="outlined-multiline-static"
        label="Name"
        onChange={handleNameChange}
        value={name}
        error={!nameValidation}
        helperText={nameValidationMassage}
      />
      <TextField
        sx={{ width: "100%" }}
        id="outlined-multiline-static"
        label="Source Link"
        onChange={handleTagUrlChange}
        value={tagUrl}
        error={!tagUrlValidation}
      />
      <Button width={"100px"} disabled={isLoading} onClick={handleAddClick}>
        {isLoading ? (
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ marginRight: "5px" }}
          />
        ) : (
          "Add"
        )}
      </Button>
    </Stack>
  );
};

export default FormToAddTag;
