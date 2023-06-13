import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import AlertContext from "../../Store/AlertProvider";
import AuthContext from "../../Store/AuthProvider";
import TitleAndBodySection from "./FormSections/TitleAndBodySection";
import TagsSection from "./FormSections/TagsSection";
import SimilarQuestionsSection from "./FormSections/SimilarQuestionsSection";
import CustomStepper from "./FormSections/CustomStepper";

const steps = [
  "Write title and body",
  "Add tags",
  "Add photo",
  "Similar questions",
];

const FormStepperToPostQuestion = ({ onClose, handleTrigger }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const alertStates = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectValueError, setSelectValueError] = useState(false);

  const [validation, setValidation] = useState({
    title: true,
    body: true,
  });

  const handleNext = () => {
    if (activeStep === 0 && !validateInputs1()) {
      setValidation({
        title: inputs.title !== "",
        body: inputs.body.replace(/<[^>]+>/g, "") !== "",
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

  const handlePostClick = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("tagsNames", selectedTags);
    formData.append("title", inputs.title);
    formData.append("body", inputs.body);

    await axios
      .post("https://localhost:7127/api/questions", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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
      <CustomStepper activeStep={activeStep} steps={steps} />
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
        {activeStep === 2 && (
          <Stack height={"280px"}>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ padding: "50px" }}
            />
          </Stack>
        )}
        {activeStep === 3 && (
          <Stack height={"280px"}>
            <SimilarQuestionsSection inputs={inputs} />
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
