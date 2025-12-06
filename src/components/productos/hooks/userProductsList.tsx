import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types/product";
import { useProductsFilters } from "./useProductsFilters";

const PRODUCTS_PER_PAGE = 8;

export type PaginationItem = number | "dots";

const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationItem[] => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  const range: PaginationItem[] = [];

  range.push(firstPageIndex);

  if (showLeftDots) {
    range.push("dots");
  } else {
    for (let i = 2; i < leftSiblingIndex; i++) {
      range.push(i);
    }
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== firstPageIndex && i !== lastPageIndex) {
      range.push(i);
    }
  }

  if (showRightDots) {
    range.push("dots");
  } else {
    for (let i = rightSiblingIndex + 1; i < lastPageIndex; i++) {
      range.push(i);
    }
  }

  if (lastPageIndex !== firstPageIndex) {
    range.push(lastPageIndex);
  }

  return range;
};

export const useProductsList = (filteredProducts: Product[]) => {
  const { orderBy, handleOrderByChange } = useProductsFilters();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (orderBy) {
      case "priceAsc":
        return products.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return products.sort((a, b) => b.price - a.price);
      case "nameAsc":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "popular":
      default:
        return products;
    }
  }, [filteredProducts, orderBy]);

  const totalProducts = sortedProducts.length;
  const hasProducts = totalProducts > 0;

  const totalPages =
    totalProducts === 0 ? 1 : Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage =
    Number.isNaN(pageParam) || pageParam < 1
      ? 1
      : pageParam > totalPages
      ? totalPages
      : pageParam;

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const pageProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams);

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    setSearchParams(params);
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return {
    orderBy,
    handleOrderByChange,
    totalProducts,
    hasProducts,
    currentPage,
    totalPages,
    pageProducts,
    paginationRange,
    handlePageChange,
    pages,
  };
};
