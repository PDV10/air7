import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProductDetail() {
  const { productID } = useParams();

  return (
    <Box>
      <Heading>Detalle del producto</Heading>
      <Text>ID del producto: {productID}</Text>

      <Text mt={2} fontSize="sm" color="gray.500">
        Más adelante usaremos este productID para traer datos desde la API/DB.
      </Text>
    </Box>
  );
}
