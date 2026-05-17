import TopNavBar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import { AnimatePresence } from "motion/react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <TopNavBar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-16 lg:px-16 lg:py-24 overflow-x-hidden">
                <AnimatePresence mode="wait">{children}</AnimatePresence>
            </main>
            <Footer />
        </>
    );
}
