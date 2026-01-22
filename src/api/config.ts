// Configuración de la API - Conexión directa a Render

// URL base de la API (sin proxy)
export const API_BASE_URL =
	import.meta.env.VITE_API_URL || "https://air7-api.onrender.com/api";

// Helper para construir URLs completas
export const buildUrl = (endpoint: string): string => {
	return `${API_BASE_URL}${endpoint}`;
};

// API Key para admin (POST/PUT/DELETE)
export const getApiKey = (): string => {
	return import.meta.env.VITE_AIR7_API_KEY || "";
};
