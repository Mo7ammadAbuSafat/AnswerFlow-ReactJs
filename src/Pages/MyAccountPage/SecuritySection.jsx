import { Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import AlertContext from "../../Components/Store/AlertProvider";
import Joi from "joi";
import axios from "axios";
import AuthContext from "../../Components/Store/AuthProvider";
import { useNavigate } from "react-router-dom";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";
import MyPasswordInputField from "../../Components/Inputs/MyPasswordInputField";

const SecuritySection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext.isLoggedIn) {
    navigate("/signInPage");
  }

  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    oldPassword: " ",
    newPassword: " ",
    confirmNewPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.oldPassword === " " &&
      validationErrors.newPassword === " " &&
      validationErrors.confirmNewPassword === " " &&
      inputs.oldPassword !== "" &&
      inputs.newPassword !== "" &&
      inputs.confirmNewPassword !== ""
    );
  };

  const ResetPasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(20).required(),
    confirmNewPassword: Joi.string().equal(inputs.newPassword).required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = ResetPasswordSchema.extract(name).validate(value);
    if (validation.error) {
      if (name === "confirmNewPassword") {
        setValidationErrors({
          ...validationErrors,
          [name]: "field must match New Password",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          [name]: validation.error.details[0].message.replace(
            '"value"',
            "field"
          ),
        });
      }
    } else {
      const err = { ...validationErrors };
      err[name] = " ";
      setValidationErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    if (CheckValidation()) {
      setIsLoading(true);
      await axios
        .put(
          `https://localhost:7127/api/users/${authContext.user.id}/change-password`,
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
          setInputs({
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          alertStates.handleOpenSuccessAlert();
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "password is not correct") {
              setValidationErrors({
                ...validationErrors,
                oldPassword: "incorrect password",
              });
            } else {
              alert("Error: ", errorMessage);
            }
          } else {
            alert("Error:1 ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <Stack alignItems={"center"}>
      <Stack
        alignItems={"center"}
        spacing={3}
        width={"100%"}
        maxWidth={"450px"}
      >
        <MyPasswordInputField
          name={"oldPassword"}
          label={"Old Password"}
          value={inputs.oldPassword}
          onChange={onChange}
          validation={validationErrors.oldPassword}
        />
        <MyPasswordInputField
          name={"newPassword"}
          label={"New Password"}
          value={inputs.newPassword}
          onChange={onChange}
          validation={validationErrors.newPassword}
        />
        <MyPasswordInputField
          name={"confirmNewPassword"}
          label={"Confirm New Password"}
          value={inputs.confirmNewPassword}
          onChange={onChange}
          validation={validationErrors.confirmNewPassword}
        />
        <ButtonWithLoading
          onClick={onSubmit}
          isLoading={isLoading}
          label={"Reset Password"}
        />
      </Stack>
    </Stack>
  );
};

export default SecuritySection;
