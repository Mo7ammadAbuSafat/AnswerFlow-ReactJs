import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import Notifications from "./Notifications";

const NotificationsPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Notifications"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Notifications"} />
        <Notifications />
        <RightSidebar></RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default NotificationsPage;
