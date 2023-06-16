import React from "react";
import Navbar2 from "../../Components/Navbar/Navbar2";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import PopularTags from "../../Components/RightSidebar/PopularTags";
import Footer from "../../Components/Footer/Footer";
import SavedQuestions from "./SavedQuestions";

const SavedQuestionsPage = () => {
  return (
    <>
      <Navbar2 selectedLabel={"Saved"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Saved"} />
        <SavedQuestions />
        <RightSidebar>
          <PopularTags />
        </RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
};

export default SavedQuestionsPage;
