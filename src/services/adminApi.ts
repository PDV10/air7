// Servicio para llamadas de admin (POST/PUT/DELETE)
// Conexión directa a Render con Authorization header

import type { Product, Category } from "../api/types";
import { buildUrl, getApiKey } from "../api/config";

// Headers de autorización para admin
const getAuthHeaders = (): HeadersInit => {
	const apiKey = getApiKey();
	return {
		Authorization: `Bearer ${apiKey}`,
	};
};

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
	// NO setear Content-Type para FormData - el browser agrega boundary automáticamente
	const response = await fetch(buildUrl("/products"), {
		method: "POST",
		headers: getAuthHeaders(),
		body: data,
	});
	return handleResponse<Product>(response);
};

export const updateProduct = async (
	id: number,
	data: ProductUpdateData,
): Promise<Product> => {
	const response = await fetch(buildUrl(`/products/${id}`), {
		method: "PUT",
		headers: {
			...getAuthHeaders(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return handleResponse<Product>(response);
};

export const updateProductWithImage = async (
	id: number,
	data: FormData,
): Promise<Product> => {
	// NO setear Content-Type para FormData
	const response = await fetch(buildUrl(`/products/${id}/image`), {
		method: "POST",
		headers: getAuthHeaders(),
		body: data,
	});
	return handleResponse<Product>(response);
};

export const deleteProduct = async (id: number): Promise<void> => {
	const response = await fetch(buildUrl(`/products/${id}`), {
		method: "DELETE",
		headers: getAuthHeaders(),
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
	const response = await fetch(buildUrl("/categories"), {
		method: "POST",
		headers: {
			...getAuthHeaders(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return handleResponse<Category>(response);
};

export const updateCategory = async (
	id: number,
	data: CategoryFormData,
): Promise<Category> => {
	const response = await fetch(buildUrl(`/categories/${id}`), {
		method: "PUT",
		headers: {
			...getAuthHeaders(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return handleResponse<Category>(response);
};

export const deleteCategory = async (id: number): Promise<void> => {
	const response = await fetch(buildUrl(`/categories/${id}`), {
		method: "DELETE",
		headers: getAuthHeaders(),
	});
	return handleResponse<void>(response);
};
