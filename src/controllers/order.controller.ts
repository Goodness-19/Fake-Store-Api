import { Request, Response } from "express";
import OrderService from "../services/order.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

interface AuthRequest extends Request {
  user: {
    id: number;
  };
}

class OrderController {
  service = new OrderService();

  createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const { items } = req.body;

    const order = await this.service.createOrder({
      userId,
      items
    });

    res.status(201).json({
      success: true,
      data: order
    });
  });

  getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;

    const orders = await this.service.getMyOrders(userId);

    res.json({
      success: true,
      data: orders
    });
  });

  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);

    const order = await this.service.getOrderById(orderId);

    res.json({
      success: true,
      data: order
    });
  });

  deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = Number(req.params.id);

    const result = await this.service.deleteOrder(orderId);

    res.json({
      success: true,
      data: result
    });
  });
}

export default OrderController;