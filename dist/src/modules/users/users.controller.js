import httpStatus from "http-status";
import { userService } from "./users.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
const userRegister = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "user Registered successful",
        data: { user },
    });
});
const updateProfile = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await userService.updateProfileInDB(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "user updated successfully",
        data: { result },
    });
});
export const userController = {
    userRegister,
    updateProfile,
};
//# sourceMappingURL=users.controller.js.map