import type { PortfolioItem } from "@/types/portfolio";

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    return [
        {
            id: "sp-104a",
            title: "Osteological Topography",
            category: "Anatomy",
            subcategory: "Anatomy / Cranial",
            specimenId: "SP-104A",
            imageSrc: "/Osteological_Topography.png",
            description:
                "A rigorous anterior view focusing on the structural integrity and textural variations of the cranial vault and facial skeleton. The illustration isolates specific bony landmarks, eliminating connective tissue to emphasize pure form. This plate serves as a primary reference point within the archive, demonstrating the standard for stippled shading techniques used throughout the collection to document depth without compromising clinical accuracy.",
            alt: "A highly detailed, minimalist medical illustration of the human skull rendered in monochrome with subtle stippling. The artwork sits perfectly centered on a vast, pristine white background, evoking the sterile, quiet atmosphere of a high-end medical museum.",
        },
        {
            id: "sp-211b",
            title: "Membrane Architecture",
            category: "Research",
            subcategory: "Research / Cellular",
            specimenId: "SP-211B",
            imageSrc: "/Membrane_Architecture.png",
            description:
                "An abstract, microscopic view of cellular structures, rendered with precision akin to a vintage architectural blueprint but using soft charcoal and beige tones. The intricate linework represents complex biological membranes, floating in an expansive field of warm ivory negative space. The mood is serene and contemplative, focusing on the hidden geometry of life.",
            alt: "An abstract, microscopic view of cellular structures, rendered with precision akin to a vintage architectural blueprint but using soft charcoal and beige tones.",
        },
        {
            id: "sp-309c",
            title: "Branching Networks",
            category: "Surgical",
            subcategory: "Surgical / Vascular",
            specimenId: "SP-309C",
            imageSrc: "/Branching_Networks.png",
            description:
                "A striking botanical-medical cross-section of a vascular system, drawn with ultra-fine lines and minimalist shading on a textured off-white canvas. The delicate branching structures are meticulously labeled with unreadable, tiny serif typography, enhancing the vintage archival feel.",
            alt: "A striking botanical-medical cross-section of a vascular system, drawn with ultra-fine lines and minimalist shading on a textured off-white canvas.",
        },
        {
            id: "sp-412d",
            title: "Ocular Geometry",
            category: "Education",
            subcategory: "Education / Optical",
            specimenId: "SP-412D",
            imageSrc: "/Ocular_Geometry.png",
            description:
                "A rigorous, geometric deconstruction of the human eye, presented as a series of overlapping circular diagrams and precise linear annotations. The color palette is strictly limited to deep sepia, soft grey, and stark white. The composition uses massive amounts of empty space around the central figure, enforcing a sense of isolation and clinical focus.",
            alt: "A rigorous, geometric deconstruction of the human eye, presented as a series of overlapping circular diagrams and precise linear annotations.",
        },
        {
            id: "sp-055e",
            title: "Striated Fibers",
            category: "Anatomy",
            subcategory: "Anatomy / Muscular",
            specimenId: "SP-055E",
            imageSrc: "/Striated_Fibers.png",
            description:
                "A highly textured, almost sculptural rendering of muscle fibers, depicted through dense, parallel hatching lines in a deep charcoal ink. The artwork is framed by a thin, razor-sharp borderline against a pale ivory background. The lighting creates a subtle gradient across the fibers, suggesting volume without relying on heavy, dark shadows.",
            alt: "A highly textured, almost sculptural rendering of muscle fibers, depicted through dense, parallel hatching lines in a deep charcoal ink.",
        },
        {
            id: "sp-788f",
            title: "Synaptic Mapping",
            category: "Pathology",
            subcategory: "Pathology / Neural",
            specimenId: "SP-788F",
            imageSrc: "/Synaptic_Mapping.png",
            description:
                "A minimalist, monochromatic depiction of a neural network, resembling delicate frost patterns or a complex river delta viewed from above. The lines are incredibly fine, expanding across a vast, unblemished white canvas. There is no shading, only the varying density of the line work to create depth.",
            alt: "A minimalist, monochromatic depiction of a neural network, resembling delicate frost patterns or a complex river delta viewed from above.",
        },
    ];
}
