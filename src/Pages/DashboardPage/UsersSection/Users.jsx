import { Avatar, Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Components/Store/AuthProvider";
import UserActionMenu from "./UserActionMenu";
import TableName from "../TableName";
import TableCard from "../TableCard";

const Users = () => {
  const authContext = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/users`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          setUsers(response.data);
        });
    };
    fetchData();
  }, [trigger, authContext]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 2,
      renderCell: ({ row: { image, username } }) => {
        return (
          <Stack direction={"row"} p="5px" alignItems={"center"} spacing={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={image?.imagePath}
            ></Avatar>
            <Typography fontSize={13}>{username}</Typography>
          </Stack>
        );
      },
    },
    { field: "email", headerName: "Email", flex: 2.5 },
    {
      field: "type",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            justifyContent={"center"}
            color="white"
            width="90px"
            p="5px"
            display="flex"
            borderRadius="5px"
            backgroundColor={
              type === 2 ? "#0080008c" : type === 3 ? "#546564" : "#4489f8"
            }
          >
            {type === 2 ? "Expert" : type === 3 ? "Admin" : "User"}
          </Box>
        );
      },
    },
    {
      field: "isBlockedFromPosting",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { isBlockedFromPosting } }) => {
        return isBlockedFromPosting ? (
          <Box
            justifyContent={"center"}
            color="white"
            width="80px"
            p="5px"
            display="flex"
            borderRadius="5px"
            backgroundColor={isBlockedFromPosting ? "red" : "#0080008c"}
          >
            {isBlockedFromPosting ? "Blocked" : "No"}
          </Box>
        ) : (
          <> - </>
        );
      },
    },
    {
      field: "action",
      headerName: " ",
      flex: 0.5,
      renderCell: ({ row: { id, type, isBlockedFromPosting } }) => (
        <>
          <UserActionMenu
            userId={id}
            userType={type}
            isBlockedFromPosting={isBlockedFromPosting}
            handleTrigger={handleTrigger}
          />
        </>
      ),
    },
  ];

  return (
    <TableCard>
      <TableName name="Users" />
      <Box
        height={"500px"}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      >
        <DataGrid
          disableRowSelectionOnClick={true}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </TableCard>
  );
};

export default Users;
