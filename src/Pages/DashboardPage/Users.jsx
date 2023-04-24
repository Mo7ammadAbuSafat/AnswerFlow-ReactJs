import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../Components/Store/AlertProvider";

const Users = () => {
  const alertStates = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handleActionClick = async (actionName, userId) => {
    setIsLoading(true);
    await axios
      .put(`https://localhost:7127/api/users/${userId}/${actionName}`)
      .then((response) => alertStates.handleOpenSuccessAlert())
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error: ", error.message);
        }
      });
    setTrigger(!trigger);
    setIsLoading(false);
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/users/all`, {
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
  }, [trigger]);

  const columns = [
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
      headerName: "Type",
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
      field: "action2",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { id, type } }) => {
        return (
          <Button
            size="small"
            variant="outlined"
            disabled={type === 3 || isLoading}
            onClick={() => {
              type === 2
                ? handleActionClick("upgrade-to-admin", id)
                : handleActionClick("upgrade-to-expert", id);
            }}
          >
            Upgrade
          </Button>
        );
      },
    },
    {
      field: "isBlockedFromPosting",
      headerName: "Block",
      flex: 1,
      renderCell: ({ row: { isBlockedFromPosting } }) => {
        return (
          <Box
            justifyContent={"center"}
            color="white"
            width="90px"
            p="5px"
            display="flex"
            borderRadius="5px"
            backgroundColor={isBlockedFromPosting ? "red" : "#0080008c"}
          >
            {isBlockedFromPosting ? "Blocked" : "No"}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { isBlockedFromPosting, id, type } }) => {
        return (
          <Button
            size="small"
            variant="outlined"
            disabled={type === 2 || type === 3 || isLoading}
            onClick={() => {
              isBlockedFromPosting
                ? handleActionClick("unblock", id)
                : handleActionClick("block", id);
            }}
          >
            {isBlockedFromPosting ? "Unblock" : "Block"}
          </Button>
        );
      },
    },
  ];

  return (
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
        rows={users}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default Users;
