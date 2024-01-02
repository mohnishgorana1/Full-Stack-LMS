import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import Footer from "./Components/Footer";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Courses/CourseDescription";
import CourseList from "./Pages/Courses/CourseList";
import CreateCourse from "./Pages/Courses/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/description" element={<CourseDescription />} />

        <Route path="/denied" element={<Denied />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/course/displaylectures" element={<DisplayLectures /> }/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
