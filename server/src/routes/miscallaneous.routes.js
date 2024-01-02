import { Router } from "express";

import {
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/jwtAuth.middleware.js";
import { userStats } from "../controllers/miscallaneous.controller.js";

const router = Router();

router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizedRoles("ADMIN"), userStats);

export default router;
