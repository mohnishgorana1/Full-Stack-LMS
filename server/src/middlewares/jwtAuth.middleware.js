import AppError from "../utils/error.util";
import { Jwt } from "jsonwebtoken";
const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookie;
  if (!token) {
    return next(new AppError("Unauthenticated, Please login again", 401));
  }

  const userDetails = await Jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;
};

export {
    isLoggedIn
    
}
