"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Eye, Landmark, BookOpen, Quote, Microscope } from "lucide-react";

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

const principles = [
    {
        title: "Clarity",
        description:
            "Reducing visual noise to highlight essential structures. By stripping away extraneous textures, the core anatomical narrative emerges with unassailable lucidity, guiding the viewer's eye directly to critical junctions and pathologies.",
        icon: Eye,
    },
    {
        title: "Accuracy",
        description:
            "Every representation is grounded in peer-reviewed data and direct cadaveric or radiological study. Fidelity to the physiological reality is paramount; there is no room for artistic license when interpreting structural data.",
        icon: Landmark,
    },
    {
        title: "Communication",
        description:
            "Translating density into understanding. The ultimate purpose of the archive is pedagogic. Through strategic layout and typographic hierarchy, complex biological relationships are made accessible to both practitioner and student.",
        icon: BookOpen,
    },
];

const testimonials = [
    {
        quote: "The level of anatomical precision in these illustrations is unparalleled. They have become an essential component of our surgical training modules.",
        author: "Dr. Julian Thorne",
        role: "Chief of Surgery",
    },
    {
        quote: "A rare bridge between rigid scientific data and elegant visual storytelling. Truly authoritative work.",
        author: "Prof. Elena Rossi",
        role: "Department of Biological Sciences",
    },
    {
        quote: "Exceptional clarity. These plates managed to elucidate complex pathologies that traditional imaging often obscures.",
        author: "Dr. Marcus Chen",
        role: "Medical Journal Editor",
    },
];

export default function About() {
    return (
        <>
            {/* Biography & Portrait */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start pt-24 pb-section-gap">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="col-span-1 md:col-span-6 flex flex-col gap-8"
                >
                    <div className="flex items-center gap-2 text-muted-foreground text-label-sm uppercase tracking-widest">
                        <span>Archive</span>
                        <span>/</span>
                        <span className="text-foreground">
                            Specimen 001: Biography
                        </span>
                    </div>

                    <h1 className="font-heading text-display-lg-mobile md:text-display-lg text-foreground">
                        Documentation
                        <br />
                        of the unseen.
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="flex flex-col gap-6 text-muted-foreground text-body-lg max-w-lg"
                    >
                        <p>
                            With over a decade of dedicated clinical observation
                            and rendering, my practice bridges the precise
                            rigidity of medical science and the nuanced
                            expression of fine art. I specialize in high-fidelity
                            anatomical documentation, providing authoritative
                            visual records for medical journals, institutional
                            archives, and educational monographs.
                        </p>
                        <p>
                            Every line drawn is an act of translation—converting
                            complex, microscopic realities into clear,
                            comprehensive diagrams. The goal is never merely to
                            illustrate, but to elucidate. Through rigorous
                            methodology and a deep reverence for biological
                            architecture, I construct visual artifacts that
                            stand up to the most exacting scientific scrutiny.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.25,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="col-span-1 md:col-span-5 md:col-start-8"
                >
                    <div className="border border-border p-4 bg-white relative group">
                        <div className="absolute top-2 right-2 px-2 py-1 bg-background text-label-sm uppercase tracking-widest text-foreground z-10 border border-border">
                            ID: PRT-01
                        </div>
                        <div className="relative w-full aspect-[3/4]">
                            <Image
                                src="/biotech.png"
                                alt="A black and white, highly detailed, high-contrast photographic portrait of a medical illustrator working in a brightly lit, minimalist studio."
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                            />
                        </div>
                        <div className="mt-4 text-caption text-muted-foreground flex justify-between items-center border-t border-border pt-2">
                            <span>Fig 1. Studio Observation</span>
                            <Microscope className="w-4 h-4" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Methodology & Principles */}
            <section className="flex flex-col gap-12 pb-section-gap">
                <motion.header
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="border-b border-border pb-6 mb-8 flex justify-between items-end"
                >
                    <h2 className="font-heading text-headline-md text-foreground">
                        Methodology &amp; Principles
                    </h2>
                    <span className="text-label-sm uppercase tracking-widest text-muted-foreground">
                        Ref: PHY-100
                    </span>
                </motion.header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {principles.map((p) => {
                        const Icon = p.icon;
                        return (
                            <motion.article
                                key={p.title}
                                variants={cardVariants}
                                className="bg-white border border-border p-8 flex flex-col gap-6 hover:bg-muted transition-colors duration-300"
                            >
                                <div className="w-12 h-12 flex items-center justify-center border border-foreground rounded-full text-foreground">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-[24px] text-foreground mb-4">
                                        {p.title}
                                    </h3>
                                    <p className="text-body-md text-muted-foreground">
                                        {p.description}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </section>

            {/* Clinical Reviews */}
            <section className="flex flex-col gap-12 pb-section-gap">
                <motion.header
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="border-b border-border pb-6 mb-8 flex justify-between items-end"
                >
                    <h2 className="font-heading text-headline-md text-foreground">
                        Clinical Reviews
                    </h2>
                    <span className="text-label-sm uppercase tracking-widest text-muted-foreground">
                        Ref: TEST-201
                    </span>
                </motion.header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((t) => (
                        <motion.article
                            key={t.author}
                            variants={cardVariants}
                            className="bg-white border border-border p-8 flex flex-col justify-between hover:bg-muted transition-colors duration-300"
                        >
                            <div className="flex flex-col gap-6">
                                <Quote className="w-6 h-6 text-muted-foreground" />
                                <p className="text-body-md text-muted-foreground italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>
                            <div className="mt-8">
                                <p className="text-label-sm text-foreground uppercase tracking-wider">
                                    {t.author}
                                </p>
                                <p className="text-caption text-muted-foreground">
                                    {t.role}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </section>
        </>
    );
}
