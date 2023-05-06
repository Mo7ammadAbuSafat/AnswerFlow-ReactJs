import { TextField } from "@mui/material";
import React from "react";

const MyTextField = ({ name, label, value, onChange, validation }) => {
  return (
    <TextField
      sx={{ width: "100%", margin: "5px 0" }}
      label={label}
      type="text"
      name={name}
      id="outlined"
      onChange={onChange}
      value={value}
      helperText={validation}
      error={validation !== " "}
    />
  );
};

export default MyTextField;
