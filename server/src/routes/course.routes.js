import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";
import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCourses)
  .post(upload.single("thumbnail"), createCourse);

  
router
  .route("/:id")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(updateCourse)
  .delete(deleteCourse);

export default router;
