"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function PaymentStatusPoll({
    invoiceId,
}: {
    invoiceId: string;
}) {
    const router = useRouter();
    const [polling, setPolling] = useState(true);
    const TIMEOUT = 30000;
    const INTERVAL = 3000;

    useEffect(() => {
        if (!polling) return;

        const timeout = setTimeout(() => {
            setPolling(false);
        }, TIMEOUT);

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/invoices/${invoiceId}`);
                const data = await res.json();
                if (data.status === "paid") {
                    setPolling(false);
                    router.refresh();
                }
            } catch {
                // silently retry
            }
        }, INTERVAL);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [invoiceId, polling, router]);

    if (!polling) {
        return (
            <button
                onClick={() => router.refresh()}
                className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
                Refresh status
            </button>
        );
    }

    return (
        <p className="text-xs text-muted-foreground animate-pulse">
            Waiting for payment confirmation...
        </p>
    );
}
