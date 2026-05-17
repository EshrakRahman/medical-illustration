"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const email = form.get("email") as string;
        const password = form.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <div className="login min-h-dvh flex items-center justify-center bg-background">
            <div className="w-full max-w-sm mx-auto px-6">
                <h1 className="font-heading text-2xl text-foreground mb-2">
                    Anatomical Archive
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                    Dashboard authentication
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    {error && (
                        <div className="bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-transparent border border-border px-4 py-2.5 text-foreground text-sm focus:border-foreground transition-colors outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-foreground text-background text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}
