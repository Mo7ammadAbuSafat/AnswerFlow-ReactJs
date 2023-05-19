import React, { useContext, useState } from "react";
import AuthContext from "../../Components/Store/AuthProvider";
import { Button, CircularProgress, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import PopUpModal from "../../Components/Popup/PopUpModal";
import FormToEditTag from "./FormToEditTag";

const TagRow = ({ tag, followedTags, setFollowedTags }) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const handleFollowClick = async () => {
    setIsLoading(true);
    await axios
      .post(
        `https://localhost:7127/api/users/${authContext.user.id}/following-tags/${tag.id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        setFollowedTags([...followedTags, tag]);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
  };
  const handleUnfollowClick = async () => {
    setIsLoading(true);
    await axios
      .delete(
        `https://localhost:7127/api/users/${authContext.user.id}/following-tags/${tag.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        }
      )
      .then((response) => {
        setFollowedTags(followedTags.filter((t) => t.id !== tag.id));
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setIsLoading(false);
  };

  const [openEditPopup, setOpenEditPopup] = useState(false);
  const handleEditClick = () => {
    setOpenEditPopup(true);
  };
  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  return (
    <TableRow
      key={tag.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        {tag.name}
      </TableCell>
      {authContext.isLoggedIn &&
        (authContext.user.type === 2 || authContext.user.type === 3) && (
          <TableCell align="right">
            <Button size="small" onClick={handleEditClick}>
              Edit
            </Button>
            <PopUpModal
              name={"Edit Tag"}
              open={openEditPopup}
              fullWidth={true}
              handleClose={handleCloseEditPopup}
            >
              <FormToEditTag tag={tag} handleClose={handleCloseEditPopup} />
            </PopUpModal>
          </TableCell>
        )}

      <TableCell align="right">
        <Button
          sx={{ width: "90px" }}
          size="small"
          disabled={!authContext.isLoggedIn || isLoading}
          onClick={
            followedTags.some((x) => x.id === tag.id)
              ? handleUnfollowClick
              : handleFollowClick
          }
        >
          {isLoading ? (
            <CircularProgress
              color="inherit"
              size={16}
              sx={{ marginRight: "5px" }}
            />
          ) : followedTags.some((x) => x.id === tag.id) ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          size="small"
          disabled={tag.sourceLink === null}
          onClick={
            tag.sourceLink !== null
              ? () => openLinkInNewTab(tag.sourceLink)
              : false
          }
        >
          View Source
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TagRow;
