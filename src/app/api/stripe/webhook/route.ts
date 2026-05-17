import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/dashboard/stripe";
import { prisma } from "@/lib/dashboard/prisma";

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
        return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    try {
        const body = await req.text();
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const paymentLinkId =
                typeof session.payment_link === "string"
                    ? session.payment_link
                    : (session.payment_link as { id: string } | null)?.id ??
                      null;

            if (paymentLinkId) {
                const updated = await prisma.invoice.updateMany({
                    where: { stripePaymentLinkId: paymentLinkId },
                    data: {
                        status: "paid",
                        paidAt: new Date(),
                    },
                });

                if (updated.count > 0) {
                    await stripe.paymentLinks.update(paymentLinkId, {
                        active: false,
                    });
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error("Webhook error:", err);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 400 }
        );
    }
}
