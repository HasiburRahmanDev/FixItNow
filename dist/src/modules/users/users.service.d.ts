import Iusers from "./user.interface";
export declare const userService: {
    registerUserIntoDB: (payload: Iusers) => Promise<({
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            bio: string | null;
            experience: number | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        stripeCustomerId: string | null;
        name: string;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateProfileInDB: (userId: string, payload: any) => Promise<{
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            bio: string | null;
            experience: number | null;
            userId: string;
        } | null;
    } & {
        id: string;
        email: string;
        stripeCustomerId: string | null;
        name: string;
        status: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=users.service.d.ts.map