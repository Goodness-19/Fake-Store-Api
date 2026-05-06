import { Request, Response } from "express";
import UserService from "../services/user.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

class UserController {
  private service = new UserService();

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  });

  getUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await this.service.getUsers();

    res.json({
      success: true,
      data: users,
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const user = await this.service.getUserById(id);

    res.json({
      success: true,
      data: user,
    });
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const user = await this.service.updateUser(id, req.body);

    res.json({
      success: true,
      data: user,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await this.service.deleteUser(id);

    res.json({
      success: true,
      data: result,
    });
  });
}

export default UserController;
