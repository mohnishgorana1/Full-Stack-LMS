import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
