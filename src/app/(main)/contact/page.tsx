"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    projectType: string;
    message: string;
}

const initialForm: FormData = {
    name: "",
    email: "",
    projectType: "medical-illustration",
    message: "",
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

const inputClass =
    "w-full bg-transparent border-0 border-b border-border focus:border-foreground py-2 px-0 text-body-lg text-foreground transition-colors duration-300 rounded-none placeholder:text-muted-foreground/40";

export default function ContactPage() {
    const [form, setForm] = useState<FormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Failed to send");
            setSubmitted(true);
        } catch {
            alert("Failed to send message. Please try again.");
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto gap-6"
            >
                <h1 className="font-heading text-headline-md text-foreground">
                    Message Received
                </h1>
                <p className="text-body-lg text-muted-foreground">
                    Your inquiry has been logged and will be reviewed in the
                    order it was received. A confirmation will be sent to your
                    electronic mail.
                </p>
            </motion.div>
        );
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="w-full max-w-2xl text-center mb-16 mx-auto pt-24"
            >
                <h1 className="font-heading text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                    Inquiry
                </h1>
                <p className="text-body-lg text-muted-foreground">
                    For commissions, archival access, or methodological
                    inquiries, please submit the form below. Documentation
                    requests are reviewed sequentially.
                </p>
            </motion.div>

            <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl mx-auto"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-12"
                >
                    {/* Name / Institution */}
                    <motion.div variants={fieldVariants} className="relative">
                        <label
                            htmlFor="name"
                            className="block text-label-sm uppercase tracking-widest text-muted-foreground mb-4"
                        >
                            Name / Institution
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={inputClass}
                        />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={fieldVariants} className="relative">
                        <label
                            htmlFor="email"
                            className="block text-label-sm uppercase tracking-widest text-muted-foreground mb-4"
                        >
                            Electronic Mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="mail@example.com"
                            className={inputClass}
                        />
                    </motion.div>

                    {/* Nature of Inquiry */}
                    <motion.div variants={fieldVariants} className="relative">
                        <label
                            htmlFor="project_type"
                            className="block text-label-sm uppercase tracking-widest text-muted-foreground mb-4"
                        >
                            Nature of Inquiry
                        </label>
                        <div className="relative">
                            <select
                                id="project_type"
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="medical-illustration">
                                    Medical Illustration
                                </option>
                                <option value="surgical-illustration">
                                    Surgical Illustration
                                </option>
                                <option value="educational-content">
                                    Educational Content
                                </option>
                                <option value="publication-figure">
                                    Publication Figure
                                </option>
                                <option value="licensing">
                                    Licensing / Rights
                                </option>
                                <option value="general">General Inquiry</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fieldVariants} className="relative">
                        <label
                            htmlFor="message"
                            className="block text-label-sm uppercase tracking-widest text-muted-foreground mb-4"
                        >
                            Detailed Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Describe your commission or inquiry..."
                            className={`${inputClass} resize-none`}
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.div
                        variants={fieldVariants}
                        className="pt-8 flex justify-center md:justify-start"
                    >
                        <button
                            type="submit"
                            className="px-12 py-5 bg-secondary text-secondary-foreground text-label-sm uppercase tracking-widest hover:bg-secondary/80 transition-colors duration-300 rounded-none w-full md:w-auto"
                        >
                            Send Message
                        </button>
                    </motion.div>
                </form>
            </motion.div>
        </>
    );
}
