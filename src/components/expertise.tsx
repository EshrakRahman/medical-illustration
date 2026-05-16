"use client";

import { motion } from "motion/react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function Expertise() {
    return (
        <section className="w-full bg-[#EEE9E1] py-12">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        className="md:col-span-4"
                    >
                        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                            Expertise
                        </h2>
                        <p className="max-w-sm text-base leading-8 text-muted-foreground">
                            Providing meticulous visual translation of complex medical and
                            scientific data for specialized applications.
                        </p>
                    </motion.div>

                    {/* Services List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="md:col-span-8"
                    >
                        {[
                            "Medical Illustration",
                            "Surgical Illustration",
                            "Educational Anatomy Art",
                            "Scientific Publication Figures",
                        ].map((service, index) => (
                            <motion.div
                                key={service}
                                variants={itemVariants}
                                className={`
                                    group border-border py-8 transition-all duration-300
                                    hover:pl-3
                                    ${index === 0 ? "border-t" : ""}
                                    ${index === 3 ? "border-y" : "border-t"}
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-heading text-2xl md:text-3xl text-foreground transition-colors duration-300 group-hover:text-secondary">
                                        {service}
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-opacity duration-300 group-hover:opacity-100 opacity-60">
                                        0{index + 1}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
