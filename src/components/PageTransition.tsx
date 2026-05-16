"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function PageTransition({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className="min-h-screen"
        >
      {children}
    </motion.div>
    );
}