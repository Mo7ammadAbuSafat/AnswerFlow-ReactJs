import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import CustomSelect from "./CustomSelect";

const steps = [
  "Write title and body",
  "Add tags",
  "Similar questions",
  "Post question",
];

const FormStepper = ({ onClose }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", height: "370px", paddingTop: "20px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
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
        <Stack display={activeStep != 0 ? "none" : "flex"}>
          <TextField
            sx={{ width: "calc(100% - 40px)", margin: "40px 20px 0 20px" }}
            label="Title"
            id="outlined"
          />
          <TextField
            sx={{ width: "calc(100% - 40px)", margin: "30px 20px" }}
            id="outlined-multiline-static"
            label="Body"
            multiline
            rows={4}
          />
        </Stack>
        <Stack display={activeStep != 1 ? "none" : "flex"}>
          <CustomSelect />
          <Button
            sx={{
              textTransform: "none",
              background: "#4489f8",
              margin: "20px",
              width: "80px",
            }}
            variant="contained"
            size="md"
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
            <Chip size="small" label="Deletable" onDelete={() => {}} />
            <Chip size="small" label="Deletable" onDelete={() => {}} />
            <Chip size="small" label="Deletable" onDelete={() => {}} />
            <Chip size="small" label="Deletable" onDelete={() => {}} />
            <Chip size="small" label="Deletable" onDelete={() => {}} />
          </Stack>
        </Stack>
        <Stack display={activeStep != 2 ? "none" : "flex"} height={"280px"}>
          <h1 style={{ margin: "35px 20px", color: "silver" }}>
            there is no questions similar
          </h1>
        </Stack>
        <Stack display={activeStep != 3 ? "none" : "flex"} height={"280px"}>
          <h1 style={{ margin: "35px 20px", color: "silver" }}>
            Success posting
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
            <Button onClick={onClose}>Finish</Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default FormStepper;
