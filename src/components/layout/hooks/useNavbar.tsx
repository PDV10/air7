import { useLocation, useSearchParams } from "react-router-dom";
import type { ProductCategory } from "../../productos/types/product";

type NavLink = {
  label: string;
  to: string;
  category?: ProductCategory;
};

export const useNavbar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = location.pathname;

  const isHome = pathname === "/";

  const getNavTo = (link: NavLink) => {
    if (link.to === "/productos" && link.category) {
      const params = new URLSearchParams(searchParams);
      params.set("category", link.category);
      const qs = params.toString();
      return qs ? `${link.to}?${qs}` : link.to;
    }

    if (link.to === "/productos" && !link.category) {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      const qs = params.toString();
      return qs ? `${link.to}?${qs}` : link.to;
    }

    return link.to;
  };

  const isLinkActive = (link: NavLink) => {
    if (link.to === "/productos") {
      if (pathname !== "/productos") return false;

      const categoryParam = searchParams.get("category");

      if (!categoryParam) {
        return !link.category;
      }

      return link.category === (categoryParam as ProductCategory);
    }

    return pathname === link.to;
  };

  return {
    isHome,
    getNavTo,
    isLinkActive,
    searchParams,
    setSearchParams,
  };
};
