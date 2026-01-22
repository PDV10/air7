// Vercel Serverless Function - Proxy genérico para /api/*
// Reenvía requests al backend, añadiendo API key server-side
// Mapeo: /api/{path}?query -> https://air7-api.onrender.com/api/{path}?query

import type { IncomingMessage, ServerResponse } from "http";

// Deshabilitar bodyParser para poder forwardear el body raw (soporta multipart)
export const config = {
	api: {
		bodyParser: false,
	},
};

const BACKEND_BASE = "https://air7-api.onrender.com/api";

// Headers que NO deben forwadearse
const EXCLUDED_HEADERS = new Set([
	"host",
	"connection",
	"content-length",
	"transfer-encoding",
]);

// Leer el body raw como Buffer
async function getRawBody(req: IncomingMessage): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		req.on("data", (chunk: Buffer) => chunks.push(chunk));
		req.on("end", () => resolve(Buffer.concat(chunks)));
		req.on("error", reject);
	});
}

export default async function handler(
	req: IncomingMessage,
	res: ServerResponse,
) {
	// Verificar que la API key existe
	const API_KEY = process.env.AIR7_API_KEY;
	if (!API_KEY) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ error: "AIR7_API_KEY not configured in Vercel" }));
		return;
	}

	// Parsear la URL completa desde req.url (NO usar req.query)
	// req.url viene como: "/api/products/34?foo=bar" o "/api/categories"
	const rawUrl = req.url ?? "/";

	// Separar path y query string
	const [pathPart, queryPart] = rawUrl.split("?");

	// Remover el prefijo "/api" para obtener el resto del path
	// "/api/products/34" -> "/products/34"
	// "/api" -> ""
	const restPath = (pathPart ?? "/").replace(/^\/api/, "") || "";

	// Construir URL de destino (mantener query string si existe)
	const targetUrl = queryPart
		? `${BACKEND_BASE}${restPath}?${queryPart}`
		: `${BACKEND_BASE}${restPath}`;

	// Preparar headers para forwardear
	const forwardHeaders: Record<string, string> = {};

	// Copiar headers originales excepto los excluidos
	for (const [key, value] of Object.entries(req.headers)) {
		if (!EXCLUDED_HEADERS.has(key.toLowerCase()) && value) {
			forwardHeaders[key] = Array.isArray(value) ? value[0] : value;
		}
	}

	// Inyectar Authorization con API key (server-side, no expuesta al cliente)
	forwardHeaders["authorization"] = `Bearer ${API_KEY}`;

	try {
		// Leer body raw para métodos que lo requieren
		let bodyBuffer: Buffer | undefined;
		const method = req.method || "GET";
		if (method !== "GET" && method !== "HEAD") {
			bodyBuffer = await getRawBody(req);
		}

		// Hacer la petición al API real
		const response = await fetch(targetUrl, {
			method,
			headers: forwardHeaders,
			body:
				bodyBuffer && bodyBuffer.length > 0
					? (bodyBuffer as unknown as BodyInit)
					: undefined,
		});

		// Copiar status code
		res.statusCode = response.status;

		// Copiar headers de respuesta relevantes
		response.headers.forEach((value, key) => {
			const lowerKey = key.toLowerCase();
			if (
				lowerKey !== "transfer-encoding" &&
				lowerKey !== "connection" &&
				lowerKey !== "content-encoding"
			) {
				res.setHeader(key, value);
			}
		});

		// Obtener y enviar body de respuesta
		const responseBuffer = Buffer.from(await response.arrayBuffer());

		if (responseBuffer.length > 0) {
			res.end(responseBuffer);
		} else {
			res.end();
		}
	} catch (error) {
		console.error("Proxy error:", error);
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				error: "Internal server error",
				message: error instanceof Error ? error.message : "Unknown error",
			}),
		);
	}
}
