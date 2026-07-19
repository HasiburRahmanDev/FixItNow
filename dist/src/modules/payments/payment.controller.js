import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const payment = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await paymentService.createPayment(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "payment created successfully",
        data: { result },
    });
});
const handleWebhook = catchAsync(async (req, res) => {
    const payload = req.body;
    const signatureHeader = req.headers["stripe-signature"];
    const signature = Array.isArray(signatureHeader)
        ? signatureHeader[0]
        : signatureHeader;
    console.log("Webhook received", {
        bodyType: Buffer.isBuffer(payload) ? "buffer" : typeof payload,
        bodyLength: Buffer.isBuffer(payload) ? payload.length : 0,
        hasSignature: Boolean(signature),
    });
    await paymentService.handleWebhook(payload, signature);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "webhook triggered successfully",
        data: {},
    });
});
export const paymentController = {
    payment,
    handleWebhook,
};
//# sourceMappingURL=payment.controller.js.map