import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import SignUpPage from "./Pages/SignPages/SignUpPage";
import SignInPage from "./Pages/SignPages/SignInPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import VerifyEmailPage from "./Pages/SignPages/VerifyEmailPage";
import FeedPage from "./Pages/FeedPage/FeedPage";
import ResetPasswordPage from "./Pages/SignPages/ResetPasswordPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path="signUpPage" element={<SignUpPage />} />
          <Route path="signInPage" element={<SignInPage />} />
          <Route path="verifyEmailPage" element={<VerifyEmailPage />} />
          <Route path="resetPasswordPage" element={<ResetPasswordPage />} />
          <Route path="aboutUsPage" element={<AboutUsPage />} />
          <Route path="feedPage" element={<FeedPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
