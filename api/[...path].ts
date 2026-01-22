import type { IncomingMessage, ServerResponse } from "http";

export const config = { api: { bodyParser: false } };

const BACKEND_BASE = "https://air7-api.onrender.com/api";

const EXCLUDED_HEADERS = new Set([
	"host",
	"connection",
	"content-length",
	"transfer-encoding",
]);

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
	// Ping para verificar que la function corre en PROD
	if ((req.url || "").startsWith("/api/__ping")) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ ok: true }));
		return;
	}

	const API_KEY = process.env.AIR7_API_KEY;
	if (!API_KEY) {
		res.statusCode = 500;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ error: "AIR7_API_KEY not configured" }));
		return;
	}

	const rawUrl = req.url ?? "/";
	const [pathOnly, queryString] = rawUrl.split("?");

	// "/api/products/34" -> "/products/34"
	const restPath = (pathOnly ?? "/").replace(/^\/api/, "");
	const targetUrl =
		`${BACKEND_BASE}${restPath || "/"}` +
		(queryString ? `?${queryString}` : "");

	const forwardHeaders: Record<string, string> = {};
	for (const [key, value] of Object.entries(req.headers)) {
		if (EXCLUDED_HEADERS.has(key.toLowerCase())) continue;
		if (!value) continue;
		forwardHeaders[key] = Array.isArray(value) ? value.join(",") : value;
	}

	forwardHeaders["authorization"] = `Bearer ${API_KEY}`;

	const method = (req.method || "GET").toUpperCase();
	const hasBody = !["GET", "HEAD"].includes(method);
	const bodyBuffer = hasBody ? await getRawBody(req) : undefined;

	const response = await fetch(targetUrl, {
		method,
		headers: forwardHeaders,
		body: bodyBuffer && bodyBuffer.length > 0 ? (bodyBuffer as any) : undefined,
	});

	res.statusCode = response.status;
	response.headers.forEach((value, key) => {
		const lower = key.toLowerCase();
		if (lower === "transfer-encoding" || lower === "connection") return;
		res.setHeader(key, value);
	});

	const out = Buffer.from(await response.arrayBuffer());
	res.end(out.length ? out : undefined);
}
