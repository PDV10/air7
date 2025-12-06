import {
  Box,
  Flex,
  Image,
  Text,
  type BoxProps,
  type ResponsiveValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type ProductCardProps = BoxProps & {
  to: string;
  image: string;
  imageAlt: string;
  title?: string;
  price?: number | string;
  cardHeight?: ResponsiveValue<string | number>;
  cardWidth?: ResponsiveValue<string | number>;
  cardRadius?: ResponsiveValue<string | number>;
  labelOverlay?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  textColor?: string;
  textWidth?: string | number;
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
  textColor = "gray.100",
  textWidth = "lg",
  ...rest
}: ProductCardProps) => {
  const formattedPrice =
    typeof price === "number" ? price.toLocaleString("es-AR") : price ?? "";

  return (
    <Flex flexDir="column" {...rest}>
      <Flex
        flexBasis={{
          base: "100%",
          sm: "40%",
          lg: "22%",
        }}
        justifyContent="center"
        flexDir="column"
        pb={4}
        alignItems="center"
      >
        <Flex
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
        </Flex>
      </Flex>

      {title && (
        <Text
          pl={2}
          mt={3}
          fontWeight="semibold"
          fontSize={textWidth}
          color={textColor}
        >
          {title}
        </Text>
      )}

      {price !== undefined && price !== null && (
        <Text
          pl={2}
          fontWeight="bold"
          fontSize="2xl"
          fontFamily="Zuume"
          color="brand.500"
          letterSpacing="-0.5px"
        >
          ${formattedPrice}
        </Text>
      )}
    </Flex>
  );
};
