import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ children, displayMenu = false, toggleDrawer = () => {} }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.navDiv}>
        {displayMenu && (
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: "white", fontSize: "30px" }} />
          </IconButton>
        )}
        <img onClick={() => navigate("/")} src="/Assets/AnswerFlowJust.png" />
      </div>
      <img
        className={styles.navImg}
        onClick={() => navigate("/")}
        src="/Assets/AnswerFlow-Logo.png"
      />
      {children}
    </div>
  );
};

export default Navbar;
