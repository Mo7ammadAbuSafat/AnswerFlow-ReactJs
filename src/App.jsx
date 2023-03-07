import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="welcomePage" element={<WelcomePage />} />
          <Route path="*" element={<div>error 404</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
