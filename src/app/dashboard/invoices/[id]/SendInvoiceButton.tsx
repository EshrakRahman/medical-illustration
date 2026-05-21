"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SendInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  async function handleSend() {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/send`, {
        method: "POST",
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to send");
        return;
      }

      setSent(true);
      router.refresh();
    } catch {
      alert("Failed to send invoice");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return <p className="text-sm text-green-400">Invoice sent successfully.</p>;
  }

  return (
    <button
      onClick={handleSend}
      disabled={loading}
      className="px-4 py-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity rounded-none disabled:opacity-50"
    >
      {loading ? "Sending..." : "Send Invoice"}
    </button>
  );
}

// need to change the layout
