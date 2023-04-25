import { Box, Stack, Tooltip, Typography } from "@mui/material";

const ApprovedAnswersProgress = ({ title, number, icon }) => {
  return (
    <>
      <Stack spacing={2} width={"calc(100% - 70px)"}>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "rgb(108, 115, 127)",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "25px",
            lineHeight: "1.2",
          }}
        >
          {number}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={"5px"}>
          <Typography sx={{ fontSize: "10px", color: "#888", width: "70px" }}>
            To Be Expert
          </Typography>
          <Tooltip title="upgrade user to expert when reach 50" arrow>
            <Box
              sx={{
                height: "5px",
                width: "calc(100% - 70px)",
                background: "#bbb",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Box
                bgcolor={number < 50 ? "#4489f8" : "#40c464"}
                width={number < 50 ? `${100 * (number / 50)}%` : "100%"}
                height={"100%"}
              ></Box>
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
      <Box>
        <Box
          p={1.5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"#4489f8"}
          borderRadius={"50%"}
          width={"54px"}
        >
          {icon}
        </Box>
      </Box>
    </>
  );
};

export default ApprovedAnswersProgress;
