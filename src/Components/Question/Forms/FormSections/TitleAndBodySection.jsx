import { Stack, TextField } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TitleAndBodySection = ({
  inputs,
  validation,
  onTitleChange,
  onBodyChange,
}) => {
  return (
    <Stack>
      <TextField
        sx={{ width: "calc(100% - 40px)", margin: "40px 20px 0 20px" }}
        label="Title"
        id="outlined"
        name="title"
        onChange={onTitleChange}
        value={inputs.title}
        error={!validation.title}
      />
      <ReactQuill
        value={inputs.body}
        onChange={onBodyChange}
        style={{
          width: "calc(100% - 40px)",
          margin: "30px 20px",
          height: "120px",
          marginBottom: "30px",
        }}
      />
    </Stack>
  );
};

export default TitleAndBodySection;
