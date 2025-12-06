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
import { Link } from "react-router-dom";
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import { useNavbar } from "../hooks/useNavbar";
import React from "react";
import type { ProductCategory } from "../../productos/types/product";

export const NAV_LINKS: {
  label: string;
  to: string;
  category?: ProductCategory;
}[] = [
  {
    label: "Todos",
    to: "/productos",
  },
  {
    label: "Ofertas",
    to: "/productos",
    category: "ofertas" as ProductCategory,
  },
  {
    label: "Deporte",
    to: "/productos",
    category: "deporte" as ProductCategory,
  },
  {
    label: "Moda",
    to: "/productos",
    category: "moda" as ProductCategory,
  },
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
  const { getNavTo, isLinkActive, searchParams, setSearchParams, isHome } =
    useNavbar();

  const textColor = useColorModeValue("brand.500", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.300");
  const drawerBg = useColorModeValue("white", "gray.900");
  const headerColor = useColorModeValue("gray.900", "white");
  const inputBorderColor = useColorModeValue("brand.500", "white");

  const initialSearch = searchParams.get("search") ?? "";
  const [query, setQuery] = React.useState(initialSearch);

  const handleSearchChange = (value: string) => {
    setQuery(value);

    const params = new URLSearchParams(searchParams);
    const trimmed = value.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  return (
    <>
      <IconButton
        aria-label="Abrir menú"
        icon={<HamburgerIcon boxSize={7} />}
        variant="ghost"
        display={{ base: "inline-flex", md: "none" }}
        color="brand.500"
        size="lg"
        minW="48px"
        minH="48px"
        _hover={{
          bg: "transparent",
          opacity: 0.85,
          transform: "scale(1.05)",
        }}
        onClick={onOpen}
        position="absolute"
        top={5}
        right={5}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        blockScrollOnMount={false}
        preserveScrollBarGap
      >
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
            {!isHome && (
              <Box mb={6}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="black" />
                  </InputLeftElement>

                  <Input
                    placeholder="Buscar..."
                    borderRadius="full"
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                    borderColor={inputBorderColor}
                    focusBorderColor="brand.700"
                    value={query}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </InputGroup>
              </Box>
            )}

            <VStack align="flex-start" spacing={4}>
              {NAV_LINKS.map((link) => {
                const to = getNavTo(link);
                const isActive = isLinkActive(link);

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
  const { isHome, getNavTo, isLinkActive } = useNavbar();

  const textColor = isHome ? "white" : "gray.900";
  const borderColor = isHome ? "brand.700" : "brand.500";

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
        const to = getNavTo(link);
        const isActive = isLinkActive(link);

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
