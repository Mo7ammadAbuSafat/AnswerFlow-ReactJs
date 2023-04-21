import React, { useContext } from "react";
import AuthContext from "../../Components/Store/AuthProvider";
import SignInPage from "../SignPages/SignInPage";

const ProtectedPage = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (authContext.isLoggedIn) {
    return children;
  } else return <SignInPage />;
};

export default ProtectedPage;
