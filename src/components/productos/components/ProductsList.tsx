import { Box, Flex, Text, Select } from "@chakra-ui/react";
import type { Product } from "../types/product";
import { ProductCard } from "../../common/ProductCard";
import type { OrderBy } from "../hooks/useProductsFilters";
import { useProductsList } from "../hooks/userProductsList";
import { ProductsListPagination } from "./ProductsListPagination";

export const ProductsList = ({
  filteredProducts,
}: {
  filteredProducts: Product[];
}) => {
  const {
    orderBy,
    handleOrderByChange,
    hasProducts,
    totalPages,
    pageProducts,
    currentPage,
    handlePageChange,
  } = useProductsList(filteredProducts);

  return (
    <Box w={{ base: "100%", md: "70%" }} h="100%">
      {hasProducts ? (
        <>
          <Flex justify="end" align="center" mb={4} gap={4} w="90%">
            <Text color="gray.600">Ordenar por:</Text>
            <Select
              size="sm"
              maxW="220px"
              value={orderBy}
              onChange={(e) => handleOrderByChange(e.target.value as OrderBy)}
              bg="gray.300"
              borderRadius="xl"
              borderColor="gray.400"
              _hover={{ borderColor: "brand.500" }}
              _focus={{
                borderColor: "brand.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
              }}
            >
              <option value="popular">Más vendidos</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="nameAsc">Nombre A-Z</option>
            </Select>
          </Flex>

          <Flex flexDir="column" justifyContent="center" mb={8}>
            <Flex
              flexWrap="wrap"
              justifyContent="center"
              gap={{ base: 6, md: 8 }}
            >
              {pageProducts.map((product: Product) => (
                <Box
                  key={product.id}
                  flex={{
                    base: "0 0 calc(50% - 12px)",
                    md: "0 0 270px",
                  }}
                >
                  <ProductCard
                    to={`/productos/${product.id}`}
                    image={product.imageUrl}
                    imageAlt={product.name}
                    title={product.name}
                    price={product.price}
                    cardWidth="100%"
                    cardHeight={{ base: "230px", md: "300px" }}
                    objectFit="contain"
                    textColor="gray.900"
                    textWidth="md"
                  />
                </Box>
              ))}
            </Flex>
          </Flex>

          <ProductsListPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          gap={3}
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            No encontramos productos
          </Text>
          <Text maxW="sm" color="gray.600" fontSize="sm">
            Probá con otra categoría o ajustá los filtros para ver más opciones.
          </Text>
        </Flex>
      )}
    </Box>
  );
};
