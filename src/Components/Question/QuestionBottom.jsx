import React, { useContext, useState } from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ListItemText, Stack } from "@mui/material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CommentIcon from "@mui/icons-material/Comment";
import AuthContext from "../Store/AuthProvider";
import AlertContext from "../Store/AlertProvider";
import axios from "axios";

const QuestionBottom = ({ questionData }) => {
  const authContext = useContext(AuthContext);
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);

  var isSavedInit = false;
  if (
    authContext.isLoggedIn &&
    questionData.questionSavers.some((x) => x.id === authContext.user.id)
  ) {
    isSavedInit = true;
  }
  const [isSaved, setIsSaved] = useState(isSavedInit);

  const handleSaveQuestion = async () => {
    setIsLoading(true);
    if (!isSaved) {
      await axios
        .post(
          `https://localhost:7127/api/users/${authContext.user.id}/saved-questions/${questionData.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authContext.token}`,
              "Content-Type": "application/json",
            },
          }
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
          `https://localhost:7127/api/users/${authContext.user.id}/saved-questions/${questionData.id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authContext.token}`,
            },
          }
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

  return (
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
              marginLeft: "14px",
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
  );
};

export default QuestionBottom;
