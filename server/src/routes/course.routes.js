import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";
import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const router = express.Router();

router.route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    upload.single("thumbnail"), 
    createCourse
    );


router.route("/:id")
  .get(
    isLoggedIn, 
    getLecturesByCourseId
  )
  .put( 
    isLoggedIn,
    updateCourse
  )
  .delete( 
    isLoggedIn,
    deleteCourse
  );

export default router;
