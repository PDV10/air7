import { createBrowserRouter } from "react-router-dom";
import routes from "~react-pages";
import { MainLayout } from "./components/layout/components/MainLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { StockControlPage } from "./pages/admin/StockControlPage";
import { AdminGuard } from "./components/admin/AdminGuard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: routes,
	},
	{
		path: "/admin/login",
		element: <AdminLoginPage />,
	},
	{
		path: "/admin/stock",
		element: (
			<AdminGuard>
				<StockControlPage />
			</AdminGuard>
		),
	},
]);

export default router;
