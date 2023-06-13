import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Avatar, Divider, MenuItem, Stack, Typography } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  color: "white",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },
}));

const SearchResultBox = styled(Box)({
  position: "absolute",
  top: "40px",
  left: "30px",
  zIndex: 5,
  width: "400px",
  paddingTop: "5px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
  maxHeight: "300px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#c0c0c0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    background: "#ced0d4",
  },
});

export default function SearchAppBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/users`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUsers(response.data);
        });
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Box width={450} position={"relative"}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          onChange={onChange}
          value={searchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={async () => {
            await delay(200);
            setIsFocused(false);
          }}
        />
      </Search>
      {searchInput && isFocused && (
        <SearchResultBox>
          {filteredUsers?.length > 0 ? (
            filteredUsers.slice(0, 7).map((user) => (
              <>
                <MenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                  <Stack direction="row" spacing={2} margin={0.1}>
                    <Avatar src={user.image?.imagePath} />
                    <Typography
                      color="#555"
                      paddingTop={1}
                      textTransform={"none"}
                      fontSize={"15px"}
                    >
                      {user.username}
                    </Typography>
                  </Stack>
                </MenuItem>
                <Divider />
              </>
            ))
          ) : (
            <Typography fontSize={"12px"} color={"silver"} p={2}>
              No results
            </Typography>
          )}
        </SearchResultBox>
      )}
    </Box>
  );
}
