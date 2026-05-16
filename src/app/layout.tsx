import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import "./globals.css";




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
      <body className="min-h-full flex bg-background text-foreground flex-col">
      {children}
      </body>
    </html>
  );
}
