// src/router.tsx
import React from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

type PageModule = {
  default: React.ComponentType;
};

const modules = import.meta.glob<PageModule>("./routes/**/*.tsx", {
  eager: true,
});

function filePathToRoutePath(filePath: string): string {
  let routePath = filePath
    .replace("./routes", "")
    .replace(/index\.tsx$/, "")
    .replace(/\.tsx$/, "")
    .replace(/\[([^\]]+)\]/g, ":$1");

  if (routePath === "") {
    routePath = "/";
  }

  return routePath;
}

const childRoutes: RouteObject[] = Object.entries(modules).map(
  ([filePath, module]) => {
    const routePath = filePathToRoutePath(filePath);
    const Component = module.default;

    if (routePath === "/") {
      return {
        index: true,
        element: <Component />,
      };
    }
    const childPath = routePath.slice(1);

    return {
      path: childPath,
      element: <Component />,
    };
  }
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: childRoutes,
  },
]);

export default router;
