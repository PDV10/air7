import {
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  IconButton,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useLayout } from "../hooks/useLayout";
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

export const NAV_LINKS = [
  { label: "Ofertas", to: "/productos", category: "ofertas" },
  { label: "Deporte", to: "/productos", category: "deporte" },
  { label: "Moda", to: "/productos", category: "moda" },
  { label: "Nosotros", to: "/nosotros" },
];

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Cambiar modo de color"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      _hover={{ bg: "transparent", opacity: 0.85 }}
    />
  );
};

export const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLayout();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "ofertas";

  const textColor = useColorModeValue("brand.500", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.300");
  const drawerBg = useColorModeValue("white", "gray.900");
  const headerColor = useColorModeValue("gray.900", "white");
  const inputBorderColor = useColorModeValue("brand.500", "white");

  const getNavTo = (link: (typeof NAV_LINKS)[number]) => {
    const isProductos = link.to === "/productos" && link.category;

    if (!isProductos) return link.to;

    const params = new URLSearchParams(searchParams);
    params.set("category", link.category);

    const search = params.toString();

    return {
      pathname: link.to,
      search: search ? `?${search}` : "",
    };
  };

  return (
    <>
      <IconButton
        aria-label="Abrir menú"
        icon={<HamburgerIcon boxSize={7} />}
        variant="ghost"
        display={{ base: "inline-flex", md: "none" }}
        color="brand.700"
        size="lg"
        minW="48px"
        minH="48px"
        _hover={{
          bg: "transparent",
          opacity: 0.85,
          transform: "scale(1.05)",
        }}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent bg={drawerBg}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            color={headerColor}
          >
            <Text color={headerColor} fontWeight="semibold">
              Menú
            </Text>
            <ColorModeToggle />
          </DrawerHeader>

          <DrawerBody>
            <Box mb={6}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color={textColor} />
                </InputLeftElement>

                <Input
                  placeholder="Buscar..."
                  borderRadius="full"
                  color={textColor}
                  _placeholder={{ color: placeholderColor }}
                  borderColor={inputBorderColor}
                  focusBorderColor="brand.700"
                />
              </InputGroup>
            </Box>

            <VStack align="flex-start" spacing={4}>
              {NAV_LINKS.map((link) => {
                const isProductos = link.to === "/productos" && link.category;

                const isActive = isProductos
                  ? location.pathname === "/productos" &&
                    currentCategory === link.category
                  : pathname === link.to;

                const to = getNavTo(link);

                return (
                  <Box
                    key={link.label}
                    as={Link}
                    to={to}
                    onClick={onClose}
                    _hover={{
                      opacity: 0.85,
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.15s ease"
                  >
                    <Text
                      fontSize="18px"
                      fontWeight={isActive ? "bold" : "semibold"}
                      color={textColor}
                      textDecoration={isActive ? "underline" : "none"}
                      textUnderlineOffset="4px"
                    >
                      {link.label}
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const NavBar = () => {
  const { isHome } = useLayout();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "ofertas";

  const textColor = isHome ? "white" : "gray.900";
  const borderColor = isHome ? "brand.700" : "brand.500";

  const getNavTo = (link: (typeof NAV_LINKS)[number]) => {
    const isProductos = link.to === "/productos" && link.category;

    if (!isProductos) return link.to;

    const params = new URLSearchParams(searchParams);
    params.set("category", link.category);

    const search = params.toString();

    return {
      pathname: link.to,
      search: search ? `?${search}` : "",
    };
  };

  return (
    <Flex
      as="nav"
      align="center"
      justifyContent="space-around"
      gap={6}
      px={8}
      h="50px"
      borderRadius="full"
      borderWidth="1px"
      borderColor={borderColor}
      bg={isHome ? "rgba(109, 60, 49, 0.35)" : "rgba(250, 110, 79, 0.35)"}
      boxShadow="0 8px 24px rgba(48, 48, 48, 0.35)"
      w="50%"
      display={{ base: "none", md: "flex" }}
    >
      {NAV_LINKS.map((link) => {
        const isProductos = link.to === "/productos" && link.category;

        const isActive = !isHome
          ? isProductos
            ? location.pathname === "/productos" &&
              currentCategory === link.category
            : location.pathname === link.to
          : false;

        const to = getNavTo(link);

        return (
          <Button
            key={link.label}
            as={Link}
            to={to}
            variant="unstyled"
            minW="auto"
            p={1}
            _hover={{
              opacity: 0.85,
              transform: "translateY(-1px)",
            }}
            transition="all 0.15s ease"
          >
            <Text
              fontSize="18px"
              fontWeight={isActive ? "bold" : "semibold"}
              color={textColor}
              whiteSpace="nowrap"
              transform={isActive ? "scale(1.08)" : "scale(1)"}
              transition="all 0.2s ease"
              textUnderlineOffset="5px"
              opacity={isActive ? 1 : 0.9}
            >
              {link.label}
            </Text>
          </Button>
        );
      })}
    </Flex>
  );
};
