import { Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import axios from "axios";
import AuthContext from "../../Components/Store/AuthProvider";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BasicSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext.isLoggedIn) {
    navigate("/sign-in");
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
      username: inputs.username !== "",
    });
    return inputs.username !== "";
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
          `https://localhost:7127/api/users/${authContext.user.id}`,
          JSON.stringify(inputs),
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

  const handleChange = (value) => {
    setInputs({ ...inputs, about: value });
  };

  return (
    <Stack alignItems={"center"} spacing={4}>
      <TextField
        sx={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
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
      <ReactQuill
        value={inputs.about}
        onChange={handleChange}
        style={{
          maxWidth: "450px",
          minWidth: "300px",
          width: "100%",
          height: "150px",
          marginBottom: "30px",
        }}
      />

      {/* <div
        style={{ color: "black", "&p": { margin: 0 } }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div>{text.replace(/<[^>]+>/g, " ")}</div> */}

      <ButtonWithLoading
        onClick={onSubmit}
        isLoading={isLoading}
        label={"Update"}
      />
    </Stack>
  );
};

export default BasicSection;
