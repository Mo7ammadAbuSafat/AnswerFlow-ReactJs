import { Box, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StatBox = ({ title, number, increase, icon }) => {
  return (
    <>
      <Stack spacing={2}>
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
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={0}
            color={increase < 0 ? "red" : "green"}
            fontSize={11}
          >
            <ArrowUpwardIcon />
            <Typography>{Math.floor(Math.abs(increase))}%</Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "rgb(108, 115, 127)",
            }}
          >
            Since last month
          </Typography>
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
        >
          {icon}
        </Box>
      </Box>
    </>
  );
};

export default StatBox;
