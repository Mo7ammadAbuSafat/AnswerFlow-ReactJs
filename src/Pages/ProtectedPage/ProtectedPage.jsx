import React, { useContext } from "react";
import AuthContext from "../../Components/Store/AuthProvider";
import SignInPage from "../SignPages/SignInPage";

const ProtectedPage = ({ children, isForAdmin }) => {
  const authContext = useContext(AuthContext);
  if (authContext.isLoggedIn) {
    if (isForAdmin) {
      if (authContext.user.type === 3) {
        return children;
      } else return <SignInPage />;
    } else return children;
  } else return <SignInPage />;
};

export default ProtectedPage;
