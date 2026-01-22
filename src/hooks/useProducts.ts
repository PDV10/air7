import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "../api";
import type { Product } from "../api";

// Query keys para productos
export const productKeys = {
  all: ["products"] as const,
  detail: (id: number) => ["products", id] as const,
};

// Hook para obtener todos los productos
export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
  });
};

// Hook para obtener un producto por ID
export const useProduct = (id: number | undefined) => {
  return useQuery({
    queryKey: productKeys.detail(id!),
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
};

// Helper para convertir precio de string a número
export const parsePrice = (price: string | number): number => {
  if (typeof price === "number") return price;
  return Number.parseFloat(price) || 0;
};

// Helper para obtener valores únicos de un campo de los productos
export const getUniqueValues = <T extends Product, K extends keyof T>(
  products: T[],
  key: K
): string[] => {
  const values = products
    .map((p) => p[key])
    .filter((v): v is NonNullable<T[K]> => v != null);

  if (key === "sizes") {
    // Flatten sizes array
    const allSizes = (values as string[][]).flat();
    return [...new Set(allSizes)].sort((a, b) => {
      const numA = Number.parseInt(a, 10);
      const numB = Number.parseInt(b, 10);
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }

  return [...new Set(values.map(String))].sort();
};
