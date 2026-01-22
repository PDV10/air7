// Tipos que coinciden con el schema de Prisma de la API

export interface Category {
	id: number;
	name: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface Product {
	id: number;
	name: string;
	description: string | null;
	price: string;
	stock: number;
	imageUrl: string | null;
	imagePublicId: string | null;
	brand: string | null;
	categoryId: number | null;
	gender: string | null;
	sizes: string[];
	createdAt: string;
	updatedAt: string;
	category: Category | null;
}

// Tipos para crear/actualizar productos
export interface CreateProductInput {
	name: string;
	description?: string;
	price: number;
	stock?: number;
	brand?: string;
	categoryId?: number;
	gender?: string;
	sizes?: string[];
}

export interface UpdateProductInput {
	name?: string;
	description?: string;
	price?: number;
	stock?: number;
	brand?: string;
	categoryId?: number;
	gender?: string;
	sizes?: string[];
}

// Tipos para crear/actualizar categorías
export interface CreateCategoryInput {
	name: string;
	description?: string;
}

export interface UpdateCategoryInput {
	name?: string;
	description?: string;
}
