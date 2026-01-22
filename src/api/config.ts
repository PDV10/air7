// Configuración de la API
export const API_BASE_URL = "https://air7-api.onrender.com/api";

// Headers por defecto para las peticiones
export const defaultHeaders: HeadersInit = {
	"Content-Type": "application/json",
};

// Helper para construir URLs
export const buildUrl = (endpoint: string): string => {
	return `${API_BASE_URL}${endpoint}`;
};
