"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/inquiries", label: "Inquiries", icon: MessageSquare },
];

export function DashboardSidebar() {
    const [open, setOpen] = useState(false);

    const sidebar = (
        <aside
            className={`w-60 bg-background border-r border-border flex flex-col shrink-0 h-full ${
                open ? "" : "hidden"
            } md:flex`}
        >
            <div className="px-6 py-6 border-b border-border">
                <Link
                    href="/dashboard"
                    className="font-heading text-lg text-foreground"
                >
                    Anatomical Archive
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Dashboard
                </p>
            </div>

            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-none"
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-3 py-4 border-t border-border">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full rounded-none"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign out
                </button>
            </div>
        </aside>
    );

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background border border-border"
                aria-label="Toggle sidebar"
            >
                {open ? (
                    <X className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="fixed md:static inset-y-0 left-0 z-40 md:z-auto md:block">
                {sidebar}
            </div>
        </>
    );
}
