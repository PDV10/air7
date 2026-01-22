import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  getProductsByCategory,
} from "../api";

// Query keys para categorías
export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: number) => ["categories", id] as const,
  products: (id: number) => ["categories", id, "products"] as const,
};

// Hook para obtener todas las categorías
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
  });
};

// Hook para obtener una categoría por ID
export const useCategory = (id: number | undefined) => {
  return useQuery({
    queryKey: categoryKeys.detail(id!),
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
  });
};

// Hook para obtener productos de una categoría
export const useCategoryProducts = (id: number | undefined) => {
  return useQuery({
    queryKey: categoryKeys.products(id!),
    queryFn: () => getProductsByCategory(id!),
    enabled: !!id,
  });
};
