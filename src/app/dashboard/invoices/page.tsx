import Link from "next/link";
import { prisma } from "@/lib/dashboard/prisma";
import { Plus } from "lucide-react";

const statusStyles: Record<string, string> = {
    draft: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    sent: "bg-blue-900/60 text-blue-200 border border-blue-700/50",
    paid: "bg-green-900/60 text-green-200 border border-green-700/50",
    cancelled: "bg-zinc-800/50 text-zinc-500 border border-zinc-700/50",
};

export default async function InvoicesPage() {
    const invoices = await prisma.invoice.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-heading text-foreground">
                        Invoices
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {invoices.length} total
                    </p>
                </div>
                <Link
                    href="/dashboard/invoices/new"
                    className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity rounded-none"
                >
                    <Plus className="w-4 h-4" />
                    New Invoice
                </Link>
            </div>

            {invoices.length === 0 ? (
                <div className="bg-background border border-border p-12 text-center">
                    <p className="text-muted-foreground text-sm">
                        No invoices yet.
                    </p>
                    <Link
                        href="/dashboard/invoices/new"
                        className="text-sm text-foreground underline mt-2 inline-block"
                    >
                        Create your first invoice
                    </Link>
                </div>
            ) : (
                <div className="bg-background border border-border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    #
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Client
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr
                                    key={inv.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-5 py-3">
                                        <Link
                                            href={`/dashboard/invoices/${inv.id}`}
                                            className="text-foreground font-medium"
                                        >
                                            INV-{String(inv.number).padStart(3, "0")}
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">
                                        {inv.clientName}
                                    </td>
                                    <td className="px-5 py-3 text-foreground">
                                        £{(inv.amount / 100).toFixed(2)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider border ${
                                                statusStyles[inv.status] ?? ""
                                            }`}
                                        >
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">
                                        {inv.createdAt.toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
