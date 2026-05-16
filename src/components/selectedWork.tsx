"use client";

import { motion } from "motion/react";
import ImageCard from "@/components/imageCard";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

const SELECTED_WORKS = [
    { id: 1, src: "/Orthopedic_Mechanics_s.png", fig: "Fig. 1 — Orthopedic Mechanics" },
    { id: 2, src: "/Thoracic_Cavity_s.png", fig: "Fig. 2 — Thoracic Cavity" },
    { id: 3, src: "/Muscular_System_s.png", fig: "Fig. 3 — Muscular System" },
];

export default function SelectedWork() {
    return (
        <section className="selected-work flex flex-col items-center gap-4 py-12 md:py-16 lg:py-24">
            <div className="border-b hidden md:block border-border w-full mt-5 mb-10"></div>

            <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[12px] font-medium opacity-80 self-start pb-4"
            >
                ARCHIVE / SELECTED WORKS
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="headings text-center"
            >
                <h2 className="text-3xl leading-10 font-normal py-2">Clinical Documentation</h2>
                <p className="text-base opacity-80 leading-6">Curated specimens from the active archive.</p>
            </motion.div>

            <div className="border-b md:hidden border-border w-full mt-5 mb-10"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 w-full md:grid-cols-3 md:py-8 gap-6 md:gap-8 items-stretch"
            >
                {SELECTED_WORKS.map((work) => (
                    <motion.div key={work.id} variants={cardVariants}>
                        <ImageCard
                            imageSrc={work.src}
                            caption={work.fig}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
