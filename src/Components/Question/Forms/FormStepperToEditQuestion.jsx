import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import AlertContext from "../../Store/AlertProvider";
import AuthContext from "../../Store/AuthProvider";
import TagsSection from "./FormSections/TagsSection";
import TitleAndBodySection from "./FormSections/TitleAndBodySection";

const steps = ["title and body", "tags"];

const FormStepperToEditQuestion = ({ questionData, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    title: questionData.title,
    body: questionData.body,
  });

  const [selectedTags, setSelectedTags] = useState(
    questionData.tags.map((tag) => tag.name)
  );

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

  const [selectValueError, setSelectValueError] = useState(false);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onTitleChange = (e) => {
    setInputs({ ...inputs, title: e.target.value });
    const isValid = e.target.value !== "";
    setValidation({
      ...validation,
      title: isValid,
    });
  };

  const onBodyChange = (value) => {
    setInputs({ ...inputs, body: value });
    const isValid = value.replace(/<[^>]+>/g, "") !== "";
    setValidation({
      ...validation,
      body: isValid,
    });
  };

  const handleEditClick = async () => {
    setIsLoading(true);
    const data = {
      ...inputs,
      tagsNames: selectedTags,
    };
    await axios
      .put(
        `https://localhost:7127/api/questions/${questionData.id}`,
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
        {activeStep === 0 && (
          <TitleAndBodySection
            inputs={inputs}
            validation={validation}
            onTitleChange={onTitleChange}
            onBodyChange={onBodyChange}
          />
        )}
        {activeStep === 1 && (
          <Stack>
            <TagsSection
              selectValueError={selectValueError}
              setSelectValueError={setSelectValueError}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
            />
          </Stack>
        )}
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
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default FormStepperToEditQuestion;
