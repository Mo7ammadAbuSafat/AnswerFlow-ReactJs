import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import axios from "axios";
import AuthContext from "../../Components/Store/AuthProvider";
import TagRow from "./TagRow";
import { Box, TextField } from "@mui/material";

const TagsTable = () => {
  const authContext = useContext(AuthContext);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://localhost:7127/api/tags").then((response) => {
        setTags(response.data);
      });
    };
    fetchData();
  }, []);

  const [followedTags, setFollowedTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://localhost:7127/api/users/${authContext.user.id}/tags/following`
        )
        .then((response) => {
          setFollowedTags(response.data);
          console.log(response.data);
        });
    };
    if (authContext.isLoggedIn) {
      fetchData();
    }
  }, [authContext]);

  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  console.log(tags.filter((t) => t.name.includes(searchText)));

  return (
    <>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"86px"}
      >
        <TextField
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search"
          sx={{ width: "300px" }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {tags
              .filter((t) => t.name.includes(searchText))
              .map((tag) => (
                <TagRow
                  tag={tag}
                  followedTags={followedTags}
                  setFollowedTags={setFollowedTags}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TagsTable;
