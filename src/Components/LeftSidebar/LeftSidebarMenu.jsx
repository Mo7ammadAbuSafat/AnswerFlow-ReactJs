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
import StyleIcon from "@mui/icons-material/Style";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DynamicFeedTwoToneIcon from "@mui/icons-material/DynamicFeedTwoTone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useContext } from "react";
import AuthContext from "../Store/AuthProvider";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const LeftSidebarMenu = ({ selectedLabel }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleClick = (routPath) => {
    if (routPath === "/sign-in") {
      authContext.logout();
    }
    navigate(routPath);
  };
  let listData = [
    { icon: <HomeIcon />, label: "Home", routPath: "/" },
    { icon: <DynamicFeedTwoToneIcon />, label: "Feed", routPath: "/feed" },
    {
      icon: <QuestionMarkIcon />,
      label: "Questions",
      routPath: "/questions",
    },
    { icon: <SearchIcon />, label: "Search", routPath: "/search" },
    {
      icon: <StyleIcon />,
      label: "Tags",
      routPath: "/tags",
    },
  ];
  if (authContext.isLoggedIn) {
    listData.push({
      icon: <BookmarkIcon />,
      label: "Saved",
      routPath: `/users/saved-questions`,
    });
    listData.push({
      icon: <PersonIcon />,
      label: "Profile",
      routPath: `/profile/${authContext.user.id}`,
    });
    listData.push({
      icon: <SettingsIcon />,
      label: "My Account",
      routPath: `/users/account`,
    });
    listData.push({
      icon: <LogoutIcon />,
      label: "Logout",
      routPath: "/sign-in",
    });
    if (authContext.user.type === 3) {
      listData = [
        {
          icon: <DashboardIcon />,
          label: "Dashboard",
          routPath: `/dashboard`,
        },
        ...listData,
      ];
    }
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
