import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route element={<WelcomePage />} />
          <Route path="*" element={<div>error 404</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
