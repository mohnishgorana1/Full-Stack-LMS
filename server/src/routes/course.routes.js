import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
  addLectureToCourseById
} from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/jwtAuth.middleware.js";
import upload from "../middlewares/multer.middleware.js";



const router = express.Router();


router.route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles('ADMIN'),  // authorization
    upload.single("thumbnail"), 
    createCourse
    );


router.route("/:id")
  .get(
    isLoggedIn, 
    getLecturesByCourseId
  )
  .put( 
    isLoggedIn,   // authenticate
    authorizedRoles('ADMIN'),  // authorization
    updateCourse
  )
  .delete( 
    isLoggedIn,
    authorizedRoles('ADMIN'),
    deleteCourse
  )
  .post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCourseById
  )

export default router;
