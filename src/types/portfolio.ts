export type PortfolioCategory =
    | "Anatomy"
    | "Surgical"
    | "Pathology"
    | "Education"
    | "Research";

export interface PortfolioItem {
    id: string;
    title: string;
    category: PortfolioCategory;
    subcategory: string;
    specimenId: string;
    imageSrc: string;
    description: string;
    alt: string;
}
