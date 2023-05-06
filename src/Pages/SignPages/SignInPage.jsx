import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";
import SignContainer from "../../Components/Sign/SignContainer";
import MyPasswordInputField from "../../Components/Sign/MyPasswordInputField";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";
import MyTextField from "../../Components/Sign/MyTextField";

const SignInPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: " ",
    password: " ",
  });

  const CheckValidation = () => {
    return (
      validationErrors.email === " " &&
      validationErrors.password === " " &&
      inputs.email !== "" &&
      inputs.password !== ""
    );
  };

  const signInSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      }),
    password: Joi.string().required(),
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = signInSchema.extract(name).validate(value);
    if (validation.error) {
      setValidationErrors({
        ...validationErrors,
        [name]: validation.error.details[0].message.replace('"value"', "field"),
      });
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
        .post("https://localhost:7127/api/login", JSON.stringify(inputs), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          authContext.login(response.data);
          alertStates.handleOpenSuccessAlert();
          navigate("/feedPage");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "password is not correct") {
              setValidationErrors({
                ...validationErrors,
                password: errorMessage,
              });
            } else if (errorMessage === "no user with this email") {
              setValidationErrors({
                ...validationErrors,
                email: errorMessage,
              });
            } else if (errorMessage === "you must verify your email") {
              axios
                .get(`https://localhost:7127/api/users?email=${inputs.email}`)
                .then((response) => {
                  navigate(`/verify-email/${inputs.email}`);
                });
            } else console.log(error);
          } else {
            console.log(error);
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
        value={inputs.email}
        validation={validationErrors.email}
      />
      <MyPasswordInputField
        name={"password"}
        label={"Password"}
        value={inputs.password}
        onChange={onChange}
        validation={validationErrors.password}
      />
      <ButtonWithLoading
        onClick={onSubmit}
        isLoading={isLoading}
        label={"Login"}
      />
      <p>
        Forget Password?{" "}
        <span onClick={() => navigate("/reset-password-code")}>
          Reset Password
        </span>
      </p>
      <p style={{ marginBottom: "0" }}>
        You don't have an account?{" "}
        <span onClick={() => navigate("/sign-up")}>Sign Up</span>
      </p>
    </SignContainer>
  );
};

export default SignInPage;
