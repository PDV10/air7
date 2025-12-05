import { Box, Image, Text, type BoxProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type ProductCardProps = BoxProps & {
  to: string;
  image: string;
  imageAlt: string;
  title?: string;
  price?: number | string;
  cardHeight?: string | number;
  cardWidth?: string | number;
  cardRadius?: string | number;
  labelOverlay?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
};

export const ProductCard = ({
  to,
  image,
  imageAlt,
  title,
  price,
  cardHeight = "200px",
  cardWidth,
  cardRadius = "3xl",
  objectFit = "contain",
  labelOverlay,
}: ProductCardProps) => {
  const formattedPrice =
    typeof price === "number" ? price.toLocaleString("es-AR") : price ?? "";

  return (
    <>
      <Box
        as={Link}
        to={to}
        borderRadius={cardRadius}
        overflow="hidden"
        position="relative"
        height={cardHeight}
        width={cardWidth}
        bg="gray.300"
        cursor="pointer"
        transition="all 0.2s ease"
        _hover={{
          transform: "scale(1.03)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        }}
      >
        <Image
          bgColor="white"
          src={image}
          alt={imageAlt}
          w="100%"
          h="100%"
          objectFit={objectFit}
        />

        <Box
          position="absolute"
          bottom={0}
          left={0}
          w="full"
          h={labelOverlay ? "80px" : "50px"}
          bgGradient="linear(to-b, transparent, brand.500)"
          display="flex"
          alignItems={labelOverlay ? "flex-end" : "stretch"}
          pl={labelOverlay ? 6 : 0}
          pb={labelOverlay ? 3 : 0}
        >
          {labelOverlay && (
            <Text
              fontFamily="Zuume"
              fontSize="3xl"
              fontWeight="medium"
              color="white"
              letterSpacing="-0.5px"
              noOfLines={1}
            >
              {labelOverlay}
            </Text>
          )}
        </Box>
      </Box>

      {title && (
        <Text
          mt={3}
          fontWeight="semibold"
          fontSize={{ base: "md", md: "lg" }}
          color="gray.100"
        >
          {title}
        </Text>
      )}

      {price !== undefined && price !== null && (
        <Text
          fontWeight="bold"
          fontSize="2xl"
          fontFamily="Zuume"
          color="brand.500"
          letterSpacing="-0.5px"
        >
          ${formattedPrice}
        </Text>
      )}
    </>
  );
};
