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
				"/api": {
					target: "https://air7-api.onrender.com",
					changeOrigin: true,
					secure: true,
					configure: (proxy) => {
						proxy.on("proxyReq", (proxyReq) => {
							if (env.AIR7_API_KEY) {
								proxyReq.setHeader(
									"Authorization",
									`Bearer ${env.AIR7_API_KEY}`,
								);
							}
						});
					},
				},
			},
		},
	};
});
