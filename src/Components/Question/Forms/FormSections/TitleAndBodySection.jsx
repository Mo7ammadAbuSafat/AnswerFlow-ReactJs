import { Stack, TextField } from "@mui/material";
import React from "react";

const TitleAndBodySection = ({ inputs, validation, onChange }) => {
  return (
    <Stack>
      <TextField
        sx={{ width: "calc(100% - 40px)", margin: "40px 20px 0 20px" }}
        label="Title"
        id="outlined"
        name="title"
        onChange={onChange}
        value={inputs.title}
        error={!validation.title}
      />
      <TextField
        sx={{ width: "calc(100% - 40px)", margin: "30px 20px" }}
        id="outlined-multiline-static"
        label="Body"
        name="body"
        onChange={onChange}
        value={inputs.body}
        error={!validation.body}
        multiline
        rows={4}
      />
    </Stack>
  );
};

export default TitleAndBodySection;
