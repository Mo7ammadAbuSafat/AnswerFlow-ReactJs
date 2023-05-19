import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import SignContainer from "../../Components/Sign/SignContainer";
import MyTextField from "../../Components/Inputs/MyTextField";
import MyPasswordInputField from "../../Components/Inputs/MyPasswordInputField";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";
import ResendCodePart from "../../Components/Sign/ResendCodePart";

const ResetPasswordPage2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();
  const alertStates = useContext(AlertContext);

  const [inputs, setInputs] = useState({
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    code: " ",
    newPassword: " ",
    confirmNewPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.code === " " &&
      validationErrors.newPassword === " " &&
      validationErrors.confirmNewPassword === " " &&
      inputs.code !== "" &&
      inputs.newPassword !== "" &&
      inputs.confirmNewPassword !== ""
    );
  };

  const ResetPasswordSchema = Joi.object({
    code: Joi.string().required(),
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
    if (CheckValidation) {
      setIsLoading(true);
      await axios
        .put(
          `https://localhost:7127/api/reset-password`,
          JSON.stringify({ email: email, ...inputs }),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          navigate("/signInPage");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (
              errorMessage === "invalid code" ||
              errorMessage === "expired code, we sent another one"
            ) {
              setValidationErrors({
                ...validationErrors,
                code: errorMessage,
              });
            } else {
              alert("Error: ", errorMessage);
            }
            setInputs({ code: "", newPassword: "", confirmNewPassword: "" });
          } else {
            alert("Error: ", error.message);
          }
        });
      setInputs({ ...inputs, newPassword: "", confirmNewPassword: "" });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <MyTextField
        label="The Code"
        name="code"
        onChange={onChange}
        value={inputs.code}
        validation={validationErrors.code}
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
      <ResendCodePart
        email={email}
        url={"https://localhost:7127/api/reset-password-code"}
      />
    </SignContainer>
  );
};

export default ResetPasswordPage2;
