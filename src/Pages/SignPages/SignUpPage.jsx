import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignContainer from "../../Components/Sign/SignContainer";
import MyTextField from "../../Components/Sign/MyTextField";
import MyPasswordInputField from "../../Components/Sign/MyPasswordInputField";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    username: " ",
    password: " ",
    confirmPassword: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.email === " " &&
      validationErrors.username === " " &&
      validationErrors.password === " " &&
      validationErrors.confirmPassword === " " &&
      inputs.email !== "" &&
      inputs.username !== "" &&
      inputs.password !== "" &&
      inputs.confirmPassword !== ""
    );
  };

  const signUpSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
    username: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string().equal(inputs.password).required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = signUpSchema.extract(name).validate(value);
    if (validation.error) {
      if (name === "confirmPassword") {
        setValidationErrors({
          ...validationErrors,
          [name]: "field must match Password",
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
        .post(
          "https://localhost:7127/api/registration",
          JSON.stringify(inputs),
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          navigate(`/verify-email/${inputs.email}`);
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "this email is already exist") {
              setValidationErrors({
                ...validationErrors,
                email: errorMessage,
              });
            }
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
        value={inputs.email}
        validation={validationErrors.email}
      />
      <MyTextField
        label="Username"
        name="username"
        onChange={onChange}
        value={inputs.username}
        validation={validationErrors.username}
      />
      <MyPasswordInputField
        name={"password"}
        label={"Password"}
        value={inputs.password}
        onChange={onChange}
        validation={validationErrors.password}
      />
      <MyPasswordInputField
        name={"confirmPassword"}
        label={"Confirm Password"}
        value={inputs.confirmPassword}
        onChange={onChange}
        validation={validationErrors.confirmPassword}
      />
      <ButtonWithLoading
        onClick={onSubmit}
        isLoading={isLoading}
        label={"Sign Up"}
      />
      <p style={{ marginBottom: "0" }}>
        You have an account?{" "}
        <span onClick={() => navigate("/sign-in")}>Sign In</span>
      </p>
    </SignContainer>
  );
};

export default SignUpPage;
