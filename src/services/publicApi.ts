// Servicio para llamadas públicas (GET)
// Conexión directa a Render - sin proxy

import type { Product, Category } from "../api/types";
import { buildUrl } from "../api/config";

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

export const apiGet = async <T>(endpoint: string): Promise<T> => {
	const response = await fetch(buildUrl(endpoint), {
		method: "GET",
	});
	return handleResponse<T>(response);
};

// Funciones públicas para productos (solo lectura)
export const fetchProducts = () => apiGet<Product[]>("/products");
export const fetchProduct = (id: number) => apiGet<Product>(`/products/${id}`);

// Funciones públicas para categorías (solo lectura)
export const fetchCategories = () => apiGet<Category[]>("/categories");
export const fetchCategory = (id: number) =>
	apiGet<Category>(`/categories/${id}`);
