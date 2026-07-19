export declare const paymentService: {
    createPayment: (userId: string) => Promise<{
        paymentUrl: string | null;
    }>;
    handleWebhook: (payload: Buffer | undefined, signature: string) => Promise<void>;
};
//# sourceMappingURL=payment.service.d.ts.map