import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import config from "../config";
import { userRoutes } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/services/services.route";
import { bookingRoutes } from "./modules/bookings/booking.route";
import { paymentRoutes } from "./modules/payments/payment.route";
const app = express();
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));
const endpointSecret = config.stripe_webhook_secret;
// app.use(
//   "/api/payment/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     let event = request.body;
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers["stripe-signature"]!;
//       try {
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret,
//         );
//       } catch (err: any) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return response.status(400).json({
//           message: err.message,
//         });
//       }
//     }
//     // Handle the event
//     switch (event.type) {
//       case "payment_intent.succeeded":
//         const paymentIntent = event.data.object;
//         console.log(
//           `PaymentIntent for ${paymentIntent.amount} was successful!`,
//         );
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//       case "payment_method.attached":
//         const paymentMethod = event.data.object;
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   },
// );
app.use("/api/payment/webhook", express.raw({ type: "application/json" }), (req, res, next) => {
    console.log("Stripe webhook raw body parser activated");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/", serviceRoutes);
app.use("/api/", bookingRoutes);
app.use("/api/payment/", paymentRoutes);
export default app;
//# sourceMappingURL=app.js.map