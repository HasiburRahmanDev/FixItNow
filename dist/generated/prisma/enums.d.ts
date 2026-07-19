export declare const ActiveStatus: {
    readonly BAN: "BAN";
    readonly UNBAN: "UNBAN";
};
export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];
export declare const Role: {
    readonly CUSTOMER: "CUSTOMER";
    readonly TECHNICIAN: "TECHNICIAN";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map