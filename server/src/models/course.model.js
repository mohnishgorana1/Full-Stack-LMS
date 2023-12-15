import mongoose, { Schema } from "mongoose";
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minLength: [8, "title must be at least 8 characters"],
      maxLength: [59, "title must be less than 60 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [10, "description must be at least 10 characters"],
      maxLength: [200, "description must be less than 201 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    lectures: [
      {
        title: String,
        description: String,
        lecture: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numberOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,

    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
