import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import Profile from "./Profile";
import SuggestUsers from "../../Components/RightSidebar/SuggestUsers";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <>
      <Navbar2 selectedLabel={"Profile"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Profile"} />
        <Profile userId={userId} />
        <RightSidebar>
          <SuggestUsers />
        </RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default ProfilePage;
