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
  // console.log('ID : ',id);
  try {
    const course = await Course.findById(id);
    // console.log("COURSE>> ", course);
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
    thumbnail: {
      public_id: "DUMMY",
      secure_url: "DUMMY",
    },
  });
  if (!course) {
    return next(new AppError("Error creating the course", 500));
  }

  try {
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
  } catch (error) {
    return next(new AppError(`Error Uploading File : ${error.message}`, 500));
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course created Successfully",
    course,
  });
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, //! jo bhi info mile usko simply blindly jake update krdo
      },
      {
        runValidators: true,
      }
    );
    if (!course) {
      return next(new AppError("Course does not exist with given id", 401));
    }

    res.status(200).json({
      success: true,
      message: "Course Updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Course does not exist with given id", 401));
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course DELETED successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const addLectureToCourseById = async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  if (!title || !description) {
    return next(new AppError("Title and Description are required", 400));
  }
  
  const course = await Course.findById(id);
  
  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 400));
  }
  
  let lectureData = {};
  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms", // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: "video",
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      for (const file of await fs.readdir("uploads/")) {
        await fs.unlink(path.join("uploads/", file));
      }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || "File not uploaded, please try again",
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  res.status(200).json({
    success: true,
    message: "Course lecture added successfully",
    course,
  });
};
export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  addLectureToCourseById,
};
