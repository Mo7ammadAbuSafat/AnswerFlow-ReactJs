import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../Components/Store/AlertProvider";
import AuthContext from "../../Components/Store/AuthProvider";
import SignContainer from "../../Components/Sign/SignContainer";
import ResendCodePart from "../../Components/Sign/ResendCodePart";
import ButtonWithLoading from "../../Components/Buttons/ButtonWithLoading";
import MyTextField from "../../Components/Inputs/MyTextField";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState(" ");

  const onChange = (e) => {
    var value = e.target.value;
    setCode(value);
    if (value === "") {
      setValidationError("field is not allowed to be empty");
    } else setValidationError(" ");
  };

  const { email } = useParams();

  const onSubmit = async (e) => {
    if (code !== "") {
      setIsLoading(true);
      await axios
        .post(
          `https://localhost:7127/api/verifying-email`,
          JSON.stringify({ email: email, code: code }),
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
          navigate("/feed");
        })
        .catch((error) => {
          if (error.response) {
            var errorMessage = error.response.data.error;
            if (errorMessage === "invalid code") {
              setValidationError(errorMessage);
            } else {
              alert("Error: ", error.message);
            }
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <SignContainer>
      <p style={{ color: "#656464" }}>
        Enter the code that we sent to your email
      </p>
      <MyTextField
        label="The Code"
        name="code"
        onChange={onChange}
        value={code}
        validation={validationError}
      />
      <ButtonWithLoading
        onClick={onSubmit}
        isLoading={isLoading}
        label={"Verify"}
      />
      <ResendCodePart
        email={email}
        url={"https://localhost:7127/api/verification-email-code"}
      />
    </SignContainer>
  );
};

export default VerifyEmailPage;
