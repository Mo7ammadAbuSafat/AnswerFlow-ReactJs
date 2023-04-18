import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import axios from "axios";
import AuthContext from "../../Components/Store/AuthProvider";

const BasicSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext.isLoggedIn) {
    navigate("/signInPage");
  }

  const [inputs, setInputs] = useState({
    username: authContext.user.username,
    about: authContext.user.about,
  });

  const [validation, setValidation] = useState({
    username: true,
    about: true,
  });

  const validateInputs = () => {
    setValidation({
      about: inputs.about !== "",
      username: inputs.username !== "",
    });
    return inputs.username !== "" && inputs.about !== "";
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    const isValid = value !== "";
    if (isValid) {
      setValidation({
        ...validation,
        [name]: true,
      });
    } else {
      setValidation({
        ...validation,
        [name]: false,
      });
    }
  };
  const onSubmit = async (e) => {
    if (validateInputs()) {
      setIsLoading(true);
      await axios
        .put(
          `https://localhost:7127/api/users/${authContext.user.id}/user-information`,
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          authContext.login(response.data);
          alertStates.handleOpenSuccessAlert();
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

  return (
    <Stack alignItems={"center"} spacing={4}>
      <TextField
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
          marginTop: "40px",
        }}
        id="outlined"
        disabled
        value={authContext.user.email}
      />
      <TextField
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
        }}
        label="Username"
        name="username"
        id="outlined"
        onChange={onChange}
        value={inputs.username}
        error={!validation.username}
      />
      <TextField
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
        }}
        id="outlined-multiline-static"
        label="Bio"
        name="about"
        onChange={onChange}
        value={inputs.about}
        error={!validation.about}
        multiline
        rows={5}
      />
      <Button
        sx={{
          height: "40px",
          background: "#4489f8",
          textTransform: "none",
        }}
        variant="contained"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress
            color="inherit"
            size={16}
            sx={{ marginRight: "5px" }}
          />
        ) : (
          "Update"
        )}
      </Button>
    </Stack>
  );
};

export default BasicSection;
