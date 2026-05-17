"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarkAsPaidButton({
    invoiceId,
}: {
    invoiceId: string;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleMarkPaid() {
        if (!confirm("Mark this invoice as paid? The payment link will be deactivated.")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/invoices/${invoiceId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "paid",
                    paidAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.error || "Failed to update");
                return;
            }

            router.refresh();
        } catch {
            alert("Failed to mark as paid");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleMarkPaid}
            disabled={loading}
            className="px-4 py-2 border border-green-700/50 text-green-300 text-sm hover:bg-green-900/30 transition-colors disabled:opacity-50"
        >
            {loading ? "Updating..." : "Mark as Paid"}
        </button>
    );
}
