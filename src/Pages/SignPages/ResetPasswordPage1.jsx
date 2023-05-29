import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import SignContainer from "../../Components/Sign/SignContainer";
import MyTextField from "../../Components/Inputs/MyTextField";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";

const ResetPasswordPage1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidationError, setEmailValidationError] = useState(" ");
  const alertStates = useContext(AlertContext);

  const CheckValidation = () => {
    return emailValidationError === " " && email !== "";
  };

  const emailSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
  });

  const onChange = (e) => {
    const { value } = e.target;
    const validation = emailSchema.extract("email").validate(value);
    if (validation.error) {
      setEmailValidationError(
        validation.error.details[0].message.replace('"value"', "field")
      );
    } else {
      setEmailValidationError(" ");
    }
    setEmail(value);
  };

  const onSubmit = async (e) => {
    if (CheckValidation) {
      setIsLoading(true);
      await axios
        .post(
          `https://localhost:7127/api/reset-password-code`,
          JSON.stringify({ email: email }),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          navigate(`/reset-password/${email}`);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            setEmailValidationError(errorMessage);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <MyTextField
        label="Email"
        name="email"
        onChange={onChange}
        value={email}
        validation={emailValidationError}
      />
      <ButtonWithLoading
        onClick={onSubmit}
        isLoading={isLoading}
        label={"Send Code"}
      />
    </SignContainer>
  );
};

export default ResetPasswordPage1;
