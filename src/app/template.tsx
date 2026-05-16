"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100vw", opacity: 0 }}
            transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}