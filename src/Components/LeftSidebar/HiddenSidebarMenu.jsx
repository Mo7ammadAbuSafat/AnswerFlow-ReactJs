import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArticleIcon from "@mui/icons-material/Article";
import StyleIcon from "@mui/icons-material/Style";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import DynamicFeedTwoToneIcon from "@mui/icons-material/DynamicFeedTwoTone";
import React from "react";

const HiddenSidebarMenu = () => {
  const listData = [
    { icon: <DynamicFeedTwoToneIcon />, label: "Feed" },
    { icon: <QuestionMarkIcon />, label: "Questions" },
    { icon: <ArticleIcon />, label: "Articles" },
    { icon: <StyleIcon />, label: "Tags" },
    { icon: <SearchIcon />, label: "Search" },
    { icon: <PersonIcon />, label: "Profile" },
    { icon: <SettingsIcon />, label: "Setting" },
    { icon: <InfoIcon />, label: "About" },
    { icon: <LogoutIcon />, label: "Logout" },
  ];
  const listItems = listData.map((item) => {
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  });
  return (
    <Box padding={"20px"}>
      <List>{listItems}</List>
    </Box>
  );
};

export default HiddenSidebarMenu;
