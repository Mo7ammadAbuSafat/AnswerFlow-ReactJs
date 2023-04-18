import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import DynamicFeedTwoToneIcon from "@mui/icons-material/DynamicFeedTwoTone";
import React, { useContext } from "react";
import AuthContext from "../Store/AuthProvider";
import { useNavigate } from "react-router-dom";

const LeftSidebarMenu = ({ selectedLabel }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleClick = (routPath) => {
    if (routPath === "/signInPage") {
      authContext.logout();
    }
    navigate(routPath);
  };
  const listData = [
    { icon: <DynamicFeedTwoToneIcon />, label: "Feed", routPath: "/FeedPage" },
    {
      icon: <QuestionMarkIcon />,
      label: "Questions",
      routPath: "/QuestionsPage",
    },
    { icon: <SearchIcon />, label: "Search", routPath: "/SearchPage" },
  ];
  if (authContext.isLoggedIn) {
    listData.push({
      icon: <PersonIcon />,
      label: "Profile",
      routPath: "/ProfilePage",
    });
    listData.push({
      icon: <SettingsIcon />,
      label: "My Account",
      routPath: `/users/account`,
    });
    listData.push({
      icon: <LogoutIcon />,
      label: "Logout",
      routPath: "/signInPage",
    });
  }
  const listItems = listData.map((item, index) => {
    return (
      <ListItem
        disablePadding
        selected={selectedLabel === item.label}
        key={index * 100}
      >
        <ListItemButton
          key={index * 10}
          onClick={() => {
            handleClick(item.routPath);
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
};

export default LeftSidebarMenu;
