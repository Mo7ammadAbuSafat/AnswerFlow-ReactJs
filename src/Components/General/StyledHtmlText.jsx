import React from "react";
import Styles from "../Styling.module.css";
import { Box } from "@mui/material";

const StyledHtmlText = ({ text }) => {
  return (
    <Box
      variant="body"
      gutterBottom
      color={"#303030"}
      lineHeight={1.4}
      dangerouslySetInnerHTML={{ __html: text }}
      className={Styles.htmlText}
    />
  );
};

export default StyledHtmlText;
