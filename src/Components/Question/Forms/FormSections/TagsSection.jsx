import {
  Autocomplete,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TagsSection = ({
  selectValueError,
  setSelectedTags,
  selectedTags,
  setSelectValueError,
}) => {
  const [selectValue, setSelectValue] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://localhost:7127/api/tags").then((response) => {
        setTags(response.data);
      });
    };
    fetchData();
  }, []);

  const handleAddClick = () => {
    if (selectValue !== "" && !selectedTags.includes(selectValue)) {
      var arr = [...selectedTags];
      arr.push(selectValue);
      setSelectedTags(arr);
    } else {
      setSelectValueError(true);
    }
  };

  const handleDelete = (tag) => {
    const tags = selectedTags.filter((x) => x !== tag);
    setSelectedTags(tags);
  };

  const options = tags.map((tag) => tag.name);

  return (
    <>
      <Autocomplete
        PaperComponent={({ children }) => (
          <Paper
            sx={{
              maxHeight: "200px !important",
              overflowY: "scroll",
            }}
          >
            {children}
          </Paper>
        )}
        freeSolo={false}
        disablePortal
        id="combo-box-demo"
        sx={{
          width: "60%",
          margin: "40px 20px 0 20px",
        }}
        options={options}
        onChange={(event, newValue) => {
          setSelectValue(newValue ? newValue : "");
          setSelectValueError(false);
        }}
        onInputChange={(event, newValue) => {
          setSelectValue(newValue ? newValue : "");
          setSelectValueError(false);
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            error={selectValueError}
            {...params}
            label="Select Tag"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Button
        sx={{
          textTransform: "none",
          background: "#4489f8",
          margin: "20px",
          width: "80px",
        }}
        variant="contained"
        size="md"
        onClick={handleAddClick}
      >
        Add
      </Button>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        spacing={1}
        sx={{
          width: "calc(100% - 40px)",
          height: "100px",
          margin: "0px 20px 10px 20px",
          padding: "10px",
          border: "0.5px solid silver",
          borderRadius: "5px",
        }}
      >
        {selectedTags.map((tag) => (
          <Chip
            key={Date().now}
            size="small"
            label={tag}
            onDelete={() => {
              handleDelete(tag);
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default TagsSection;
