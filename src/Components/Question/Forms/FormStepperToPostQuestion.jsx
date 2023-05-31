import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
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

const steps = ["Write title and body", "Add tags", "Similar questions"];

const FormStepperToPostQuestion = ({ onClose, handleTrigger }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const [validation, setValidation] = useState({
    title: true,
    body: true,
  });

  const handleNext = () => {
    if (activeStep === 0 && !validateInputs1()) {
      setValidation({
        title: inputs.title !== "",
        body: inputs.body !== "",
      });
      return;
    } else if (activeStep === 1 && selectedTags.length === 0) {
      setSelectValueError(true);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const validateInputs1 = () => {
    return inputs.title !== "" && inputs.body !== "";
  };

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    const isValid = value !== "";
    if (isValid) {
      setValidation({
        ...validation,
        [name]: true,
      });
    } else {
      setValidation({
        ...validation,
        [name]: false,
      });
    }
  };

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

  const handlePostClick = async () => {
    setIsLoading(true);
    const data = {
      userId: authContext.user.id,
      ...inputs,
      tagsNames: selectedTags,
    };
    await axios
      .post("https://localhost:7127/api/questions", JSON.stringify(data), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
      })
      .then((response) => {
        alertStates.handleOpenSuccessAlert();
        handleTrigger();
      })
      .catch((error) => {
        if (error.response) {
          alertStates.handleOpenErrorAlert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
  };

  return (
    <Box sx={{ width: "100%", height: "370px", paddingTop: "20px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Stack display={activeStep !== 0 ? "none" : "flex"}>
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
        <Stack display={activeStep !== 1 ? "none" : "flex"}>
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
        <Stack display={activeStep !== 2 ? "none" : "flex"} height={"280px"}>
          <h1 style={{ margin: "35px 20px", color: "silver" }}>
            there is no questions similar
          </h1>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button
              disabled={isLoading}
              onClick={() => {
                handlePostClick();
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
                "Post"
              )}
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default FormStepperToPostQuestion;
