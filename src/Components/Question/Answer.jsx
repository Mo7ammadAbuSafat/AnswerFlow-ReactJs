import {
  Avatar,
  Card,
  CardHeader,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../Store/AuthProvider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { Stack } from "@mui/material";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import Styles from "../Styling.module.css";
import PopUpModal from "../Popup/PopUpModal";
import FormReport from "./FormReport";
import AlertContext from "../Store/AlertProvider";
import FormToEditAnswer from "./FormToEditAnswer";

const Answer = ({ answerData, showFullBody = true }) => {
  const authContext = useContext(AuthContext);
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);

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
    answerData.votes.some((x) => x.user.id === authContext.user.id)
  ) {
    initVoteValue = answerData.votes.find(
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
          `https://localhost:7127/api/questions/answers/${answerData.id}/vote?userId=${authContext.user.id}`
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
          `https://localhost:7127/api/questions/answers/${answerData.id}/${voteType}-vote?userId=${authContext.user.id}`
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
    if (answerData.user.id === authContext.user.id) {
      axios
        .delete(
          `https://localhost:7127/api/questions/${answerData.questionId}/answers/${answerData.id}`
        )
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

  //this for Edit Answer

  const [openEditAnswerPopup, setOpenEditAnswerPopup] = useState(false);
  const handleEditAnswerClick = () => {
    setOpenEditAnswerPopup(true);
    handleClose();
  };
  const handleCloseEditAnswerPopup = () => {
    setOpenEditAnswerPopup(false);
  };

  //end

  const handleApproveAnswerClick = () => {
    setIsLoading(true);
    axios
      .put(
        `https://localhost:7127/api/questions/${answerData.questionId}/answers/${answerData.id}/approve`
      )
      .then((response) => alertStates.handleOpenSuccessAlert())
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
    handleClose();
  };

  return (
    <Card sx={{ margin: "25px 0" }}>
      <CardHeader
        sx={{ marginBottom: "-15px" }}
        avatar={
          <Avatar
            src={answerData.user.image?.imagePath}
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
                answerData.user.id === authContext.user.id && [
                  <MenuItem onClick={handleEditAnswerClick}>Edit</MenuItem>,
                  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>,
                ]}
              {authContext.isLoggedIn &&
                (authContext.user.type === 2 ||
                  authContext.user.type === 3) && (
                  <MenuItem
                    disabled={isLoading || answerData.answerStatus === 1}
                    onClick={handleApproveAnswerClick}
                  >
                    Approve
                  </MenuItem>
                )}
            </Menu>
            <PopUpModal
              name={"Report Answer"}
              open={openReportPopup}
              fullWidth={true}
              handleClose={handleCloseReportPopup}
            >
              <FormReport
                apiUrl={`https://localhost:7127/api/questions/${answerData.questionId}/answers/${answerData.id}/reports`}
                handleClose={handleCloseReportPopup}
              />
            </PopUpModal>
            <PopUpModal
              name={"Edit Answer"}
              open={openEditAnswerPopup}
              fullWidth={true}
              handleClose={handleCloseEditAnswerPopup}
            >
              <FormToEditAnswer
                answerData={answerData}
                handleClose={handleCloseEditAnswerPopup}
              />
            </PopUpModal>
          </>
        }
        title={answerData.user.username}
        subheader={getTimeSince(answerData.creationDate)}
      />

      <CardContent sx={{ padding: 0, marginTop: 1 }}>
        <Stack direction={"row"} justifyContent={"left"}>
          <Stack
            sx={{ padding: "3px 0px 3px 0px" }}
            alignItems={"center"}
            width={70}
            spacing={-1}
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
              {answerData.finalVotesValue - initVoteValue + userVote}
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
            {answerData.answerStatus === 1 && (
              <DoneTwoToneIcon
                sx={{
                  fontSize: "35px",
                  color: "green",
                  marginTop: "5px",
                }}
              />
            )}
          </Stack>
          <Stack
            spacing={1.5}
            maxWidth={600}
            width={"100%"}
            sx={{ padding: "0 5px" }}
          >
            <p
              className={showFullBody ? Styles.body2 : Styles.body1}
              style={{ minHeight: "90px" }}
            >
              {answerData.body}
            </p>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Answer;
