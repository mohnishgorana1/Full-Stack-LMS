import { Course } from "../models/course.model.js";
import AppError from "../utils/error.util.js";

const getAllCourses = async (req, res, next) => {
  try {
    const course = await Course.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: "All Courses",
      course,
    });
  } catch (e) {
    return next( new AppError(e.message, 'Something went wrong in file'))
  }
};
const getLecturesByCourseId = async (req, res, next) => {};

export { getAllCourses, getLecturesByCourseId };
