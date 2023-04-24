import React from "react";
import Footer from "../../Components/Footer/Footer";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import Dashboard from "./Dashboard";

const DashboardPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Dashboard"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Dashboard"} />
        <Dashboard />
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default DashboardPage;
