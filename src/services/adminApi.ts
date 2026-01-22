// Servicio para llamadas de admin (POST/PUT/DELETE)
// Las rutas pasan por el proxy de Vite que añade la API key

import type { Product, Category } from "../api/types";

const ADMIN_API_BASE = "/api/admin";

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

// POST genérico
const adminPost = async <T>(endpoint: string, data: unknown): Promise<T> => {
	const isFormData = data instanceof FormData;
	const response = await fetch(`${ADMIN_API_BASE}${endpoint}`, {
		method: "POST",
		headers: isFormData ? {} : { "Content-Type": "application/json" },
		body: isFormData ? data : JSON.stringify(data),
	});
	return handleResponse<T>(response);
};

// PUT genérico
const adminPut = async <T>(endpoint: string, data: unknown): Promise<T> => {
	const response = await fetch(`${ADMIN_API_BASE}${endpoint}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return handleResponse<T>(response);
};

// DELETE genérico
const adminDelete = async <T>(endpoint: string): Promise<T> => {
	const response = await fetch(`${ADMIN_API_BASE}${endpoint}`, {
		method: "DELETE",
	});
	return handleResponse<T>(response);
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

export const createProduct = (data: FormData) =>
	adminPost<Product>("/products", data);

export const updateProduct = (id: number, data: ProductUpdateData) =>
	adminPut<Product>(`/products/${id}`, data);

export const updateProductWithImage = (id: number, data: FormData) =>
	adminPost<Product>(`/products/${id}/image`, data);

export const deleteProduct = (id: number) =>
	adminDelete<void>(`/products/${id}`);

// ============ CATEGORÍAS ============

export interface CategoryFormData {
	name: string;
	description?: string;
}

export const createCategory = (data: CategoryFormData) =>
	adminPost<Category>("/categories", data);

export const updateCategory = (id: number, data: CategoryFormData) =>
	adminPut<Category>(`/categories/${id}`, data);

export const deleteCategory = (id: number) =>
	adminDelete<void>(`/categories/${id}`);
