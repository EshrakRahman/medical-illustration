import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/dashboard/prisma";
import { stripe } from "@/lib/dashboard/stripe";
import { auth } from "@/lib/dashboard/auth";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({ where: { id } });

    if (!invoice) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const invoice = await prisma.invoice.update({
        where: { id },
        data: body,
    });

    if (body.status === "paid" && invoice.stripePaymentLinkId) {
        try {
            await stripe.paymentLinks.update(invoice.stripePaymentLinkId, {
                active: false,
            });
        } catch {
            console.error(
                "Failed to deactivate payment link:",
                invoice.stripePaymentLinkId
            );
        }
    }

    return NextResponse.json(invoice);
}
