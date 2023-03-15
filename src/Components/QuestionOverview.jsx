import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Chip, ListItem, ListItemText, Stack } from "@mui/material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import CommentIcon from "@mui/icons-material/Comment";
import { Box } from "@mui/system";

const QuestionOverview = () => {
  return (
    <Card sx={{ maxWidth: 800, minWidth: 250 }}>
      <CardHeader
        avatar={
          <Avatar
            src="/Assets/avatarEx.jpg"
            sx={{ bgcolor: "#4489f8" }}
            aria-label="recipe"
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Mohammad AbuSafat"
        subheader="September 14, 2022"
      />
      <CardContent sx={{ padding: "0" }}>
        <Stack direction={"row"} justifyContent={"left"}>
          <Stack
            sx={{ padding: "3px 0px 3px 0px" }}
            alignItems={"center"}
            width={70}
          >
            <IconButton>
              <BsFillCaretUpFill size={"30px"} color={"#757575"} />
            </IconButton>
            <Typography component="span" sx={{ fontSize: "25px" }}>
              54
            </Typography>
            <IconButton>
              <BsFillCaretDownFill size={"30px"} color={"#757575"} />
            </IconButton>
            <DoneTwoToneIcon
              sx={{ fontSize: "35px", color: "green", marginTop: "5px" }}
            />
          </Stack>
          <Stack spacing={1.5} maxWidth={600} sx={{ paddingRight: "10px" }}>
            <p
              style={{
                minHeight: "40px",
                fontSize: "1.2em",
                fontWeight: "400",
              }}
            >
              How to disable secure file priv as a read only variable on MySQL
              on mac?
            </p>
            <p
              style={{
                color: "#757575",
                maxWidth: "60vw",
                minHeight: "40px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              How to disable secure file priv as a read only variable on MySQL
              on mac?
            </p>
            <Stack direction={"row"} spacing={1}>
              <Chip
                label="Java"
                sx={{ fontSize: "10px", margin: "3px" }}
                size={"small"}
                color={"success"}
              />
              <Chip
                label="Python"
                sx={{ fontSize: "10px" }}
                size={"small"}
                color={"default"}
              />
              <Chip
                label="Database"
                sx={{ fontSize: "10px" }}
                size={"small"}
                color={"default"}
              />
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
        </CardActions>
        <Stack
          spacing={1}
          m={2}
          alignItems={"center"}
          direction={"row"}
          color={"#757575"}
        >
          <CommentIcon />
          <ListItemText primary="0" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default QuestionOverview;
