import { auth } from "@/lib/dashboard/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) redirect("/login");

    return (
        <div className="dashboard min-h-screen flex bg-background">
            <DashboardSidebar />

            <main className="flex-1 overflow-auto pt-16 md:pt-0">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">{children}</div>
            </main>
        </div>
    );
}
