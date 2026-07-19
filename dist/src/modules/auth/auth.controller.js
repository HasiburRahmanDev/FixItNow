import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const loginUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user logged in successfully",
        data: {
            user,
            accessToken,
            refreshToken,
        },
    });
});
const getMyProfile = catchAsync(async (req, res, next) => {
    const profile = await authService.getMyProfile(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user profile fetched successfully",
        data: {
            profile,
        },
    });
});
const refreshToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "token refreshed successfully",
        data: {
            accessToken,
        },
    });
});
export const authController = {
    loginUser,
    getMyProfile,
    refreshToken,
};
//# sourceMappingURL=auth.controller.js.map