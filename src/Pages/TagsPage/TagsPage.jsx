import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import Tags from "./Tags";

const TagsPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Tags"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Tags"} />
        <Tags />
        <RightSidebar></RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default TagsPage;
