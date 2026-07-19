import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import config from "../../../config";
import Stripe from "stripe";

const createPayment = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { customer: true, service: true },
  });

  // if (booking.status !== "ACCEPTED") {
  //   throw new Error("Booking must be accepted before payment");
  // }

  if (booking.service?.price == null) {
    throw new Error("Service price is not set");
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: booking.customer.email,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: { name: `Service: ${booking.service.name}` },
          unit_amount: 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${config.app_url}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.app_url}/payments/cancel`,
    metadata: { bookingId, userId },
  });

  await prisma.payment.create({
    data: {
      bookingId,
      stripeSessionId: session.id,
      amount: booking.service.price,
      provider: "STRIPE",
      status: "PENDING",
    },
  });

  return { url: session.url };
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    config.stripe_webhook_secret,
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      await prisma.payment.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: "COMPLETED", paidAt: new Date() },
      });

      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "COMPLETED" },
      });

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

const getPayments = async (userId: string) => {
  return prisma.payment.findMany({
    where: {
      booking: {
        customerId: userId, // 👈 filter by foreign key
      },
    },
    include: {
      booking: {
        include: {
          customer: true,
          service: true,
        },
      },
    },
  });
};

const getPaymentById = async (id: string, userId: string) => {
  return prisma.payment.findFirstOrThrow({
    where: { id, booking: { customerId: userId } },
    include: { booking: true },
  });
};

export const paymentService = {
  createPayment,
  handleWebhook,
  getPayments,
  getPaymentById,
};
