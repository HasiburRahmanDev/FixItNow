import { prisma } from "../../lib/prisma";
const createBookingInDB = async (payload, userId) => {
    const result = await prisma.booking.create({
        data: {
            name: payload.name,
            bookingAt: payload.bookingAt,
            address: payload.address,
            serviceId: payload.serviceId,
            customerId: userId,
        },
        include: {
            service: true,
        },
    });
    return result;
};
const getMyBookingsFromDB = async () => {
    return prisma.booking.findMany({
        include: {
            service: {
                include: {
                    technicianProfile: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getBookingByIdFromDB = async (bookingId, userId) => {
    const result = await prisma.booking.findFirst({
        where: {
            id: bookingId,
            customerId: userId,
        },
        include: {
            service: {
                include: {
                    // category: true,
                    technicianProfile: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        },
    });
    return result;
};
export const bookingService = {
    createBookingInDB,
    getMyBookingsFromDB,
    getBookingByIdFromDB,
};
//# sourceMappingURL=booking.service.js.map