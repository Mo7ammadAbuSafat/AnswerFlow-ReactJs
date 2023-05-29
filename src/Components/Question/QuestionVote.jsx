import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import AuthContext from "../Store/AuthProvider";
import axios from "axios";
import Styles from "../Styling.module.css";
import PopUpModal from "../Popup/PopUpModal";
import VoteUsers from "./VoteUsers";

const QuestionVote = ({ questionData }) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [openVotesPopup, setOpenVotesPopup] = useState(false);
  const handleOpenVotesPopup = () => {
    setOpenVotesPopup(true);
  };
  const handleCloseVotesPopup = () => {
    setOpenVotesPopup(false);
  };
  //#region initVoteValue
  var initVote = null;
  if (
    authContext.isLoggedIn &&
    questionData.votes.some((x) => x.user.id === authContext.user.id)
  ) {
    initVote = questionData.votes.find(
      (x) => x.user.id === authContext.user.id
    );
  }
  var initVoteValue = initVote === null ? 0 : initVote.type;
  const [userVote, setUserVote] = useState(initVote);
  var userVoteValue = userVote === null ? 0 : userVote.type;

  //#endregion
  const handleVote = async (type) => {
    var data = {
      type: type,
      userId: authContext.user.id,
    };
    await axios
      .post(
        `https://localhost:7127/api/questions/${questionData.id}/votes`,
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        setUserVote(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
  };
  const handleEditVote = async (type) => {
    var data = {
      type: type,
      userId: authContext.user.id,
    };
    await axios
      .put(
        `https://localhost:7127/api/questions/${questionData.id}/votes/${userVote.id}`,
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        setUserVote(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
  };
  const handleDeleteVote = async (type) => {
    await axios
      .delete(
        `https://localhost:7127/api/questions/${questionData.id}/votes/${userVote.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        setUserVote(null);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
  };
  const handleVoteClick = (x) => {
    setIsLoading(true);
    if (userVote === null) {
      handleVote(x);
    } else if (userVote?.type === x) {
      handleDeleteVote();
    } else if (userVote?.type !== x) {
      handleEditVote(x);
    }
    setIsLoading(false);
  };

  return (
    <Stack sx={{ padding: "3px 0px 3px 0px" }} alignItems={"center"} width={70}>
      <IconButton
        disabled={!authContext.isLoggedIn || isLoading}
        onClick={() => handleVoteClick(1)}
      >
        <BsFillCaretUpFill
          size={"30px"}
          color={userVote?.type === 1 ? "#4489f8" : "#757575"}
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
        {questionData.finalVotesValue - initVoteValue + userVoteValue}
      </Typography>
      <IconButton
        disabled={!authContext.isLoggedIn || isLoading}
        onClick={() => handleVoteClick(-1)}
      >
        <BsFillCaretDownFill
          size={"30px"}
          color={userVote?.type === -1 ? "#4489f8" : "#757575"}
        />
      </IconButton>
      <PopUpModal
        name={"Votes"}
        open={openVotesPopup}
        fullWidth={false}
        handleClose={handleCloseVotesPopup}
      >
        <VoteUsers votesData={questionData.votes} />
      </PopUpModal>
    </Stack>
  );
};

export default QuestionVote;
