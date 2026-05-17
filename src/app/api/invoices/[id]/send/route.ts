import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/dashboard/prisma";
import { stripe } from "@/lib/dashboard/stripe";
import { resend } from "@/lib/dashboard/resend";
import { auth } from "@/lib/dashboard/auth";
import { practice } from "@/lib/dashboard/practice";

export async function POST(
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

    try {
        const product = await stripe.products.create({
            name: `Invoice INV-${String(invoice.number).padStart(3, "0")}`,
            description: invoice.description,
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: invoice.amount,
            currency: invoice.currency,
        });

        const paymentLink = await stripe.paymentLinks.create({
            line_items: [{ price: price.id, quantity: 1 }],
            metadata: { invoiceId: invoice.id },
            after_completion: {
                type: "redirect",
                redirect: {
                    url: `${process.env.AUTH_URL}/payment-confirmed?invoiceId=${invoice.id}`,
                },
            },
        });

        const invoiceNumber = `INV-${String(invoice.number).padStart(3, "0")}`;
        const paymentUrl = paymentLink.url;

        const clientAddressHtml = invoice.clientAddress
            ? invoice.clientAddress
                  .split("\n")
                  .map(
                      (l) =>
                          `<span style="display:block;color:#666;">${l}</span>`
                  )
                  .join("")
            : "";

        const to = process.env.ADMIN_EMAIL ?? invoice.clientEmail;

        try {
            await resend.emails.send({
                from: process.env.RESEND_FROM!,
                to,
                subject: `Invoice ${invoiceNumber} from ${practice.name}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto;">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;">
                            <div>
                                <h1 style="font-size:18px;margin:0 0 2px;">${practice.name}</h1>
                                <p style="color:#666;font-size:12px;margin:0 0 8px;">${practice.tagline}</p>
                                ${practice.address
                                    .map(
                                        (l) =>
                                            `<span style="display:block;color:#888;font-size:12px;">${l}</span>`
                                    )
                                    .join("")}
                                <span style="display:block;color:#888;font-size:12px;margin-top:4px;">${practice.email}</span>
                            </div>
                            <div style="text-align:right;">
                                <h2 style="font-size:16px;margin:0;">${invoiceNumber}</h2>
                            </div>
                        </div>
                        <div style="margin-bottom:24px;">
                            <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 4px;">Bill To</p>
                            <p style="font-size:14px;font-weight:600;margin:0;">${invoice.clientName}</p>
                            ${clientAddressHtml}
                            <p style="color:#666;font-size:13px;margin:4px 0 0;">${invoice.clientEmail}</p>
                        </div>
                        <div style="border-top:1px solid #ddd;padding-top:16px;margin-bottom:16px;">
                            <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;">
                                <span style="color:#888;">${invoice.description}</span>
                                <span style="font-weight:600;">£${(invoice.amount / 100).toFixed(2)}</span>
                            </div>
                        </div>
                        <div style="border-top:1px solid #ddd;padding-top:12px;text-align:right;margin-bottom:24px;">
                            <span style="font-size:18px;font-weight:700;">£${(invoice.amount / 100).toFixed(2)}</span>
                        </div>
                        <a href="${paymentUrl}" style="display:inline-block;background:#1e1e1e;color:#fff;padding:12px 32px;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                            Pay Invoice
                        </a>
                        <p style="color:#888;font-size:11px;margin-top:24px;border-top:1px solid #eee;padding-top:16px;">
                            ${practice.name} — ${practice.tagline}
                        </p>
                    </div>
                `,
            });
        } catch (emailError) {
            const emailMsg =
                emailError instanceof Error
                    ? emailError.message
                    : "Unknown error";
            console.error("Resend failed (non-blocking):", emailMsg);
        }

        await prisma.invoice.update({
            where: { id },
            data: {
                status: "sent",
                stripePaymentLinkId: paymentLink.id,
                stripePaymentLinkUrl: paymentLink.url,
                sentAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, paymentUrl: paymentLink.url });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to send invoice:", message);
        return NextResponse.json(
            { error: `Failed to send invoice: ${message}` },
            { status: 500 }
        );
    }
}
