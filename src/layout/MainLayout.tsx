import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      bg={bg}
      borderBottomWidth="1px"
      borderBottomColor={border}
      px={6}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center">
        {/* LOGO */}
        <Text
          as={Link}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.500"
        >
          air7
        </Text>

        {/* NAV LINKS */}
        <HStack spacing={4} ml={8}>
          <Button as={Link} to="/products" variant="ghost" size="sm">
            Zapatillas
          </Button>
          <Button as={Link} to="/cart" variant="ghost" size="sm">
            Carrito
          </Button>
        </HStack>

        <Spacer />

        {/* DARK/LIGHT MODE TOGGLE */}
        <IconButton
          aria-label="Cambiar modo de color"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
        />
      </Flex>
    </Box>
  );
}

function Footer() {
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="footer"
      mt={10}
      borderTopWidth="1px"
      borderTopColor={border}
      py={4}
      textAlign="center"
      fontSize="sm"
    >
      © {new Date().getFullYear()} air7 — Todos los derechos reservados.
    </Box>
  );
}

export default function MainLayout() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />

      {/* CONTENT */}
      <Box as="main" flex="1" px={6} py={6}>
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
