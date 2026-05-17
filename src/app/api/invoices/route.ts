import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/dashboard/prisma";
import { auth } from "@/lib/dashboard/auth";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { clientName, clientEmail, clientAddress, description, amount } =
            body;

        if (!clientName || !clientEmail || !description || !amount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get the next invoice number
        const lastInvoice = await prisma.invoice.findFirst({
            orderBy: { number: "desc" },
        });
        const number = (lastInvoice?.number ?? 0) + 1;

        const invoice = await prisma.invoice.create({
            data: {
                number,
                clientName,
                clientEmail,
                clientAddress,
                description,
                amount,
                currency: "gbp",
                status: "draft",
            },
        });

        return NextResponse.json(invoice, { status: 201 });
    } catch (error) {
        console.error("Failed to create invoice:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoices = await prisma.invoice.findMany({
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
}
