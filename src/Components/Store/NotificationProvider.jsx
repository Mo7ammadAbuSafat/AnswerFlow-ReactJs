import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthProvider";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => setTrigger(!trigger);
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [numOfNewNotifications, setNumOfNewNotifications] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://localhost:7127/api/users/${authContext.user.id}/notifications`,
          {
            params: {
              pageNumber: pageNumber,
              pageSize: 10,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authContext.token}`,
            },
          }
        )
        .then((response) => {
          setData(response.data.notifications);
          setNumOfPages(response.data.numOfPages);
          setNumOfNewNotifications(response.data.numOfNewNotification);
        });
    };
    if (authContext.isLoggedIn) {
      fetchData();
    }
  }, [pageNumber, trigger, authContext]);

  const markAsRead = async () => {
    await axios.put(
      `https://localhost:7127/api/users/${authContext.user.id}/notifications`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${authContext.token}`,
        },
      }
    );
    handleTrigger();
  };

  const newNotifications = data.filter((n) => n.status === 0);
  const oldNotifications = data.filter((n) => n.status === 1);

  const value = {
    markAsRead: markAsRead,
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    numOfPages: numOfPages,
    setNumOfPages: setNumOfPages,
    newNotifications: newNotifications,
    oldNotifications: oldNotifications,
    numOfNewNotifications: numOfNewNotifications,
  };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
