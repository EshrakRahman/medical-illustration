import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import "./globals.css";
import TopNavBar from "@/components/navbar";




export const metadata: Metadata = {
    title: "Medical Illustration Portfolio",
    description: "Freelance medical and anatomical illustration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <TopNavBar/>
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:px-12 md:py-16 lg:px-16 lg:py-24">
                {children}
      </main>
      </body>
    </html>
  );
}
