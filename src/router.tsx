import { createBrowserRouter } from "react-router-dom";
import routes from "~react-pages";
import { MainLayout } from "./components/layout/components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routes,
  },
]);

export default router;
