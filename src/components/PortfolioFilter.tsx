"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import type { PortfolioCategory } from "@/types/portfolio";

const ALL_LABEL = "All Records" as const;

const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
    Anatomy: "Anatomy",
    Surgical: "Surgical",
    Pathology: "Pathology",
    Education: "Education",
    Research: "Research",
};

interface PortfolioFilterProps {
    active: PortfolioCategory | typeof ALL_LABEL;
    categories: PortfolioCategory[];
    onChange: (category: PortfolioCategory | typeof ALL_LABEL) => void;
}

export default function PortfolioFilter({
    active,
    categories,
    onChange,
}: PortfolioFilterProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        const activeEl = containerRef.current.querySelector(
            `[data-value="${active}"]`
        ) as HTMLElement | null;
        if (!activeEl) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setIndicator({
            left: elRect.left - containerRect.left,
            width: elRect.width,
        });
    }, [active]);

    const allLabels = [ALL_LABEL, ...categories] as const;

    return (
        <div className="flex flex-col gap-6">
            {/* label */}
            <span className="text-caption text-muted-foreground/50 uppercase tracking-[0.15em]">
                Filter by category
            </span>

            {/* buttons + sliding indicator */}
            <div
                ref={containerRef}
                className="relative inline-flex flex-wrap gap-x-8 gap-y-3"
            >
                {/* sliding underline */}
                <motion.div
                    className="absolute bottom-0 h-px bg-foreground pointer-events-none"
                    animate={{
                        left: indicator.left,
                        width: indicator.width,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                />

                {allLabels.map((label) => {
                    const isActive = active === label;
                    return (
                        <button
                            key={label}
                            data-value={label}
                            onClick={() => onChange(label)}
                            className={`relative pb-1 text-label-sm uppercase tracking-widest transition-all duration-500 ease-out ${
                                isActive
                                    ? "text-foreground opacity-100"
                                    : "text-muted-foreground opacity-40 hover:opacity-70"
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
