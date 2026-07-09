import { Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./users.service";

const userRegister = async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await userService.registerUserIntoDB(payload);

  res.status(httpStatus.CREATED).json({
    message: "user registered successfully",
    data: {
      user,
    },
  });
};

export const userController = {
  userRegister,
};
