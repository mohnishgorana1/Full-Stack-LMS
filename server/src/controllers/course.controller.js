import { Course } from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary, { v2 } from "cloudinary";
import fs from "fs/promises";

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

const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are requires", 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
  });
  if (!course) {
    return next(new AppError("Error creating the course", 500));
  }

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "lms",
    });
    if (result) {
      course.thumbnail.public_id = result.public_id;
      course.thumbnail.secure_url = result.secure_url;
    }
    fs.rm(`uploads/${req.file.filename}`);
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course created Successfully",
  });
};

const updateCourse = async (req, res, next) => {};
const deleteCourse = async (req, res, next) => {};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
};
