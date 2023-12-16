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
    return next(new AppError(e.message, "Something went wrong in file"));
  }
};

const getLecturesByCourseId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid Course ID", 500));
    }

    return res.status(200).json({
      success: true,
      message: "Course Fetched Successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export { getAllCourses, getLecturesByCourseId };
