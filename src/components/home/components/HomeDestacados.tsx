import { Box, Flex, Text, Button, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { useProducts, parsePrice } from "../../../hooks";
import { ProductCard } from "../../common/ProductCard";

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MARQUEE_LABEL = "> Destacados";

const MARQUEE_ITEMS = Array.from({ length: 12 }, (_, index) => `dest-${index}`);

export const HomeDestacados = () => {
	const { data: products = [], isLoading } = useProducts();

	// Tomar los primeros 5 productos como destacados
	// Podrías agregar un campo "featured" en tu API para filtrar productos destacados
	const featuredProducts = products.slice(0, 5);

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
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<Flex
								key={`skeleton-${index + 1}`}
								flexDir="column"
								w={{ base: "40%", md: "32%", lg: "180px" }}
							>
								<Skeleton
									height={{ base: "180px", md: "220px" }}
									borderRadius="xl"
								/>
								<Skeleton height="20px" mt={2} width="80%" />
								<Skeleton height="16px" mt={1} width="50%" />
							</Flex>
						))
					: featuredProducts.map((product) => (
							<Flex
								flexDir="column"
								key={product.id}
								w={{ base: "40%", md: "32%", lg: "180px" }}
								cursor="pointer"
							>
								<ProductCard
									to={`/productos/${product.id}`}
									image={product.imageUrl}
									imageAlt={product.name}
									title={product.name}
									price={parsePrice(product.price)}
								/>
							</Flex>
						))}
			</Flex>

			<Flex justifyContent="center">
				<Button
					as={Link}
					to="/productos"
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
