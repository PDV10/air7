import { Flex } from "@chakra-ui/react";
import { ProductsList } from "./ProductsList";
import { useProductsFilters } from "../hooks/useProductsFilters";
import { ProductsFilters } from "./ProductsFilters";

export const Productos = () => {
  const { products } = useProductsFilters();
  return (
    <Flex
      px={8}
      mt={24}
      py={10}
      gap={8}
      minH="90vh"
      maxW={{ base: "100%", md: "90%" }}
      justifyContent="center"
      flexDir={{ base: "column", md: "row" }}
    >
      <ProductsFilters />

      <ProductsList products={products} />
    </Flex>
  );
};
