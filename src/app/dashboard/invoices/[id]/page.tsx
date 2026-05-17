import { notFound } from "next/navigation";
import { prisma } from "@/lib/dashboard/prisma";
import { practice } from "@/lib/dashboard/practice";
import { SendInvoiceButton } from "./SendInvoiceButton";
import { PaymentStatusPoll } from "./PaymentStatusPoll";
import { MarkAsPaidButton } from "./MarkAsPaidButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const statusStyles: Record<string, string> = {
    draft: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    sent: "bg-blue-900/60 text-blue-200 border border-blue-700/50",
    paid: "bg-green-900/60 text-green-200 border border-green-700/50",
    cancelled: "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50",
};

export default async function InvoiceDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({ where: { id } });

    if (!invoice) notFound();

    const invoiceNumber = `INV-${String(invoice.number).padStart(3, "0")}`;
    const createdDate = invoice.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <>
            <Link
                href="/dashboard/invoices"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Invoices
            </Link>

            <div className="bg-card border border-border max-w-2xl">
                <div className="p-4 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-xl font-heading text-foreground">
                                {practice.name}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {practice.tagline}
                            </p>
                            <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                {practice.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                                <span className="block mt-1">
                                    {practice.email}
                                </span>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <h2 className="text-lg font-heading text-foreground">
                                {invoiceNumber}
                            </h2>
                            <span
                                className={`inline-block mt-2 px-2.5 py-1 text-xs uppercase tracking-wider border ${
                                    statusStyles[invoice.status] ?? ""
                                }`}
                            >
                                {invoice.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                Bill To
                            </span>
                            <div className="mt-2 text-sm text-foreground leading-relaxed">
                                <span className="block font-medium">
                                    {invoice.clientName}
                                </span>
                                {invoice.clientAddress &&
                                    invoice.clientAddress
                                        .split("\n")
                                        .map((line) => (
                                            <span key={line} className="block">
                                                {line}
                                            </span>
                                        ))}
                                <span className="block text-muted-foreground mt-1">
                                    {invoice.clientEmail}
                                </span>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <div className="text-sm">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                    Date
                                </span>
                                <p className="text-foreground mt-1">
                                    {createdDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                                        Description
                                    </th>
                                    <th className="text-right py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium w-32">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border">
                                    <td className="py-3 text-foreground">
                                        {invoice.description}
                                    </td>
                                    <td className="py-3 text-right text-foreground font-medium">
                                        £{(invoice.amount / 100).toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end mt-4">
                            <div className="w-48">
                                <div className="flex justify-between py-2 text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span className="text-foreground">
                                        £{(invoice.amount / 100).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-t border-border text-sm font-medium">
                                    <span className="text-foreground">
                                        Total
                                    </span>
                                    <span className="text-foreground text-base">
                                        £{(invoice.amount / 100).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                        {practice.name} — {practice.tagline}
                    </p>

                    {invoice.status === "draft" && (
                        <SendInvoiceButton invoiceId={invoice.id} />
                    )}

                    {invoice.status === "sent" && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            {invoice.stripePaymentLinkUrl && (
                                <a
                                    href={invoice.stripePaymentLinkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity text-center"
                                >
                                    View Payment Link
                                </a>
                            )}
                            <MarkAsPaidButton invoiceId={invoice.id} />
                            <PaymentStatusPoll invoiceId={invoice.id} />
                        </div>
                    )}

                    {invoice.status === "paid" && invoice.paidAt && (
                        <p className="text-sm text-green-400">
                            Paid on{" "}
                            {invoice.paidAt.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
