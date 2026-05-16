import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="header flex flex-col md:flex-row gap-6 md:gap-12 min-[1300px]:gap-20 items-stretch md:items-center">
            <div className="img bg-white p-4 h-100 md:h-112.5 md:w-1/2 min-[1300px]:w-[55%] min-[1300px]:h-auto min-[1300px]:aspect-square flex flex-col md:order-2">
               <div className="relative w-full flex-1">
                    <Image
                        src="/Featuredanatomicalartwork_header.png"
                        alt="Anatomical Artwork"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 55vw"
                        priority={true}
                        className="object-cover"
                    />
               </div>

               <p className="text-sm text-primary pt-2 font-normal opacity-70 shrink-0">
                    Fig. 1 — Cranial Structure
               </p>
           </div>

            {/* Content Column */}
            <div className="content md:w-1/2 min-[1300px]:w-[45%] flex flex-col justify-center py-4">
                <div className="title">
                    <h1 className="text-[40px] md:text-[44px] min-[1300px]:text-[56px] font-regular md:font-bold tracking-tight pb-4 leading-tight">
                        Freelance Medical & Anatomical Illustrator
                    </h1>
                    <p className="text-base font-normal leading-relaxed opacity-80 min-[1300px]:text-lg">
                        Providing high-fidelity clinical documentation
                        and meticulous anatomical visualisations for
                        medical journals, educational institutions, and
                        editorial publications. Specialising in fine-line
                        ink and digital hybrid techniques.
                    </p>
                </div>

                <div className="cta pt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/portfolio" className="w-full sm:w-auto sm:flex-1">
                        <Button variant="default" className="py-6 w-full rounded-none bg-accent uppercase text-sm hover:bg-accent/90 hover:cursor-pointer transition-colors">
                            View portfolio
                        </Button>
                    </Link>

                    <Link href="/contact" className="w-full sm:w-auto sm:flex-1">
                        <Button
                            variant="outline"
                            className="py-6 w-full rounded-none border-accent text-accent uppercase text-sm hover:bg-accent/10 hover:cursor-pointer transition-colors"
                        >
                            Contact me
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}