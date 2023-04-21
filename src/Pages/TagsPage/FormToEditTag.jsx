import React, { useContext, useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import axios from "axios";
import AlertContext from "../../Components/Store/AlertProvider";

const FormToEditTag = ({ tag, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);

  const [name, setName] = useState(tag.name);
  const [nameValidation, setNameValidation] = useState(true);
  const [nameValidationMassage, setNameValidationMassage] = useState(" ");

  const [tagUrl, setTagUrl] = useState(tag.sourceLink);
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
        .put(
          `https://localhost:7127/api/tags/${tag.id}`,
          JSON.stringify(data),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
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
          "Edit"
        )}
      </Button>
    </Stack>
  );
};

export default FormToEditTag;
