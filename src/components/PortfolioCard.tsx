import Image from "next/image";

interface PortfolioCardProps {
    imageSrc: string;
    title: string;
    subcategory: string;
    specimenId: string;
    alt: string;
}

export default function PortfolioCard({
    imageSrc,
    title,
    subcategory,
    specimenId,
    alt,
}: PortfolioCardProps) {
    return (
        <article className="plate-container group flex flex-col gap-4">
            <div className="relative border border-border bg-background p-2 overflow-hidden transition-all duration-500 ease-out hover:border-border/70 hover:shadow-sm">
                <div className="absolute top-4 right-4 z-10 bg-background/90 px-3 py-1 border border-border text-xs uppercase tracking-[0.08em] text-foreground/80 backdrop-blur-md font-medium">
                    {specimenId}
                </div>
                <div className="relative w-full aspect-[4/5] bg-background">
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="plate-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                </div>
            </div>
            <div className="flex flex-col pt-2 border-t border-border/30">
                <span className="text-caption text-muted-foreground uppercase tracking-wide mb-1">
                    {subcategory}
                </span>
                <h2 className="font-heading text-[24px] leading-tight text-foreground">
                    {title}
                </h2>
            </div>
        </article>
    );
}
