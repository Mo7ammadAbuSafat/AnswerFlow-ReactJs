import React, { useContext, useState } from "react";
import AlertContext from "../Store/AlertProvider";
import AuthContext from "../Store/AuthProvider";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import axios from "axios";

const FormAnswer = ({ questionId, handleClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [body, setBody] = useState("");
  const [bodyValidation, setBodyValidation] = useState(true);

  const onChange = (value) => {
    setBody(value);
    setBodyValidation(true);
  };
  const handlePostClick = async () => {
    if (body !== "") {
      setIsLoading(true);
      const data = {
        userId: authContext.user.id,
        body: body,
      };
      await axios
        .post(
          `https://localhost:7127/api/questions/${questionId}/answers`,
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
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
      setIsLoading(false);
      handleClose();
    } else setBodyValidation(false);
  };

  return (
    <Stack
      width={"100%"}
      padding={"10px 20px 0 20px"}
      alignItems={"flex-end"}
      spacing={2}
    >
      <TextField
        sx={{ width: "100%" }}
        id="outlined-multiline-static"
        label="Body"
        name="body"
        onChange={(e) => onChange(e.target.value)}
        value={body}
        error={!bodyValidation}
        multiline
        rows={4}
      />
      <Button width={"100px"} disabled={isLoading} onClick={handlePostClick}>
        {isLoading ? (
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ marginRight: "5px" }}
          />
        ) : (
          "Post"
        )}
      </Button>
    </Stack>
  );
};

export default FormAnswer;
