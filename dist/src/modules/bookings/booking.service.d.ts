import { IBooking } from "./booking.interface";
export declare const bookingService: {
    createBookingInDB: (payload: IBooking, userId: string) => Promise<{
        service: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number | null;
            location: string | null;
            rating: number | null;
            technicianProfileId: string;
        };
    } & {
        id: string;
        name: string;
        status: import("../../../generated/prisma/enums").BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingAt: Date | null;
        address: string;
        customerId: string;
        serviceId: string;
    }>;
    getMyBookingsFromDB: () => Promise<({
        service: {
            technicianProfile: {
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
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                profilePhoto: string | null;
                bio: string | null;
                experience: number | null;
                userId: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number | null;
            location: string | null;
            rating: number | null;
            technicianProfileId: string;
        };
    } & {
        id: string;
        name: string;
        status: import("../../../generated/prisma/enums").BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingAt: Date | null;
        address: string;
        customerId: string;
        serviceId: string;
    })[]>;
    getBookingByIdFromDB: (bookingId: string, userId: string) => Promise<({
        service: {
            technicianProfile: {
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
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                profilePhoto: string | null;
                bio: string | null;
                experience: number | null;
                userId: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number | null;
            location: string | null;
            rating: number | null;
            technicianProfileId: string;
        };
    } & {
        id: string;
        name: string;
        status: import("../../../generated/prisma/enums").BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingAt: Date | null;
        address: string;
        customerId: string;
        serviceId: string;
    }) | null>;
};
//# sourceMappingURL=booking.service.d.ts.map