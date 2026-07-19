import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../../config";
import { jwtUtils } from "../../utils/jwt";
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email,
        },
    });
    if (user.status == "BAN") {
        throw new Error("You account is banned. please contact the admin");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("password is incorrect");
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return { user, accessToken, refreshToken };
};
const getMyProfile = async (userId) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: {
            password: true,
        },
        include: {
            profile: true,
        },
    });
    return user;
};
const refreshToken = async (refreshTOken) => {
    const verifyRefreshToken = jwtUtils.verifyToken(refreshTOken, config.jwt_refresh_secret);
    if (!verifyRefreshToken.success) {
        throw new Error(verifyRefreshToken.error);
    }
    const { id } = verifyRefreshToken.data;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (user.status === "BAN") {
        throw new Error("User is banned!");
    }
    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    return { accessToken };
};
export const authService = {
    loginUser,
    getMyProfile,
    refreshToken,
};
//# sourceMappingURL=auth.service.js.map