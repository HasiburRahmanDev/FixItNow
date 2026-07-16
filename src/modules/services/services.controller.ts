import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { services } from "./services.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.user?.id;
    const result = await services.createServicesInDB(payload, id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "services created successfully",
      data: { result },
    });
  },
);
const getAllServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await services.getAllServicesFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Services retrieved successfully",
      data: { result },
    });
  },
);

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await services.getAllTechniciansFromDB(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Technicians retrieved successfully",
      data: { result },
    });
  },
);

export const serviceController = {
  getAllServices,
  createServices,
  getAllTechnicians,
};
