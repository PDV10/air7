import { Flex, Text } from "@chakra-ui/react";

export const TopHeader = () => {
  return (
    <Flex
      as="header"
      bg="black"
      alignItems="center"
      px={{ base: 3, md: 6 }}
      py={2}
      fontSize={{ base: "xs", md: "sm" }}
    >
      {/* Columna izquierda (por ahora vacía, pero lista para futuro contenido) */}
      <Flex flex="1" />

      {/* Mensaje central */}
      <Flex flex="1" justify="center">
        <Text color="white" fontWeight="medium" textAlign="center">
          ENVÍO GRATIS A PARTIR DE $160.000
        </Text>
      </Flex>

      {/* Ayuda a la derecha */}
      <Flex flex="1" justify="flex-end">
        <Text color="gray.400" cursor="pointer" _hover={{ color: "gray.200" }}>
          ¿Necesitás ayuda?
        </Text>
      </Flex>
    </Flex>
  );
};
