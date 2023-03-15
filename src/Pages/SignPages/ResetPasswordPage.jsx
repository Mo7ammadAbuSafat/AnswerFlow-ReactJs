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
import { useNavigate } from "react-router-dom";
import SignContainer from "./SignContainer";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();
  const navigate = useNavigate();
  return (
    <SignContainer>
      <h1>Reset Password</h1>
      <TextField
        sx={{ width: "100%", margin: "10px 0 10px 0" }}
        label="The Code"
        id="outlined"
      />
      <FormControl sx={{ width: "100%", margin: "10px 0" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          New Password
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
          label="New Password"
        />
      </FormControl>
      <FormControl sx={{ width: "100%", margin: "10px 0" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm New Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm New Password"
        />
      </FormControl>
      <Button
        sx={{
          textTransform: "none",
          background: "#4489f8",
          margin: "10px 0",
        }}
        variant="contained"
        size="large"
      >
        {"Verify"}
      </Button>
      <p>
        You did't receive the code?{" "}
        <span /*onClick={() => resendToken()}*/>Resend</span>
      </p>
    </SignContainer>
  );
};

export default ResetPasswordPage;
