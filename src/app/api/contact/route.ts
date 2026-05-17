import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/dashboard/prisma";
import { resend } from "@/lib/dashboard/resend";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, projectType, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save to database
        await prisma.inquiry.create({
            data: { name, email, projectType, message },
        });

        // Send auto-reply via Resend
        await resend.emails.send({
            from: process.env.RESEND_FROM!,
            to: email,
            subject: "Thank you for your inquiry — Anatomical Archive",
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h1 style="font-size: 18px; margin-bottom: 4px;">Anatomical Archive</h1>
                    <p style="color: #666; font-size: 13px; margin-bottom: 24px;">Clinical Documentation</p>

                    <p style="font-size: 14px;">Dear ${name},</p>
                    <p style="font-size: 14px;">
                        Thank you for your inquiry regarding <strong>${projectType.replace(/-/g, " ")}</strong>.
                        Your message has been received and will be reviewed in the order it was received.
                    </p>
                    <p style="font-size: 14px;">
                        I typically respond within 2–3 business days. For urgent matters, please indicate so in your subject line.
                    </p>
                    <p style="font-size: 14px;">Warm regards,</p>
                    <p style="font-size: 14px; margin: 0;">Anatomical Archive</p>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                    <p style="color: #999; font-size: 11px;">
                        ${message.substring(0, 100)}${message.length > 100 ? "..." : ""}
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Failed to process inquiry:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
