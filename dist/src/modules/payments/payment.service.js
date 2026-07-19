import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
const createPayment = async (userId) => {
    const transactionResult = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            include: {
                payments: true,
            },
        });
        let stripeCustomerId = user.stripeCustomerId;
        // if (!stripeCustomerId) {
        //   const customer = await stripe.customers.create({
        //     email: user.email,
        //     name: user.name,
        //     metadata: { userId: user.id },
        //   });
        //   stripeCustomerId = customer.id;
        // }
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name,
            metadata: {
                userId: user.id,
            },
        });
        stripeCustomerId = customer.id;
        await tx.user.update({
            where: {
                id: user.id,
            },
            data: {
                stripeCustomerId,
            },
        });
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: config.stripe_product_id,
                    quantity: 1,
                },
            ],
            success_url: `${config.app_url}/booked?success=true`,
            cancel_url: `${config.app_url}/payment?success=false`,
            metadata: {
                userId: user.id,
            },
        });
        return session.url;
    });
    return {
        paymentUrl: transactionResult,
    };
};
const handleWebhook = async (payload, signature) => {
    const endpointSecret = config.stripe_webhook_secret;
    if (!payload || !signature) {
        console.error("Stripe webhook payload or signature is missing.");
        throw new Error("Stripe webhook payload or signature is missing.");
    }
    const rawPayload = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
    try {
        const event = stripe.webhooks.constructEvent(rawPayload, signature, endpointSecret);
        console.log("Stripe webhook event received:", event.type);
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                console.log("Payment successful");
                console.log(session);
                break;
            }
            case "customer.subscription.created":
                // const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            case "customer.subscription.deleted":
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
                break;
        }
    }
    catch (error) {
        console.error("Stripe webhook verification failed.", error);
        throw error;
    }
};
export const paymentService = {
    createPayment,
    handleWebhook,
};
//# sourceMappingURL=payment.service.js.map