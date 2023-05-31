import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../Store/AuthProvider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopUpModal from "../Popup/PopUpModal";
import FormReport from "../Question/Forms/FormReport";
import AlertContext from "../Store/AlertProvider";
import FormToEditAnswer from "./FormToEditAnswer";

const AnswerOptions = ({ answerData }) => {
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
          `https://localhost:7127/api/questions/${answerData.questionId}/answers/${answerData.id}`,
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
        })
        .catch((error) => {
          if (error.response) {
            alertStates.handleOpenErrorAlert(error.response.data.error);
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
        `https://localhost:7127/api/questions/${answerData.questionId}/answers/${answerData.id}/status`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
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
          (authContext.user.type === 2 || authContext.user.type === 3) && (
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
          contentType={"answer"}
          contentId={answerData.id}
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
  );
};

export default AnswerOptions;
