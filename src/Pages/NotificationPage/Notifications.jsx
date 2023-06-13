import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import NotificationCard from "./NotificationCard";
import { NotificationContext } from "../../Components/Store/NotificationProvider";

const Notifications = () => {
  const {
    markAsRead,
    pageNumber,
    setPageNumber,
    numOfPages,
    newNotifications,
    oldNotifications,
  } = useContext(NotificationContext);

  return (
    <Stack flex={4} paddingTop={4} alignItems={"center"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Typography variant="h4" color="text.secondary" sx={{ margin: 0 }}>
          Notifications
        </Typography>
        <Button disabled={newNotifications.length === 0} onClick={markAsRead}>
          mark as read
        </Button>
      </Stack>
      <Stack
        marginTop={6}
        width={{ xs: "100%", md: "80%" }}
        padding={"0 10px"}
        spacing={1}
      >
        {newNotifications.length !== 0 && (
          <>
            <Typography variant="h6" color="text.secondary" sx={{ margin: 0 }}>
              new
            </Typography>
            {newNotifications.map((notification) => (
              <NotificationCard notificationData={notification} />
            ))}
          </>
        )}
        {oldNotifications.length !== 0 && (
          <>
            <Typography variant="h6" color="text.secondary" sx={{ margin: 0 }}>
              old
            </Typography>
            {oldNotifications.map((notification) => (
              <NotificationCard notificationData={notification} />
            ))}
          </>
        )}
      </Stack>
      <Stack marginTop={6} justifyContent={"center"} alignItems={"center"}>
        <Pagination
          count={numOfPages}
          color="primary"
          onChange={(e, page) => {
            setPageNumber(page);
            window.scroll(0, 0);
          }}
          value={pageNumber}
        />
      </Stack>
    </Stack>
  );
};

export default Notifications;
