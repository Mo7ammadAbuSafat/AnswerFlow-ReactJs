import { Button } from "@mui/material";
import React from "react";
import styles from "./Navbar.module.css";

const Navbar = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <img src="/Assets/AnswerFlow-Logo.png" />
      {children}
    </div>
  );
};

export default Navbar;
