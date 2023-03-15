import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: "#488CFE",
  backgroundColor: "#CBDEFE",
}));

const GroupItems = styled("ul")({
  padding: 0,
});
const Tags = ["Java", "Python"];

export default function CustomSelect() {
  const options = Tags.map((option) => {
    const firstLetter = option[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      name: option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name}
      sx={{ width: "calc(100% - 40px)", margin: "40px 20px 0 20px" }}
      renderInput={(params) => <TextField {...params} label="Select Tags" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}
