import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";

import img1 from "../../../assets/zapatillas/MB-04-phoenix.webp";
import img2 from "../../../assets/zapatillas/zapatilla-puma-2.webp";
import img3 from "../../../assets/zapatillas/zapatilla-puma-3.webp";
import img4 from "../../../assets/zapatillas/zapatilla-puma-4.webp";
import img5 from "../../../assets/zapatillas/zapatillas-puma.webp";
import { ProductCard } from "../../common/ProductCard";

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MARQUEE_LABEL = "> Destacados";

const MARQUEE_ITEMS = Array.from({ length: 12 }, (_, index) => `dest-${index}`);

const FEATURED_PRODUCTS = [
  { id: 1, name: "Air7 Runner Pro", price: 54900, img: img1 },
  { id: 2, name: "Air7 SportX", price: 64900, img: img2 },
  { id: 3, name: "Air7 Vintage Court", price: 59900, img: img3 },
  { id: 4, name: "Air7 Street Flow", price: 49900, img: img4 },
  { id: 5, name: "Air7 Energy Boost", price: 69900, img: img5 },
];

export const HomeDestacados = () => {
  return (
    <Flex flexDir="column" gap={12} w="100%" bgColor="gray.900" py={10}>
      <Box overflow="hidden" w="100%">
        <Flex
          fontFamily="Zuume"
          fontSize={{ base: 32, md: 48 }}
          fontWeight="bold"
          letterSpacing="-1px"
          color="white"
          animation={`${marquee} 30s linear infinite`}
          w="max-content"
        >
          {MARQUEE_ITEMS.map((id) => (
            <Text
              key={id}
              mx={6}
              opacity={0.8}
              whiteSpace="nowrap"
              color="gray.100"
            >
              {MARQUEE_LABEL}
            </Text>
          ))}
        </Flex>
      </Box>

      <Flex flexWrap="wrap" justifyContent="center" gap={{ base: 6, md: 20 }}>
        {FEATURED_PRODUCTS.map((product) => (
          <Flex
            flexDir="column"
            key={product.id}
            w={{ base: "40%", md: "32%", lg: "180px" }}
            cursor="pointer"
          >
            <ProductCard
              key={product.id}
              to={`/productos/${product.id}`}
              image={product.img}
              imageAlt={product.name}
              title={product.name}
              price={product.price}
            />
          </Flex>
        ))}
      </Flex>

      <Flex justifyContent="center">
        <Button
          as={Link}
          to="/destacados"
          bg="brand.500"
          color="white"
          borderRadius="full"
          px={10}
          py={6}
          fontSize={20}
          fontWeight="bold"
          letterSpacing="-0.5px"
          _hover={{
            bg: "brand.600",
            transform: "scale(1.05)",
          }}
          transition="all 0.2s ease"
        >
          VER MÁS
        </Button>
      </Flex>
    </Flex>
  );
};
