import { useLocation } from "react-router-dom";

export const useLayout = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return {
    isHome,
    pathname,
  };
};
