import { buildUrl } from "./config";
import type { Product } from "./types";

// GET /api/products - Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
	const response = await fetch(buildUrl("/products"), {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error("Error al obtener los productos");
	}

	return response.json();
};

// GET /api/products/:id - Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product> => {
	const response = await fetch(buildUrl(`/products/${id}`), {
		method: "GET",
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error("Producto no encontrado");
		}
		throw new Error("Error al obtener el producto");
	}

	return response.json();
};
