import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { buildUrl } from "../../api/config";

interface AdminGuardProps {
	children: ReactNode;
}

const AUTH_KEY = "adminAuth";

// Verificar si está autenticado (check localStorage)
export const isAdminLoggedIn = (): boolean => {
	return localStorage.getItem(AUTH_KEY) === "true";
};

// Login - llama al backend y guarda flag en localStorage
export const loginAdmin = async (
	username: string,
	password: string,
): Promise<{ success: boolean; error?: string }> => {
	try {
		const response = await fetch(buildUrl("/admin/login"), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (data.success) {
			localStorage.setItem(AUTH_KEY, "true");
			return { success: true };
		}

		return { success: false, error: data.error || "Credenciales inválidas" };
	} catch {
		return { success: false, error: "Error de conexión" };
	}
};

// Logout - elimina flag de localStorage
export const logoutAdmin = (): void => {
	localStorage.removeItem(AUTH_KEY);
};

// Componente Guard - redirige a login si no está autenticado
export const AdminGuard = ({ children }: AdminGuardProps) => {
	if (!isAdminLoggedIn()) {
		return <Navigate to="/admin/login" replace />;
	}

	return <>{children}</>;
};
