import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import sendEmail from "../utils/sendEmail.js";

/*
 * @USER_STATS_ADMIN
 * @ROUTE @GET {{URL}}/api/v1/admin/stats/users
 * @ACCESS Private(ADMIN ONLY)
 */

export const userStats = async (req, res, next) => {
  const allUsersCount = await User.countDocuments();

  const subscribedUsersCount = await User.countDocuments({
    "subscription.status": "active", // subscription.status means we are going inside an object and we have to put this in quotes
  });

  console.log("count: ", allUsersCount, subscribedUsersCount);

  res.status(200).json({
    success: true,
    message: "All registered users count",
    allUsersCount,
    subscribedUsersCount,
  });
};
