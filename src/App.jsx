import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import SignUpPage from "./Pages/SignPages/SignUpPage";
import SignInPage from "./Pages/SignPages/SignInPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import VerifyEmailPage from "./Pages/SignPages/VerifyEmailPage";
import FeedPage from "./Pages/FeedPage/FeedPage";
import SuccessAlert from "./Components/General/SuccessAlert";
import ResetPasswordPage1 from "./Pages/SignPages/ResetPasswordPage1";
import ResetPasswordPage2 from "./Pages/SignPages/ResetPasswordPage2";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import ScrollToTop from "./Components/General/ScrollToTop";
import MyAccountPage from "./Pages/MyAccountPage/MyAccountPage";
import ProtectedPage from "./Pages/ProtectedPage/ProtectedPage";
import QuestionsPage from "./Pages/QuestionsPage/QuestionsPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import TagsPage from "./Pages/TagsPage/TagsPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import SavedQuestionsPage from "./Pages/SavedQuestionsPage/SavedQuestionsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="verify-email/:email" element={<VerifyEmailPage />} />
          <Route path="reset-password-code" element={<ResetPasswordPage1 />} />
          <Route
            path="reset-password/:email"
            element={<ResetPasswordPage2 />}
          />
          <Route
            path="users/account"
            element={
              <ProtectedPage>
                <MyAccountPage />
              </ProtectedPage>
            }
          />
          <Route
            path="users/saved-questions"
            element={
              <ProtectedPage>
                <SavedQuestionsPage />
              </ProtectedPage>
            }
          />
          <Route path="ProfilePage/:userId" element={<ProfilePage />} />
          <Route path="aboutUsPage" element={<AboutUsPage />} />
          <Route path="feedPage" element={<FeedPage />} />
          <Route path="QuestionsPage" element={<QuestionsPage />} />
          <Route path="questionsPage/:questionId" element={<QuestionPage />} />
          <Route path="TagsPage" element={<TagsPage />} />
          <Route
            path="DashboardPage"
            element={
              <ProtectedPage isForAdmin={true}>
                <DashboardPage />
              </ProtectedPage>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <SuccessAlert />
    </>
  );
}

export default App;
