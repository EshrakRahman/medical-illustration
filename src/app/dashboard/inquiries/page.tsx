import { prisma } from "@/lib/dashboard/prisma";

const statusStyles: Record<string, string> = {
    new: "bg-blue-900/60 text-blue-200 border border-blue-700/50",
    read: "bg-muted text-muted-foreground",
    replied: "bg-green-900/60 text-green-200 border border-green-700/50",
};

export default async function InquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-heading text-foreground">
                    Inquiries
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {inquiries.length} total
                    {inquiries.filter((i) => i.status === "new").length > 0 &&
                        ` — ${inquiries.filter((i) => i.status === "new").length} new`}
                </p>
            </div>

            {inquiries.length === 0 ? (
                <div className="bg-background border border-border p-12 text-center">
                    <p className="text-muted-foreground text-sm">
                        No inquiries yet.
                    </p>
                </div>
            ) : (
                <div className="bg-background border border-border overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                    Type
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
                            {inquiries.map((inq) => (
                                <tr
                                    key={inq.id}
                                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-5 py-3 text-foreground font-medium">
                                        {inq.name}
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">
                                        {inq.email}
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground capitalize">
                                        {inq.projectType.replace(/-/g, " ")}
                                    </td>
                                    <td className="px-5 py-3">
                                        <span
                                            className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider border ${
                                                statusStyles[inq.status] ?? ""
                                            }`}
                                        >
                                            {inq.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">
                                        {inq.createdAt.toLocaleDateString(
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
