"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioFilter from "@/components/PortfolioFilter";
import { getPortfolioItems } from "@/data/portfolio";
import type { PortfolioItem, PortfolioCategory } from "@/types/portfolio";

const categories: PortfolioCategory[] = [
    "Anatomy",
    "Surgical",
    "Pathology",
    "Education",
    "Research",
];

export default function Portfolio() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [activeFilter, setActiveFilter] = useState<
        PortfolioCategory | "All Records"
    >("All Records");

    useEffect(() => {
        getPortfolioItems().then(setItems);
    }, []);

    const filtered =
        activeFilter === "All Records"
            ? items
            : items.filter((item) => item.category === activeFilter);

    return (
        <>
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="pt-24 pb-20"
            >
                <div className="max-w-2xl">
                    <h1 className="font-heading text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                        Archive Collection
                    </h1>
                    <p className="text-body-lg text-muted-foreground max-w-xl">
                        A curated selection of clinical illustrations and
                        architectural diagrams documenting complex anatomical
                        structures. Presented as specimens for detailed
                        observation.
                    </p>
                </div>
            </motion.header>

            {/* Filter */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="border-t border-border pt-8 pb-16"
            >
                <PortfolioFilter
                    active={activeFilter}
                    categories={categories}
                    onChange={setActiveFilter}
                />
            </motion.div>

            {/* Result counter */}
            <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="pb-4"
            >
                <AnimatePresence mode="wait">
                    {activeFilter !== "All Records" && (
                        <motion.p
                            key="counter"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                            className="text-caption text-muted-foreground"
                        >
                            Showing {filtered.length} of {items.length}{" "}
                            specimens
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Gallery Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.25,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="py-section-gap"
                >
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter"
                        style={{ rowGap: "6rem" }}
                    >
                        {filtered.map((work, index) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.35,
                                    delay: 0.05 + index * 0.03,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                            >
                                <PortfolioCard
                                    imageSrc={work.imageSrc}
                                    title={work.title}
                                    subcategory={work.subcategory}
                                    specimenId={work.specimenId}
                                    alt={work.alt}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Static Lightbox (hidden) */}
            <div
                className="fixed inset-0 z-50 hidden items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12"
            >
                <div className="bg-background border border-border w-full max-w-7xl max-h-[921px] flex flex-col lg:flex-row overflow-hidden shadow-2xl shadow-primary/5">
                    <div className="w-full lg:w-2/3 bg-card p-4 md:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
                        <div className="max-w-full max-h-[614px] lg:max-h-[819px] aspect-[4/3] border border-border/50 bg-muted flex items-center justify-center text-muted-foreground text-caption">
                            Image preview
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 p-8 md:p-12 flex flex-col bg-background relative overflow-y-auto">
                        <div className="mt-8 mb-4 border-b border-foreground w-12" />
                        <span className="text-caption text-muted-foreground uppercase tracking-widest mb-4 block">
                            Archive / Anatomy / Cranial
                        </span>
                        <h2 className="font-heading text-[40px] leading-tight text-foreground mb-6">
                            Osteological Topography
                        </h2>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="border border-border px-3 py-1 text-label-sm uppercase tracking-widest text-foreground">
                                Specimen ID: SP-104A
                            </div>
                        </div>
                        <div className="text-body-md text-muted-foreground space-y-6">
                            <p>
                                A rigorous anterior view focusing on the
                                structural integrity and textural variations of
                                the cranial vault and facial skeleton.
                            </p>
                        </div>
                        <div className="mt-auto pt-12">
                            <button className="text-label-sm uppercase tracking-widest text-foreground border border-border px-8 py-4 hover:bg-muted transition-colors w-full text-center">
                                Request Image Licensing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
