import React from "react";
import { useParams } from "react-router-dom";
import FullQuestion from "../../Components/Question/FullQuestion";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Navbar2 from "../../Components/Navbar/Navbar2";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import ThreeColumnLayout from "../../Components/Layout/ThreeColumnLayout";
import Footer from "../../Components/Footer/Footer";
import PopularTags from "../../Components/RightSidebar/PopularTags";

function QuestionPage() {
  const { questionId } = useParams();
  return (
    <>
      <Navbar2 selectedLabel={"Questions"} />
      <ThreeColumnLayout>
        <LeftSidebar selectedLabel={"Questions"} />
        <FullQuestion questionId={questionId} />
        <RightSidebar>
          <PopularTags />
        </RightSidebar>
      </ThreeColumnLayout>
      <Footer />
    </>
  );
}

export default QuestionPage;
