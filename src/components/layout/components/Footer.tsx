import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      mt={10}
      borderTopWidth="1px"
      borderTopColor="border.primary"
      py={4}
      textAlign="center"
      fontSize="sm"
      bg="surface.primary"
    >
      <Text>
        © {new Date().getFullYear()} air7 — Todos los derechos reservados.
      </Text>
    </Box>
  );
}
