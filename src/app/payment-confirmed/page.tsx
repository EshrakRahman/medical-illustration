import { prisma } from "@/lib/dashboard/prisma";
import { CheckCircle } from "lucide-react";

export default async function PaymentConfirmedPage({
    searchParams,
}: {
    searchParams: Promise<{ invoiceId?: string }>;
}) {
    const { invoiceId } = await searchParams;

    let invoiceNumber = "";
    if (invoiceId) {
        const invoice = await prisma.invoice.findUnique({
            where: { id: invoiceId },
            select: { number: true },
        });
        if (invoice) {
            invoiceNumber = `INV-${String(invoice.number).padStart(3, "0")}`;
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center bg-[#111113]">
            <div className="text-center max-w-sm mx-auto px-6">
                <div className="mb-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-xl font-heading text-[#e8e8e8] mb-1">
                        Anatomical Archive
                    </h1>
                    <p className="text-xs text-[#8b8b8b] tracking-widest uppercase">
                        Payment Confirmed
                    </p>
                </div>

                <div className="border-t border-[#2a2b2e] pt-8">
                    {invoiceNumber && (
                        <p className="text-sm text-[#8b8b8b] mb-2">
                            Reference:{" "}
                            <span className="text-[#e8e8e8] font-medium">
                                {invoiceNumber}
                            </span>
                        </p>
                    )}
                    <p className="text-sm text-[#8b8b8b] leading-relaxed">
                        Your payment has been processed successfully.
                        <br />
                        A confirmation receipt has been sent to your email.
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#2a2b2e]">
                    <p className="text-xs text-[#5a5a5a]">
                        This tab can now be closed.
                    </p>
                </div>
            </div>
        </div>
    );
}
