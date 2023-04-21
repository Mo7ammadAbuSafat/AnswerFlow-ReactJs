import React, { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import axios from "axios";

const PopularTags = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://localhost:7127/api/tags").then((response) => {
        setTags(response.data);
      });
    };
    fetchData();
  }, []);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box bgcolor={"background.paper"} margin={"40px 0 0 15px"}>
      <Typography margin={1} sx={{ fontSize: "20px" }}>
        Popular Tags
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        bgcolor={"#f3f3f3"}
        borderRadius={5}
        p={2}
      >
        {tags.map((tag) => {
          return (
            <Chip
              label={tag.name}
              sx={{
                fontSize: "12px",
                color: "white",
                backgroundColor: "#818a91",
                margin: "2px",
                padding: "2px",
              }}
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
    </Box>
  );
};

export default PopularTags;
