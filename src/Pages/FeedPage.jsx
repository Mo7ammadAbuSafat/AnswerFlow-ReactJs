import React from "react";
import Feed from "../Components/Feed";
import Footer from "../Components/Footer/Footer";
import LeftSidebar from "../Components/LeftSidebar/LeftSidebar";
import Navbar2 from "../Components/Navbar/Navbar2";
import RightSidebar from "../Components/RightSidebar/RightSidebar";
import ThreeColumnLayout from "../Components/ThreeColumnLayout";

const FeedPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Feed"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Feed"} />
        <Feed />
        <RightSidebar />
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default FeedPage;
