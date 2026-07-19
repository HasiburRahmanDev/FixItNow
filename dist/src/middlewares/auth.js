import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../../config";
import { prisma } from "../lib/prisma";
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in. please log into access this resource.");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { email, name, id, role } = verifiedToken.data;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden, you don't have access to this resource");
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                name,
                role,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.status === "BAN") {
            throw new Error("Your account is Banned. please contact support");
        }
        req.user = {
            email,
            name,
            id,
            role,
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map