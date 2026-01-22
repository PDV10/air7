// Servicio para llamadas de admin (POST/PUT/DELETE)
// Las rutas pasan por el proxy (Vite en local, Vercel en prod) que añade la API key

import type { Product, Category } from "../api/types";

const handleResponse = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const message =
			errorData.error || errorData.message || `Error: ${response.status}`;
		throw new Error(
			typeof message === "string" ? message : JSON.stringify(message),
		);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json();
};

// ============ PRODUCTOS ============

export interface ProductUpdateData {
	name?: string;
	description?: string;
	price?: number;
	stock?: number;
	brand?: string;
	categoryId?: number | null;
	gender?: string;
	sizes?: string[];
	isOnSale?: boolean;
	salePrice?: number | null;
}

export const createProduct = async (data: FormData): Promise<Product> => {
	const response = await fetch("/api/products", {
		method: "POST",
		body: data,
	});
	return handleResponse<Product>(response);
};

export const updateProduct = async (
	id: number,
	data: ProductUpdateData,
): Promise<Product> => {
	const response = await fetch(`/api/products/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<Product>(response);
};

export const updateProductWithImage = async (
	id: number,
	data: FormData,
): Promise<Product> => {
	const response = await fetch(`/api/products/${id}/image`, {
		method: "POST",
		body: data,
	});
	return handleResponse<Product>(response);
};

export const deleteProduct = async (id: number): Promise<void> => {
	const response = await fetch(`/api/products/${id}`, {
		method: "DELETE",
	});
	return handleResponse<void>(response);
};

// ============ CATEGORÍAS ============

export interface CategoryFormData {
	name: string;
	description?: string;
}

export const createCategory = async (
	data: CategoryFormData,
): Promise<Category> => {
	const response = await fetch("/api/categories", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<Category>(response);
};

export const updateCategory = async (
	id: number,
	data: CategoryFormData,
): Promise<Category> => {
	const response = await fetch(`/api/categories/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<Category>(response);
};

export const deleteCategory = async (id: number): Promise<void> => {
	const response = await fetch(`/api/categories/${id}`, {
		method: "DELETE",
	});
	return handleResponse<void>(response);
};
