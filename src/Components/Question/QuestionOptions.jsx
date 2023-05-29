import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fade, Menu, MenuItem } from "@mui/material";
import AuthContext from "../Store/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUpModal from "../Popup/PopUpModal";
import AlertContext from "../Store/AlertProvider";
import FormReport from "./Forms/FormReport";
import FormStepperToEditQuestion from "./Forms/FormStepperToEditQuestion";
import QuestionHistory from "./QuestionHistory";
import FormToEditQuestionTags from "./Forms/FormToEditQuestionTags";

const QuestionOptions = ({ questionData }) => {
  const authContext = useContext(AuthContext);
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        .delete(`https://localhost:7127/api/questions/${questionData.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
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

  return (
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
          disabled={!authContext.isLoggedIn || isLoading}
        >
          Report
        </MenuItem>
        {authContext.isLoggedIn &&
          questionData.user.id === authContext.user.id && [
            <MenuItem disabled={isLoading} onClick={handleEditQuestionClick}>
              Edit
            </MenuItem>,
            <MenuItem disabled={isLoading} onClick={handleDeleteClick}>
              Delete
            </MenuItem>,
          ]}
        {questionData.editHistory.length !== 0 && (
          <MenuItem disabled={isLoading} onClick={handleHistoryClick}>
            Edit History
          </MenuItem>
        )}
        {authContext.isLoggedIn &&
          (authContext.user.type === 2 || authContext.user.type === 3) && (
            <MenuItem
              disabled={isLoading}
              onClick={handleEditQuestionTagsClick}
            >
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
          contentType={"question"}
          contentId={questionData.id}
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
  );
};

export default QuestionOptions;
