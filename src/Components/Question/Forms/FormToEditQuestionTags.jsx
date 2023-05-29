import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import AlertContext from "../../Store/AlertProvider";
import AuthContext from "../../Store/AuthProvider";

const FormToEditQuestionTags = ({ questionData, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [selectedTags, setSelectedTags] = useState(
    questionData.tags.map((tag) => tag.name)
  );

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://localhost:7127/api/tags").then((response) => {
        setTags(response.data);
      });
    };
    fetchData();
  }, []);
  const options = tags.map((tag) => tag.name);
  const [selectValue, setSelectValue] = useState("");
  const [selectValueError, setSelectValueError] = useState(false);

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

  const handleEditClick = async () => {
    setIsLoading(true);
    const data = {
      tagsNames: selectedTags,
    };
    await axios
      .put(
        `https://localhost:7127/api/questions/${questionData.id}/tags`,
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        alertStates.handleOpenSuccessAlert();
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
  };

  return (
    <Box sx={{ width: "100%", height: "330px" }}>
      <Stack>
        <Autocomplete
          PaperComponent={({ children }) => (
            <Paper style={{ maxHeight: 200, overflowY: "auto" }}>
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
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          disabled={isLoading}
          onClick={() => {
            handleEditClick();
            onClose();
          }}
        >
          {isLoading ? (
            <CircularProgress
              color="inherit"
              size={16}
              sx={{ marginRight: "5px" }}
            />
          ) : (
            "Edit"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default FormToEditQuestionTags;
