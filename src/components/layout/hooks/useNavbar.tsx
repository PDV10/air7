import { useLocation, useSearchParams } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";
import type { ProductCategory } from "../../productos/types/product";

type NavLink = {
  label: string;
  to: string;
  category?: ProductCategory;
};

export const useNavbar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isHome, pathname } = useLayout();

  const currentCategory = (searchParams.get("category") ??
    "ofertas") as ProductCategory;

  const getNavTo = (link: NavLink) => {
    const isProductos = link.to === "/productos";

    if (!isProductos || !link.category) return link.to;

    const params = new URLSearchParams(searchParams);
    const category = link.category;

    params.set("category", category);

    const search = params.toString();

    return {
      pathname: link.to,
      search: search ? `?${search}` : "",
    };
  };

  const isLinkActive = (link: NavLink) => {
    const isProductos = link.to === "/productos";

    if (isProductos && link.category) {
      return (
        location.pathname === "/productos" && currentCategory === link.category
      );
    }

    return pathname === link.to;
  };

  return {
    isHome,
    currentCategory,
    getNavTo,
    isLinkActive,
    searchParams,
    setSearchParams,
  };
};
