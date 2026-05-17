import Link from "next/link";
import { auth, signOut } from "@/lib/dashboard/auth";
import { redirect } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    LogOut,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/inquiries", label: "Inquiries", icon: MessageSquare },
];

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="dashboard min-h-screen flex bg-background">
            {/* Sidebar */}
            <aside className="w-60 bg-background border-r border-border flex flex-col shrink-0">
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
                                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-none"
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-3 py-4 border-t border-border">
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full rounded-none"
                        >
                            <LogOut className="w-4 h-4 shrink-0" />
                            Sign out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
            </main>
        </div>
    );
}
