import { buildUrl, defaultHeaders } from "./config";
import type { Category, Product } from "./types";

// GET /api/categories - Obtener todas las categorías
export const getCategories = async (): Promise<Category[]> => {
	const response = await fetch(buildUrl("/categories"), {
		method: "GET",
		headers: defaultHeaders,
	});

	if (!response.ok) {
		throw new Error("Error al obtener las categorías");
	}

	return response.json();
};

// GET /api/categories/:id - Obtener una categoría por ID
export const getCategoryById = async (id: number): Promise<Category> => {
	const response = await fetch(buildUrl(`/categories/${id}`), {
		method: "GET",
		headers: defaultHeaders,
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error("Categoría no encontrada");
		}
		throw new Error("Error al obtener la categoría");
	}

	return response.json();
};

// GET /api/categories/:id/products - Obtener productos de una categoría
export const getProductsByCategory = async (id: number): Promise<Product[]> => {
	const response = await fetch(buildUrl(`/categories/${id}/products`), {
		method: "GET",
		headers: defaultHeaders,
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error("Categoría no encontrada");
		}
		throw new Error("Error al obtener los productos de la categoría");
	}

	return response.json();
};
