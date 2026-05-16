import Link from "next/link";
import { Contact } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 md:px-12">

        {/* Top Row */}
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

          {/* Brand */}
              <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Anatomical Archive
            </p>

            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Scientific and anatomical illustration for research,
              publication, and medical education.
            </p>
          </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
            {[
                {
                    label: "Portfolio",
                    href: "/portfolio",
                },
                {
                    label: "Contact",
                    href: "/contact",
                },
            ].map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="
                  group relative w-fit text-sm uppercase tracking-[0.2em]
                  text-foreground transition-colors duration-300
                  hover:text-secondary
                "
                >
                {item.label}

                    {/* underline animation */}
                    <span
                        className="
                    absolute -bottom-1 left-0 h-px w-0 bg-secondary
                    transition-all duration-300 group-hover:w-full
                  "
                    />
              </Link>
            ))}

                  {/* LinkedIn */}
                  <Link
                      href="https://linkedin.com"
                      target="_blank"
                      className="
                group flex items-center gap-2 text-sm uppercase
                tracking-[0.2em] text-foreground transition-colors
                duration-300 hover:text-secondary
              "
                  >
              <Contact
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-px"
              />

              <span className="relative">
                LinkedIn

                <span
                    className="
                    absolute -bottom-1 left-0 h-px w-0 bg-secondary
                    transition-all duration-300 group-hover:w-full
                  "
                />
              </span>
            </Link>
          </nav>
        </div>

          {/* Bottom Row */}
          <div className="flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            © {currentYear} Anatomical Archive
          </p>

          <p className="text-xs tracking-[0.12em] text-muted-foreground">
            Clinical Documentation of High Value.
          </p>
        </div>
      </div>
    </footer>
    );
}