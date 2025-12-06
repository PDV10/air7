import { useSearchParams } from "react-router-dom";
import type { ProductCategory } from "../types/product";
import { useMemo } from "react";
import { ALL_PRODUCTS } from "../products";

export type OrderBy = "popular" | "priceAsc" | "priceDesc" | "nameAsc";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  ofertas: "Ofertas",
  deporte: "Deporte",
  moda: "Moda",
};

const ORDER_BY_VALUES: OrderBy[] = [
  "popular",
  "priceAsc",
  "priceDesc",
  "nameAsc",
];

export const useProductsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const categoryParam = searchParams.get("category") as ProductCategory | null;

  const brandsParam = searchParams.get("brands") ?? "";
  const selectedBrands = brandsParam ? brandsParam.split(",") : [];

  const sizesParam = searchParams.get("sizes") ?? "";
  const selectedSizes = sizesParam ? sizesParam.split(",") : [];

  const searchTermParam = searchParams.get("search") ?? "";
  const searchTerm = searchTermParam.trim().toLowerCase();

  const recommendedForParam = searchParams.get("recommendedFor") ?? "";
  const selectedRecommendedFor = recommendedForParam
    ? recommendedForParam.split(",")
    : [];

  const rawOrderBy = searchParams.get("orderBy") as OrderBy | null;
  const orderBy: OrderBy = ORDER_BY_VALUES.includes(rawOrderBy as OrderBy)
    ? (rawOrderBy as OrderBy)
    : "popular";

  const handleBrandChange = (values: string[]) => {
    if (values.length > 0) {
      params.set("brands", values.join(","));
    } else {
      params.delete("brands");
    }
    setSearchParams(params);
  };

  const handleSizeChange = (values: string[]) => {
    if (values.length > 0) {
      params.set("sizes", values.join(","));
    } else {
      params.delete("sizes");
    }
    setSearchParams(params);
  };

  const handleRecommendedForChange = (values: string[]) => {
    if (values.length > 0) {
      params.set("recommendedFor", values.join(","));
    } else {
      params.delete("recommendedFor");
    }
    setSearchParams(params);
  };

  const handleOrderByChange = (value: OrderBy) => {
    if (value === "popular") {
      params.delete("orderBy");
    } else {
      params.set("orderBy", value);
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    params.delete("brands");
    params.delete("sizes");
    params.delete("recommendedFor");
    params.delete("search");
    params.delete("category");
    setSearchParams(params);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedRecommendedFor.length > 0 ||
    !!searchTerm ||
    !!categoryParam;

  const checkBoxColorScheme = "brand";

  const titleLabel = categoryParam
    ? CATEGORY_LABELS[categoryParam]
    : "Productos";

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // 👇 Solo filtro por categoría si viene en la URL
      if (categoryParam && product.category !== categoryParam) return false;

      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((size) => selectedSizes.includes(size))
      ) {
        return false;
      }

      if (
        selectedRecommendedFor.length > 0 &&
        !selectedRecommendedFor.includes(product.recommendedFor)
      ) {
        return false;
      }

      if (searchTerm) {
        const name = product.name.toLowerCase();
        const brand = product.brand.toLowerCase();
        if (!name.includes(searchTerm) && !brand.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [
    categoryParam,
    selectedBrands,
    selectedSizes,
    selectedRecommendedFor,
    searchTerm,
  ]);

  const hasFilterParams =
    !!searchParams.get("category") ||
    !!searchParams.get("brands") ||
    !!searchParams.get("sizes") ||
    !!searchParams.get("recommendedFor") ||
    !!searchParams.get("search");

  const products = hasFilterParams ? filteredProducts : ALL_PRODUCTS;
  const totalProducts = products.length;

  return {
    handleBrandChange,
    handleSizeChange,
    handleRecommendedForChange,
    handleOrderByChange,
    titleLabel,
    selectedBrands,
    selectedSizes,
    selectedRecommendedFor,
    products,
    checkBoxColorScheme,
    handleClearFilters,
    hasActiveFilters,
    orderBy,
    totalProducts,
  };
};
