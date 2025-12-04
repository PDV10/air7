import { Link } from "react-router-dom";
import { Box, Heading, Stack, Button } from "@chakra-ui/react";

export default function ProductsPage() {
  const products = [
    { id: "air-jordan-1" },
    { id: "lebron-21" },
    { id: "kyrie-infinity" },
  ];

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Productos
      </Heading>

      <Stack spacing={3}>
        {products.map((p) => (
          <Button
            key={p.id}
            as={Link}
            to={`/products/${p.id}`}
            variant="outline"
          >
            Ver {p.id}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
