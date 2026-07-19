import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";
const registerUserIntoDB = async (payload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: { email },
    });
    if (isUserExist) {
        throw new Error("user with this email already exist");
    }
    const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            profile: {
                create: {
                    profilePhoto,
                },
            },
        },
    });
    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email || email,
        },
        omit: { password: true },
        include: {
            profile: true,
        },
    });
    return user;
};
const updateProfileInDB = async (userId, payload) => {
    const { name, profilePhoto, bio, experience } = payload;
    const updatedProfile = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            profile: {
                update: {
                    profilePhoto,
                    bio,
                    experience,
                },
            },
        },
        omit: {
            password: true,
        },
        include: {
            profile: true,
        },
    });
    return updatedProfile;
};
export const userService = {
    registerUserIntoDB,
    updateProfileInDB,
};
//# sourceMappingURL=users.service.js.map