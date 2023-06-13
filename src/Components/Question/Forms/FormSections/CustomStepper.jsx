import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const CustomStepper = ({ activeStep, steps }) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>{label}</Box>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CustomStepper;
