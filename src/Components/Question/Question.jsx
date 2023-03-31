import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Chip, Fade, ListItemText, Menu, MenuItem, Stack } from "@mui/material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import CommentIcon from "@mui/icons-material/Comment";
import AuthContext from "../Store/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styles from "../Styling.module.css";

const Question = ({ questionData, showFullBody = true }) => {
  const authContext = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getTimeSince = (date) => {
    date = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // difference in seconds

    if (diff < 60) {
      return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} ${days > 1 ? "days" : "day"} ago`;
    } else if (diff < 2628000) {
      const weeks = Math.floor(diff / 604800);
      return `${weeks} ${weeks > 1 ? "weeks" : "week"} ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2628000);
      return `${months} ${months > 1 ? "months" : "month"} ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years} ${years > 1 ? "years" : "year"} ago`;
    }
  };

  //#region initVoteValue
  var initVoteValue = 0;
  if (
    authContext.isLoggedIn &&
    questionData.votes.some((x) => x.user.id === authContext.user.id)
  ) {
    initVoteValue = questionData.votes.find(
      (x) => x.user.id === authContext.user.id
    ).type;
  }
  const [userVote, setUserVote] = useState(initVoteValue);

  //#endregion

  const handleVoteClick = (x) => {
    setIsLoading(true);
    if (userVote === x) {
      axios
        .delete(
          `https://localhost:7127/api/questions/${questionData.id}/vote?userId=${authContext.user.id}`
        )
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
      setUserVote(0);
    } else {
      const voteType = x === 1 ? "up" : "down";
      axios
        .post(
          `https://localhost:7127/api/questions/${questionData.id}/${voteType}-vote?userId=${authContext.user.id}`
        )
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
      setUserVote(x);
    }
    setIsLoading(false);
  };

  // this for menu:
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // end

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            src={questionData.user.image?.imagePath}
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        action={
          <>
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Report</MenuItem>
              <MenuItem onClick={handleClose}>Save</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
              <MenuItem onClick={handleClose}>Edit History</MenuItem>
            </Menu>
          </>
        }
        title={questionData.user.username}
        subheader={getTimeSince(questionData.creationDate)}
      />
      <CardContent sx={{ padding: "0" }}>
        <Stack direction={"row"} justifyContent={"left"}>
          <Stack
            sx={{ padding: "3px 0px 3px 0px" }}
            alignItems={"center"}
            width={70}
          >
            <IconButton
              disabled={!authContext.isLoggedIn || isLoading}
              onClick={() => handleVoteClick(1)}
            >
              <BsFillCaretUpFill
                size={"30px"}
                color={userVote === 1 ? "#4489f8" : "#757575"}
              />
            </IconButton>
            <Typography component="span" sx={{ fontSize: "25px" }}>
              {questionData.finalVotesValue - initVoteValue + userVote}
            </Typography>
            <IconButton
              disabled={!authContext.isLoggedIn || isLoading}
              onClick={() => handleVoteClick(-1)}
            >
              <BsFillCaretDownFill
                size={"30px"}
                color={userVote === -1 ? "#4489f8" : "#757575"}
              />
            </IconButton>
          </Stack>
          <Stack
            spacing={1.5}
            maxWidth={600}
            width={"100%"}
            sx={{ padding: "0 5px" }}
          >
            <p
              className={showFullBody ? Styles.title2 : Styles.title1}
              onClick={() => {
                if (!showFullBody)
                  navigate(`/questionsPage/${questionData.id}`);
              }}
            >
              {questionData.title}
            </p>
            <p className={showFullBody ? Styles.body2 : Styles.body1}>
              {questionData.body}
            </p>
            <Stack direction={"row"} spacing={1} marginTop={10}>
              {questionData.tags.map((tag) => {
                return (
                  <Chip
                    label={tag.name}
                    sx={{ fontSize: "10px" }}
                    size={"small"}
                    color={"default"}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      <Stack
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CardActions disableSpacing sx={{ marginLeft: "5px" }}>
          <IconButton aria-label="add to favorites">
            <BookmarkIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {questionData.status === 1 && (
            <DoneTwoToneIcon
              sx={{
                fontSize: "35px",
                color: "green",
                marginLeft: "5px",
              }}
            />
          )}
        </CardActions>
        <Stack
          spacing={1}
          m={2}
          alignItems={"center"}
          direction={"row"}
          color={"#757575"}
        >
          <CommentIcon />
          <ListItemText primary={questionData.answersCount} />
        </Stack>
      </Stack>
    </>
  );
};

export default Question;
