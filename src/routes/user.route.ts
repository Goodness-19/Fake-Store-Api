import express from "express";
import UserController from "../controllers/user.controller.js";
import rateLimiter from "../middlewares/rateLimit.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { registerSchema, updateUserSchema } from "../validation/user.validation.js";

const router = express.Router();
const controller = new UserController();

router.post(
  "/register",
  rateLimiter,
  validate(registerSchema),
  controller.createUser,
);

router.get("/", authMiddleware, controller.getUsers);
router.get("/:id", authMiddleware, controller.getUserByUuid);
router.put(
  "/:id",
  authMiddleware,
  validate(updateUserSchema),
  controller.updateUser,
);
router.delete("/:id", authMiddleware, controller.deleteUser);

export default router;