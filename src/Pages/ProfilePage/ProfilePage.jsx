import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import Profile from "./Profile";

const ProfilePage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Profile"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Profile"} />
        <Profile />
        <RightSidebar></RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default ProfilePage;
