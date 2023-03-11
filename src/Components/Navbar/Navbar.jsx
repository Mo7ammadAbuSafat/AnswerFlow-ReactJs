import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <img onClick={() => navigate("/")} src="/Assets/AnswerFlow-Logo.png" />
      {children}
    </div>
  );
};

export default Navbar;
