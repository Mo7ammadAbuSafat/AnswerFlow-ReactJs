import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import SuggestUsers from "../../Components/RightSidebar/SuggestUsers";
import Footer from "../../Components/Footer/Footer";
import Tags from "./Tags";

const TagsPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Tags"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Tags"} />
        <Tags />
        <RightSidebar>
          <SuggestUsers />
        </RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default TagsPage;
