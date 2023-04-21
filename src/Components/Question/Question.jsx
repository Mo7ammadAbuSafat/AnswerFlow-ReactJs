import React, { useContext, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Chip,
  Divider,
  Fade,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import CommentIcon from "@mui/icons-material/Comment";
import AuthContext from "../Store/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styles from "../Styling.module.css";
import PopUpModal from "../Popup/PopUpModal";
import AlertContext from "../Store/AlertProvider";
import FormReport from "./FormReport";
import FormStepperToEditQuestion from "./FormStepperToEditQuestion";
import QuestionHistory from "./QuestionHistory";
import FormToEditQuestionTags from "./FormToEditQuestionTags";

const Question = ({ questionData, showFullBody = true }) => {
  const authContext = useContext(AuthContext);
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [openVotesPopup, setOpenVotesPopup] = useState(false);
  const handleOpenVotesPopup = () => {
    setOpenVotesPopup(true);
  };
  const handleCloseVotesPopup = () => {
    setOpenVotesPopup(false);
  };

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

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
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

  // this for report
  const [openReportPopup, setOpenReportPopup] = useState(false);
  const handleReportClick = () => {
    setOpenReportPopup(true);
    handleClose();
  };
  const handleCloseReportPopup = () => {
    setOpenReportPopup(false);
  };
  //end

  // this for delete
  const handleDeleteClick = () => {
    setIsLoading(true);
    if (questionData.user.id === authContext.user.id) {
      axios
        .delete(`https://localhost:7127/api/questions/${questionData.id}`)
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
    }
    setIsLoading(false);
    handleClose();
  };
  //end

  //this for Edit History

  const [openHistoryPopup, setOpenHistoryPopup] = useState(false);
  const handleHistoryClick = () => {
    setOpenHistoryPopup(true);
    handleClose();
  };
  const handleCloseHistoryPopup = () => {
    setOpenHistoryPopup(false);
  };

  //end

  //this for Edit Question

  const [openEditQuestionPopup, setOpenEditQuestionPopup] = useState(false);
  const handleEditQuestionClick = () => {
    setOpenEditQuestionPopup(true);
    handleClose();
  };
  const handleCloseEditQuestionPopup = () => {
    setOpenEditQuestionPopup(false);
  };

  //end

  //this for Edit Question Tags

  const [openEditQuestionTagsPopup, setOpenEditQuestionTagsPopup] =
    useState(false);
  const handleEditQuestionTagsClick = () => {
    setOpenEditQuestionTagsPopup(true);
    handleClose();
  };
  const handleCloseEditQuestionTagsPopup = () => {
    setOpenEditQuestionTagsPopup(false);
  };

  //end

  var isSavedInit = false;
  if (
    authContext.isLoggedIn &&
    questionData.questionSavers.some((x) => x.Id === authContext.user.id)
  ) {
    isSavedInit = true;
  }
  const [isSaved, setIsSaved] = useState(isSavedInit);

  const handleSaveQuestion = async () => {
    setIsLoading(true);
    if (!isSaved) {
      await axios
        .post(
          `https://localhost:7127/api/questions/${questionData.id}/save?userId=${authContext.user.id}`
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          setIsSaved(true);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
    } else {
      await axios
        .delete(
          `https://localhost:7127/api/questions/${questionData.id}/save?userId=${authContext.user.id}`
        )
        .then((response) => {
          alertStates.handleOpenSuccessAlert();
          setIsSaved(false);
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert("Error: ", error.message);
          }
        });
    }

    setIsLoading(false);
  };

  const votesUsers = questionData.votes.map((vote) => {
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={vote.user.image?.imagePath}
              sx={{ bgcolor: "#4489f8" }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={vote.user.username} />
          <Box m={2}>
            {vote.type === 1 ? (
              <BsFillCaretUpFill
                color="green"
                size={"20px"}
                sx={{ marginLeft: "2px" }}
              />
            ) : (
              <BsFillCaretDownFill color="red" size={"20px"} />
            )}
          </Box>
        </ListItem>
        <Divider />
      </>
    );
  });

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
              <MenuItem
                sx={{ width: 120 }}
                onClick={handleReportClick}
                disabled={!authContext.isLoggedIn}
              >
                Report
              </MenuItem>
              {authContext.isLoggedIn &&
                questionData.user.id === authContext.user.id && [
                  <MenuItem onClick={handleEditQuestionClick}>Edit</MenuItem>,
                  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>,
                ]}
              {questionData.editHistory.length !== 0 && (
                <MenuItem onClick={handleHistoryClick}>Edit History</MenuItem>
              )}
              {authContext.isLoggedIn && authContext.user.type === 2 && (
                <MenuItem onClick={handleEditQuestionTagsClick}>
                  Edit Tags
                </MenuItem>
              )}
            </Menu>
            <PopUpModal
              name={"Report Question"}
              open={openReportPopup}
              fullWidth={true}
              handleClose={handleCloseReportPopup}
            >
              <FormReport
                apiUrl={`https://localhost:7127/api/questions/${questionData.id}/reports`}
                handleClose={handleCloseReportPopup}
              />
            </PopUpModal>
            <PopUpModal
              name={"Question History"}
              open={openHistoryPopup}
              fullWidth={true}
              handleClose={handleCloseHistoryPopup}
            >
              <QuestionHistory questionHistory={questionData.editHistory} />
            </PopUpModal>
            <PopUpModal
              name={"Edit Question"}
              open={openEditQuestionPopup}
              fullWidth={true}
              handleClose={handleCloseEditQuestionPopup}
            >
              <FormStepperToEditQuestion
                questionData={questionData}
                onClose={handleCloseEditQuestionPopup}
              />
            </PopUpModal>
            <PopUpModal
              name={"Edit Question Tags"}
              open={openEditQuestionTagsPopup}
              fullWidth={true}
              handleClose={handleCloseEditQuestionTagsPopup}
            >
              <FormToEditQuestionTags
                questionData={questionData}
                onClose={handleCloseEditQuestionTagsPopup}
              />
            </PopUpModal>
          </>
        }
        title={questionData.user.username}
        subheader={
          questionData.lastEditDate === null
            ? getTimeSince(questionData.creationDate)
            : getTimeSince(questionData.creationDate) +
              ` (edited in ${getTimeSince(questionData.lastEditDate)})`
        }
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
            <Typography
              className={Styles.votes}
              component="span"
              sx={{ fontSize: "25px" }}
              onClick={() => {
                handleOpenVotesPopup();
              }}
            >
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
            <PopUpModal
              name={"Votes"}
              open={openVotesPopup}
              fullWidth={false}
              handleClose={handleCloseVotesPopup}
            >
              {votesUsers}
            </PopUpModal>
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
                    onClick={
                      tag.sourceLink !== null
                        ? () => openLinkInNewTab(tag.sourceLink)
                        : false
                    }
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
          <IconButton
            aria-label="add to favorites"
            onClick={handleSaveQuestion}
            disabled={!authContext.isLoggedIn || isLoading}
          >
            <BookmarkIcon sx={{ color: isSaved ? "#4489f8" : "#757575" }} />
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
