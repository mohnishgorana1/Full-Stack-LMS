import { Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
