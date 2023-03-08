import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Sign.module.css";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();

  return (
    <div className={styles.sign}>
      <div className={styles.container}>
        <img
          onClick={() => navigate("/")}
          src="/Assets/AnswerFlowBlueSign.png"
          alt=""
        />
        <h1>Sign In</h1>
        <TextField
          sx={{ width: "100%", margin: "10px 0 10px 0" }}
          label="Email"
          id="outlined"
        />

        <FormControl
          sx={{ width: "100%", margin: "10px 0" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button
          sx={{ background: "#4489f8", margin: "10px 0" }}
          variant="contained"
          size="large"
        >
          {"Sign In"}
        </Button>
        <p>
          You don't have account?{" "}
          <span onClick={() => navigate("/signUpPage")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
