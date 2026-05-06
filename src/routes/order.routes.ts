import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createOrderSchema } from "../validation/order.validation.js";

const router = Router();
const controller = new OrderController();

router.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  controller.createOrder,
);
router.get("/me", authMiddleware, controller.getMyOrders);
router.get("/:id", authMiddleware, controller.getOrderById);
router.delete("/:id", authMiddleware, controller.deleteOrder);

export default router;