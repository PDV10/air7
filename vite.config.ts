import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			react(),
			Pages({
				dirs: "src/routes",
				extensions: ["tsx"],
			}),
		],
		server: {
			proxy: {
				// Proxy para todas las rutas de admin al backend
				// El backend maneja autenticación JWT y API key
				"/api/admin": {
					target: env.VITE_API_URL || "https://air7-api.onrender.com/api",
					changeOrigin: true,
					// /api/admin/login → /admin/login (el target ya tiene /api)
					rewrite: (path) => path.replace(/^\/api\/admin/, "/admin"),
					configure: (proxy) => {
						proxy.on("proxyReq", (proxyReq) => {
							// Añadir API key en el servidor para rutas que lo requieran
							if (env.AIR7_API_KEY) {
								proxyReq.setHeader("x-api-key", env.AIR7_API_KEY);
							}
						});
					},
				},
			},
		},
	};
});
