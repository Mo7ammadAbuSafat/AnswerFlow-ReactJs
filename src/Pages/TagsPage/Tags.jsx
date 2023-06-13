import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PopUpWithButton from "../../Components/Popup/PopUpWithButton";
import FormToAddTag from "./FormToAddTag";
import TagsTable from "./TagsTable";

const Tags = () => {
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Box flex={4} p={2}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        height={100}
      >
        <Grid item xs={2.5}>
          <Typography variant="h4" color="text.secondary" sx={{ margin: 0 }}>
            Tags
          </Typography>
        </Grid>
        <Grid item xs={2.5}>
          <PopUpWithButton
            isForExpert={true}
            name={"Add Tag"}
            open={openPopup}
            handleOpen={handleOpenPopup}
            handleClose={handleClosePopup}
          >
            <FormToAddTag
              handleClose={handleClosePopup}
              handleTrigger={handleTrigger}
            />
          </PopUpWithButton>
        </Grid>
      </Grid>
      <TagsTable trigger={trigger} />
    </Box>
  );
};

export default Tags;
