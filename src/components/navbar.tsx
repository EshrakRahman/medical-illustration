"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {Menu, X} from "lucide-react";

export default function TopNavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="w-full top-0 bg-background relative z-50 border-b border-border">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-8 bg-transparent">

        {/* Brand Logo */}
          <Link
              href="/"
              className="font-heading text-2xl md:text-3xl tracking-tight text-foreground hover:text-muted-foreground transition-colors duration-300"
          >
          Anatomical Archive
        </Link>

          {/* Mobile Menu Icon */}
          <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground cursor-pointer transition-all duration-300"
              aria-label="Toggle mobile menu"
          >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </span>
        </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
          <Link
              href="/portfolio"
              className={`pb-1 uppercase tracking-widest font-sans text-sm transition-colors duration-300 border-b
              ${pathname === '/portfolio'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
          >
            Portfolio
          </Link>
          <Link
              href="/about"
              className={`pb-1 uppercase tracking-widest font-sans text-sm transition-colors duration-300 border-b
              ${pathname === '/about'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
          >
            About
          </Link>
          <Link
              href="/contact"
              className={`pb-1 uppercase tracking-widest font-sans text-sm transition-colors duration-300 border-b
              ${pathname === '/contact'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
          >
            Contact
          </Link>
        </nav>
      </div>

            {/* Mobile Navigation Dropdown */}
            <nav
                className={`absolute top-full left-0 w-full md:hidden flex flex-col items-center gap-6 px-6 py-8 bg-background border-b border-border z-40 transition-all duration-300 ease-in-out origin-top 
          ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
        <Link
            href="/portfolio"
            className={`pb-1 uppercase tracking-widest font-sans text-sm transition-all duration-500 ease-out delay-75 border-b
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
            ${pathname === '/portfolio'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
        >
          Portfolio
        </Link>
        <Link
            href="/about"
            className={`pb-1 uppercase tracking-widest font-sans text-sm transition-all duration-500 ease-out delay-150 border-b
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
            ${pathname === '/about'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link
            href="/contact"
            className={`pb-1 uppercase tracking-widest font-sans text-sm transition-all duration-500 ease-out delay-200 border-b
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
            ${pathname === '/contact'
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </header>
    );
}