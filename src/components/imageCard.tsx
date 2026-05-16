import Image from "next/image";

interface ImageCardProps {
    imageSrc: string;
    caption: string;
}

export default function ImageCard({ imageSrc, caption }: ImageCardProps) {
    return (
        <div className="img bg-white md:p-4 min-h-110 p-4 max-w-full md:h-auto md:aspect-square flex flex-col border border-border/40 overflow-hidden transition-all duration-500 ease-out hover:border-border/70 hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-sm">
            <div className="relative w-full flex-1">
                <Image
                    src={imageSrc}
                    alt={caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                    className="object-cover"
                />
            </div>

            <p className="text-sm text-primary pt-3 md:px-0 md:pb-0 font-normal opacity-70 shrink-0">
                {caption}
            </p>
        </div>
    );
}
