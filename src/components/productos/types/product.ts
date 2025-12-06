export type ProductCategory = "ofertas" | "deporte" | "moda";

export type Product = {
	id: string;
	name: string;
	price: number;
	category: ProductCategory;
	brand: string;
	sizes: string[];
	recommendedFor: string;
	imageUrl: string;
};
