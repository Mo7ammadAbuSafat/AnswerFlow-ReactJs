import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Filter = ({ apiParams, setApiParams }) => {
  const [sortBy, setSortBy] = useState(0);
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const [show, setShow] = useState(10);
  const handleShowChange = (event) => {
    setShow(event.target.value);
  };

  const [time, setTime] = useState(0);
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const [statusChecked, setStatusChecked] = useState(0);
  const handleStatusCheckChange = (event) => {
    setStatusChecked(event.target.value);
  };

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://localhost:7127/api/tags").then((response) => {
        setTags(response.data);
      });
    };
    fetchData();
  }, []);
  const options = tags.map((tag) => tag.name);

  const [selectTag, setSelectTag] = useState(null);
  const [selectTagError, setSelectTagError] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleAddTagClick = () => {
    if (
      selectTag !== "" &&
      selectedTags.length < 10 &&
      !selectedTags.includes(selectTag)
    ) {
      var arr = [...selectedTags];
      arr.push(selectTag);
      setSelectedTags(arr);
    } else {
      setSelectTagError(true);
    }
  };

  const handleDeleteSelectedTag = (tag) => {
    const newTags = selectedTags.filter((x) => x !== tag);
    setSelectedTags(newTags);
  };

  const handleApplyClick = () => {
    let date = null;
    if (time !== 0) {
      date = new Date();
      date.setDate(date.getDate() - time);
    }
    let sort = null;
    switch (sortBy) {
      case 0:
        sort = "date";
        break;
      case 1:
        sort = "topVoted";
        break;
      case 2:
        sort = "topAnswered";
        break;
      default:
        sort = null;
    }

    var status1 = null;
    if (statusChecked === "1") {
      status1 = 0;
    } else if (statusChecked === "2") {
      status1 = 1;
    }

    setApiParams({
      pageNumber: 1,
      pageSize: show,
      sortBy: sort,
      dateTime: date,
      questionStatus: status1,
      tagNames: selectedTags.count === 0 ? null : selectedTags,
    });
  };

  const handleResetClick = () => {
    setStatusChecked(0);
    setSelectTag("");
    setSelectedTags([]);
    setShow(10);
    setTime(0);
    setSortBy(0);
    setApiParams({
      pageNumber: 1,
      pageSize: 10,
      sortBy: null,
      dateTime: null,
      questionStatus: null,
      tagNames: null,
    });
  };

  return (
    <>
      <Box margin={"10px 0 20px 0"}>
        <Grid container spacing={3} justifyContent={"space-between"}>
          <Grid item xs={12} sm={6}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <h3 style={{ color: "#757575", minWidth: "70px", margin: 0 }}>
                Sort By
              </h3>
              <Select
                id="demo-simple-select"
                value={sortBy}
                onChange={handleSortByChange}
                sx={{ height: "45px", width: "100%" }}
              >
                <MenuItem value={0}>Date</MenuItem>
                <MenuItem value={1}>Most Voted</MenuItem>
                <MenuItem value={2}>Most Answered</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3.5} alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <h3 style={{ color: "#757575", width: "65px", margin: 0 }}>
                Time
              </h3>
              <Select
                id="demo-simple-select"
                value={time}
                onChange={handleTimeChange}
                sx={{ height: "45px", width: "100%" }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Day ago</MenuItem>
                <MenuItem value={7}>Week ago</MenuItem>
                <MenuItem value={30}>Month ago</MenuItem>
                <MenuItem value={365}>Year ago</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <h3 style={{ color: "#757575", minWidth: "53px", margin: 0 }}>
                Show
              </h3>
              <Select
                id="demo-simple-select"
                value={show}
                onChange={handleShowChange}
                sx={{ height: "45px", width: "100%" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction={"row"} spacing={1}>
              <h3
                style={{ color: "#757575", minWidth: "70px", margin: "8px 0" }}
              >
                Status
              </h3>
              <Stack
                sx={{
                  padding: "5px 10px",
                  border: "0.5px solid silver",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    value={statusChecked}
                    onChange={handleStatusCheckChange}
                  >
                    <FormControlLabel
                      sx={{ height: "30px", color: "#757575" }}
                      value={0}
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      sx={{ height: "30px", color: "#757575" }}
                      value={1}
                      control={<Radio />}
                      label="Open"
                    />
                    <FormControlLabel
                      sx={{ height: "30px", color: "#757575" }}
                      value={2}
                      control={<Radio />}
                      label="Approved"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack height={"100%"} spacing={{ lg: 1, md: 1, xs: 3, sm: 1 }}>
              <Stack
                direction={"row"}
                spacing={1.85}
                justifyContent={"space-between"}
              >
                <h3 style={{ color: "#757575", margin: "8px 0 0 0" }}>Tags</h3>
                <Autocomplete
                  PaperComponent={({ children }) => (
                    <Paper style={{ maxHeight: 200, overflowY: "auto" }}>
                      {children}
                    </Paper>
                  )}
                  freeSolo={false}
                  disablePortal
                  id="combo-box-demo"
                  sx={{
                    width: "100%",
                    padding: "0",
                  }}
                  options={options}
                  onChange={(event, newValue) => {
                    setSelectTag(newValue ? newValue : "");
                    setSelectTagError(false);
                  }}
                  onInputChange={(event, newValue) => {
                    setSelectTag(newValue ? newValue : "");
                    setSelectTagError(false);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={selectTagError}
                    />
                  )}
                />
              </Stack>
              <Button
                sx={{
                  textTransform: "none",
                  width: { sx: "calc(100% - 57px)", md: "100%" },
                  marginLeft: "57px",
                }}
                variant="outlined"
                size="md"
                onClick={handleAddTagClick}
              >
                Add Tag
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack
              overflow={"hidden"}
              direction={"row"}
              flexWrap={"wrap"}
              spacing={0.5}
              width={"100%"}
              height={"100px"}
              sx={{
                padding: "10px",
                border: "0.5px solid silver",
                borderRadius: "5px",
              }}
            >
              {selectedTags.map((tag) => (
                <Chip
                  key={Date().now}
                  size="small"
                  label={tag}
                  onDelete={() => {
                    handleDeleteSelectedTag(tag);
                  }}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              onClick={handleApplyClick}
              sx={{
                width: "100%",
                height: "45px",
                textTransform: "none",
              }}
              variant="contained"
              size="medium"
            >
              Apply
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              onClick={handleResetClick}
              sx={{
                width: "100%",
                height: "45px",
                textTransform: "none",
              }}
              variant="outlined"
              size="medium"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Filter;
