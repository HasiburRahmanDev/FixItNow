import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status";
const createPayment = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user!.id;
  const result = await paymentService.createPayment(
    bookingId as string,
    userId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment session created",
    data: result,
  });
});

const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;
  try {
    await paymentService.handleWebhook(req.body, sig as string);
    res.status(200).send({ received: true });
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

const getPayments = catchAsync(async (req, res) => {
  const userId = req.user!.id;
  const result = await paymentService.getPayments(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history fetched",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const result = await paymentService.getPaymentById(id as string, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment details fetched",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  handleWebhook,
  getPayments,
  getPaymentById,
};
