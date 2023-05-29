import { Avatar, Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import ReportActionMenu from "./ReportActionMenu";
import QuestionOverView from "./QuestionOverView";
import AnswerOverview from "./AnswerOverview";
import ReportContent from "./ReportContent";

const ReportTable = ({ reports, handleTrigger }) => {
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
      field: "type",
      headerName: "Content",
      flex: 1,
      renderCell: ({ row: { type, questionId, answerId } }) => (
        <ReportContent contentType={type}>
          {type === "question" ? (
            <QuestionOverView questionId={questionId} />
          ) : (
            <AnswerOverview answerId={answerId} questionId={questionId} />
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
      renderCell: ({ row: { id, status, type } }) => (
        <>
          <ReportActionMenu
            reportId={id}
            reportStatus={status}
            type={type}
            handleTrigger={handleTrigger}
          />
        </>
      ),
    },
  ];
  return (
    <DataGrid
      disableRowSelectionOnClick={true}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
      rows={reports}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
    />
  );
};

export default ReportTable;
