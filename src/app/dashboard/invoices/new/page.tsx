"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const data = {
            clientName: form.get("clientName") as string,
            clientEmail: form.get("clientEmail") as string,
            clientAddress: form.get("clientAddress") as string,
            description: form.get("description") as string,
            amount: Math.round(parseFloat(form.get("amount") as string) * 100),
        };

        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            alert("Failed to create invoice");
            setLoading(false);
            return;
        }

        const invoice = await res.json();
        router.push(`/dashboard/invoices/${invoice.id}`);
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-heading text-foreground">
                    New Invoice
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Create a new invoice for a client
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-lg bg-background border border-border p-6 flex flex-col gap-6"
            >
                <div>
                    <label
                        htmlFor="clientName"
                        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                        Client Name
                    </label>
                    <input
                        id="clientName"
                        name="clientName"
                        type="text"
                        required
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors rounded-none outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="clientEmail"
                        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                        Client Email
                    </label>
                    <input
                        id="clientEmail"
                        name="clientEmail"
                        type="email"
                        required
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors rounded-none outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="clientAddress"
                        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                        Client Address
                    </label>
                    <textarea
                        id="clientAddress"
                        name="clientAddress"
                        rows={3}
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors rounded-none outline-none resize-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors rounded-none outline-none resize-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="amount"
                        className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
                    >
                        Amount (£)
                    </label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        placeholder="0.00"
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors rounded-none outline-none"
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-foreground text-background text-sm uppercase tracking-wider hover:opacity-90 transition-opacity rounded-none disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Invoice"}
                    </button>
                </div>
            </form>
        </>
    );
}
