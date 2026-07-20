import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookingService.createBookingInDB(
      req.body,
      req.user!.id,
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  },
);

const getMyBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getMyBookingsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const result = await bookingService.getBookingByIdFromDB(
    req.params.id as string,
    req.user!.id,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking retrieved successfully",
    data: { result },
  });
});

export const bookingController = {
  createBooking,
  getMyBookings,
  getBookingById,
};
