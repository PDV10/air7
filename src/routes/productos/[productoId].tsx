import { useParams } from "react-router-dom";
import { Box, Heading, Text, Spinner, Flex } from "@chakra-ui/react";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Zapatilla #{productId}
      </Heading>

      <Text>
        Mostrando información de la zapatilla con ID:
        <b> {productId}</b>
      </Text>

      <Flex
        mt={6}
        h="300px"
        align="center"
        justify="center"
        borderRadius="lg"
        bg="gray.100"
      >
        Imagen placeholder del producto
      </Flex>
    </Box>
  );
}
