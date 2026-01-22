// Vercel Serverless Function - Proxy para rutas de admin
// Reenvía requests al backend, añadiendo API key server-side
// El backend maneja la autenticación JWT

// Tipos inline para evitar dependencia de @vercel/node en desarrollo
interface VercelRequest {
	method?: string;
	query: Record<string, string | string[]>;
	body?: unknown;
	headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
	status: (code: number) => VercelResponse;
	json: (data: unknown) => void;
	send: (data: string) => void;
	setHeader: (name: string, value: string) => void;
	end: () => void;
}

const API_BASE_URL =
	process.env.VITE_API_URL || "https://air7-api.onrender.com/api";
const API_KEY = process.env.AIR7_API_KEY || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Obtener el path después de /api/admin/
	const { path } = req.query;
	const pathSegments = Array.isArray(path) ? path : [path];
	const targetPath = "/" + pathSegments.filter(Boolean).join("/");

	// Construir URL de destino
	const targetUrl = `${API_BASE_URL}${targetPath}`;

	// Preparar headers
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	// Añadir API key (server-side, no expuesta al cliente)
	if (API_KEY) {
		headers["x-api-key"] = API_KEY;
	}

	// Reenviar header Authorization del cliente (JWT token)
	const authHeader = req.headers["authorization"];
	if (authHeader) {
		headers["Authorization"] = Array.isArray(authHeader)
			? authHeader[0]
			: authHeader;
	}

	try {
		// Preparar body para POST/PUT
		let body: string | undefined;
		if (req.method === "POST" || req.method === "PUT") {
			// Para multipart/form-data, necesitamos manejar diferente
			const contentType = req.headers["content-type"] || "";
			if (
				typeof contentType === "string" &&
				contentType.includes("multipart/form-data")
			) {
				// Para FormData, hacer forwarding directo
				// Nota: Para uploads de archivos, considera usar signed URLs de Cloudinary
				return res.status(501).json({
					error:
						"File uploads through proxy not supported. Use direct upload to Cloudinary.",
				});
			}
			body = JSON.stringify(req.body);
		}

		// Hacer la petición al API real
		const response = await fetch(targetUrl, {
			method: req.method,
			headers,
			body,
		});

		// Obtener respuesta
		const responseData = await response.text();

		// Retornar con el mismo status code
		res.status(response.status);

		// Copiar headers relevantes
		const contentTypeResponse = response.headers.get("content-type");
		if (contentTypeResponse) {
			res.setHeader("Content-Type", contentTypeResponse);
		}

		// Enviar respuesta
		if (responseData) {
			try {
				res.json(JSON.parse(responseData));
			} catch {
				res.send(responseData);
			}
		} else {
			res.end();
		}
	} catch (error) {
		console.error("Proxy error:", error);
		res.status(500).json({
			error: "Internal server error",
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
}
