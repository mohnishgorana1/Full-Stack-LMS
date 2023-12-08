import { User } from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7day,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if ((!fullName, !email, !password)) {
    return next(new AppError("All Fields are required", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exists", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.drupal.org%2Ffiles%2Fproject-images%2Flogo_191.png&tbnid=f_PPzQ4v8MVP1M&vet=12ahUKEwiGy9jWq_-CAxXRR2wGHU7ZDHYQMygBegQIARBj..i&imgrefurl=https%3A%2F%2Fwww.drupal.org%2Fproject%2Fcloudinary&docid=u1Lsc-20jV02yM&w=1001&h=194&q=cloudinary&ved=2ahUKEwiGy9jWq_-CAxXRR2wGHU7ZDHYQMygBegQIARBj",
    },
  });

  if (!user) {
    return next(
      new AppError(
        "User Registration failed, Please try again after some time",
        400
      )
    );
  }

  // TODO: File upload\

  await user.save();
  user.password = undefined;

  const token = await user.jwtToken();
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return next(new AppError("All Fields are Required", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Invalid Credentials", 400));
    }

    user.password = undefined;

    const token = await user.jwtToken();
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login Success",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie(token, null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out",
  });
};
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export { register, login, logout, getProfile };
