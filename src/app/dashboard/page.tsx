import { prisma } from "@/lib/dashboard/prisma";
import { FileText, MessageSquare, DollarSign, Send } from "lucide-react";
import Link from "next/link";

async function getStats() {
    const [totalInvoices, paidInvoices, sentInvoices, totalInquiries] =
        await Promise.all([
            prisma.invoice.count(),
            prisma.invoice.count({ where: { status: "paid" } }),
            prisma.invoice.count({ where: { status: "sent" } }),
            prisma.inquiry.count({ where: { status: "new" } }),
        ]);

    const revenue = await prisma.invoice.aggregate({
        _sum: { amount: true },
        where: { status: "paid" },
    });

    return {
        totalInvoices,
        paidInvoices,
        sentInvoices,
        totalInquiries,
        revenue: revenue._sum.amount ?? 0,
    };
}

export default async function DashboardPage() {
    const stats = await getStats();

    const cards = [
        {
            label: "Total Invoices",
            value: stats.totalInvoices,
            icon: FileText,
            href: "/dashboard/invoices",
        },
        {
            label: "Sent (awaiting payment)",
            value: stats.sentInvoices,
            icon: Send,
            href: "/dashboard/invoices",
        },
        {
            label: "Paid",
            value: stats.paidInvoices,
            icon: DollarSign,
            href: "/dashboard/invoices",
        },
        {
            label: "New Inquiries",
            value: stats.totalInquiries,
            icon: MessageSquare,
            href: "/dashboard/inquiries",
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-heading text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Overview of your practice
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {cards.map((c) => {
                    const Icon = c.icon;
                    return (
                        <Link
                            key={c.label}
                            href={c.href}
                            className="bg-background border border-border p-5 hover:border-foreground/30 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-2xl font-semibold text-foreground">
                                {c.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {c.label}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-background border border-border p-5">
                <h2 className="text-sm font-medium text-foreground mb-1">
                    Revenue
                </h2>
                <p className="text-2xl font-semibold text-foreground">
                    £{(stats.revenue / 100).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    Total from paid invoices
                </p>
            </div>
        </>
    );
}
