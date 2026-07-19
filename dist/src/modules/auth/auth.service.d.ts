import { ILoginUser } from "./auth.interface";
export declare const authService: {
    loginUser: (payload: ILoginUser) => Promise<{
        user: {
            id: string;
            email: string;
            stripeCustomerId: string | null;
            name: string;
            password: string;
            status: import("../../../generated/prisma/enums").ActiveStatus;
            role: import("../../../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    getMyProfile: (userId: string) => Promise<{
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
    refreshToken: (refreshTOken: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map