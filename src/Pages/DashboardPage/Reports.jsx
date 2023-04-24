import { Avatar, Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportActionMenu from "./ReportActionMenu";
import QuestionOverView from "./QuestionOverView";
import AnswerOverview from "./AnswerOverview";
import ReportContent from "./ReportContent";

const Reports = () => {
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/reports`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setReports(response.data);
        });
    };
    fetchData();
  }, [trigger]);
  const columns = [
    {
      field: "user",
      headerName: "Created By",
      flex: 1.8,
      renderCell: ({ row: { user } }) => {
        return (
          <Stack direction={"row"} p="5px" alignItems={"center"} spacing={1}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={user.image?.imagePath}
            ></Avatar>
            <Typography fontSize={13}>{user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "contentType",
      headerName: "Content",
      flex: 1,
      renderCell: ({ row: { contentType, question, answer } }) => (
        <ReportContent contentType={contentType}>
          {contentType === "question" ? (
            <QuestionOverView question={question} />
          ) : (
            <AnswerOverview answer={answer} />
          )}
        </ReportContent>
      ),
    },
    { field: "description", headerName: "Report Description", flex: 3 },
    {
      field: "creationDate",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { creationDate } }) => {
        const date = new Date(creationDate);
        return <Box>{date.toISOString().slice(0, 10)}</Box>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            justifyContent={"center"}
            color="white"
            width="90px"
            p="5px"
            display="flex"
            borderRadius="5px"
            backgroundColor={status === 0 ? "red" : "#0080008c"}
          >
            {status === 0 ? "open" : "closed"}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: " ",
      flex: 0.5,
      renderCell: ({ row: { id, status, contentType } }) => (
        <>
          <ReportActionMenu
            reportId={id}
            reportStatus={status}
            contentType={contentType}
            handleTrigger={handleTrigger}
          />
        </>
      ),
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
        rows={reports}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default Reports;
