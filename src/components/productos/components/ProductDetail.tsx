import { Box, Flex, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ALL_PRODUCTS } from "../products";
import { CATEGORY_LABELS } from "../hooks/useProductsFilters";
import { ProductCard } from "../../common/ProductCard";

export const ProductDetail = () => {
  const { productoId } = useParams();
  const navigate = useNavigate();

  const product = ALL_PRODUCTS.find((p) => String(p.id) === String(productoId));

  const cardWidth = useBreakpointValue({
    base: "300px",
    md: "550px",
  });

  const cardHeight = useBreakpointValue({
    base: "320",
    md: "520px",
  });

  if (!product) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="lg" fontWeight="bold">
          Producto no encontrado
        </Text>
      </Box>
    );
  }

  const categoryLabel = CATEGORY_LABELS[product.category];

  return (
    <Box
      minH={{
        base: "calc(80vh - 80px)",
        md: "calc(100vh )",
      }}
      px={{ base: 4, sm: 6, md: 12, lg: 16 }}
      pb={{ base: 10, md: 12 }}
      pt={{ base: "90px", md: 24 }}
      bgGradient="linear(to-b, gray.100, gray.200)"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        direction="column"
        gap={6}
        minH={{ base: "auto", md: "420px" }}
      >
        <Text
          fontFamily="Zuume"
          fontWeight="bold"
          fontSize={{ base: "xl", md: "4xl" }}
          color="gray.900"
          textTransform="uppercase"
        >
          {"> "}
          {categoryLabel}
          <Text
            as="span"
            color="gray.800"
            fontWeight="semibold"
            fontFamily="Zuume"
            pl={3}
          >
            {"> "}
            {product.name}
          </Text>
        </Text>

        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems={{ base: "center", md: "stretch" }}
          gap={{ base: 8, md: 10, lg: 16 }}
        >
          <Box
            flex={{ base: "none", md: "0 0 50%" }}
            display="flex"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <ProductCard
              to="#"
              image={product.imageUrl}
              imageAlt={product.name}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              cardRadius="3xl"
              objectFit="contain"
              boxShadow={{
                base: "0px 8px 15px rgba(0,0,0,0.18), 0px 24px 60px rgba(0,0,0,0.28)",
                md: "0px 10px 25px rgba(0,0,0,0.16), 0px 20px 45px rgba(0,0,0,0.20)",
              }}
              bg="white"
              _hover={{
                transform: "none",
                cursor: "default",
              }}
              hideBlur
              hideHover
            />
          </Box>

          <Flex
            flex="1"
            direction="column"
            gap={{ base: 6, md: 10, lg: 12 }}
            mt={{ base: 2, md: 0 }}
          >
            <Flex flexDir="column">
              <Text
                fontFamily="Zuume"
                fontWeight="bold"
                textAlign={{ base: "center", md: "start" }}
                fontSize={{
                  base: "3xl",
                  sm: "4xl",
                  md: "4xl",
                  lg: "5xl",
                  xl: "6xl",
                }}
                letterSpacing="-0.5px"
              >
                {product.name}
              </Text>

              <Text
                fontFamily="Zuume"
                fontWeight="bold"
                textAlign={{ base: "center", md: "start" }}
                fontSize={{
                  base: "2xl",
                  sm: "3xl",
                  md: "3xl",
                  lg: "4xl",
                }}
                color="brand.500"
                letterSpacing="-0.5px"
              >
                $
                {product.price.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>

              {product.description && (
                <Text
                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                  maxW={{ base: "90%", md: "520px" }}
                  minH={{ md: "80px" }}
                  color="gray.900"
                  fontWeight="medium"
                  textAlign={{ base: "center", md: "start" }}
                >
                  {product.description}
                </Text>
              )}
            </Flex>

            <Flex
              mt={{ base: 4, md: 0 }}
              pb={2}
              gap={4}
              wrap="wrap"
              justifyContent={{ base: "center", md: "flex-start" }}
              alignItems="center"
            >
              <Button
                size="lg"
                borderRadius="full"
                px={{ base: 8, md: 10 }}
                py={{ base: 5, md: 6 }}
                bgGradient="linear(to-r, brand.500, orange.400)"
                color="white"
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}
                _hover={{
                  opacity: 0.95,
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                Comprar ahora
              </Button>

              <Button
                size="xs"
                borderRadius="full"
                px={{ base: 6, md: 8 }}
                py={{ base: 4, md: 5 }}
                variant="outline"
                borderColor="gray.500"
                color="gray.700"
                fontSize={{ base: "xs", md: "sm" }}
                _hover={{ bg: "gray.100" }}
                onClick={() =>
                  navigate(`/productos?category=${product.category}`)
                }
              >
                Volver a {categoryLabel}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
