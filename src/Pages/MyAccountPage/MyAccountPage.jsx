import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import MyAccount from "./MyAccount";

const MyAccountPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"My Account"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"My Account"} />
        <MyAccount />
        <RightSidebar></RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default MyAccountPage;
