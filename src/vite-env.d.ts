/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

// Extender tipos de Vite para variables de entorno personalizadas
// Nota: Las credenciales (ADMIN_USER, ADMIN_PASS, AIR7_API_KEY) NO tienen prefijo VITE_
// y se usan solo en el servidor (proxy/serverless), nunca expuestas al cliente
declare global {
	interface ImportMetaEnv {
		readonly VITE_API_URL: string;
	}
}

export {};
