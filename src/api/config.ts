// Configuración de la API
// Usar rutas relativas /api/... para que funcione igual en local y prod

// Headers por defecto para las peticiones
export const defaultHeaders: HeadersInit = {
	"Content-Type": "application/json",
};

// Helper para construir URLs relativas
export const buildUrl = (endpoint: string): string => {
	return `/api${endpoint}`;
};
