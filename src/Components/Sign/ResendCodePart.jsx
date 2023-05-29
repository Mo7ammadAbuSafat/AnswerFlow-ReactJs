import axios from "axios";
import React, { useContext, useState } from "react";
import AlertContext from "../Store/AlertProvider";

const ResendCodePart = ({ email, url }) => {
  const [isLoading2, setIsLoading2] = useState(false);
  const alertStates = useContext(AlertContext);
  const resendCode = async () => {
    setIsLoading2(true);
    await axios
      .post(url, JSON.stringify({ email: email }), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alertStates.handleOpenSuccessAlert();
      })
      .catch((error) => {
        alert("Error: ", error.message);
      });
    setIsLoading2(false);
  };

  return (
    <p>
      You did't receive the code?{" "}
      <span
        style={{
          pointerEvents: isLoading2 ? "none" : "initial",
          color: isLoading2 ? "#757575" : "",
        }}
        onClick={() => resendCode()}
      >
        Resend
      </span>
    </p>
  );
};

export default ResendCodePart;
