import { Box } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Components/Store/AuthProvider";
import ReportTable from "./ReportTable";
import TableName from "../TableName";
import TableCard from "../TableCard";

const QuestionReports = () => {
  const authContext = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
  const [questionReports, setQuestionReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://localhost:7127/api/question-reports`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authContext.token}`,
          },
        })
        .then((response) => {
          const resData = response.data.map((v) => ({
            ...v,
            type: "question",
          }));
          setQuestionReports(resData);
        });
    };
    fetchData();
  }, [trigger]);

  return (
    <TableCard>
      <TableName name="Question Reports" />
      <Box
        height={"500px"}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      >
        <ReportTable reports={questionReports} handleTrigger={handleTrigger} />
      </Box>
    </TableCard>
  );
};

export default QuestionReports;
