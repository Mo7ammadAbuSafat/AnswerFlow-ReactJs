import { ResponsiveCalendar } from "@nivo/calendar";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Calender = ({ userId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://localhost:7127/api/statistics/calendar-statistics/users/${userId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setData(
            response.data.reduce((acc, curr) => {
              const dateObj = acc.find((obj) => obj.day === curr);
              if (dateObj) {
                if (dateObj.value < 4) {
                  dateObj.value++;
                }
              } else {
                acc.push({ day: curr, value: 1 });
              }
              return acc;
            }, [])
          );
        })
        .catch((error) => {
          alert("error occurred");
        });
    };
    fetchData();
  }, [userId]);

  return (
    <ResponsiveCalendar
      data={data}
      from="2023-01-01"
      to="2023-12-30"
      emptyColor="#eeeeee"
      colors={[
        "white",
        "rgb(145, 218, 158)",
        "rgb(64, 196, 99)",
        "rgb(48, 161, 78)",
        "rgb(33, 110, 57)",
      ]}
      margin={{ top: 40, right: 0, bottom: 40, left: 20 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      isInteractive={false}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export default Calender;
