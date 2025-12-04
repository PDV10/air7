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
import { useLayout } from "../hooks/useLayout";
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";

export const NAV_LINKS = [
  { label: "Ofertas", to: "/ofertas" },
  { label: "Deporte", to: "/deporte" },
  { label: "Moda", to: "/moda" },
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

  const textColor = useColorModeValue("#fe471e", "white");
  const placeholderColor = useColorModeValue("gray.900", "gray.300");
  const drawerBg = useColorModeValue("white", "gray.900");
  const headerColor = useColorModeValue("gray.900", "white");

  return (
    <>
      <IconButton
        aria-label="Abrir menú"
        icon={<HamburgerIcon boxSize={7} />}
        variant="ghost"
        display={{ base: "inline-flex", md: "none" }}
        color="#763324"
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
            <Text fontWeight="semibold">Menú</Text>
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
                  borderColor={useColorModeValue("#fe471e", "white")}
                  focusBorderColor="#763324"
                />
              </InputGroup>
            </Box>

            <VStack align="flex-start" spacing={4}>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.to;

                return (
                  <Box
                    key={link.to}
                    as={Link}
                    to={link.to}
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
  const { isHome, pathname } = useLayout();

  const textColor = isHome ? "white" : "gray.900";

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
      borderColor={isHome ? "#763324" : "#fe471e"}
      bg={isHome ? "rgba(109, 60, 49, 0.35)" : "rgba(250, 110, 79, 0.35)"}
      boxShadow="0 8px 24px rgba(48, 48, 48, 0.35)"
      w="50%"
      display={{ base: "none", md: "flex" }}
    >
      {NAV_LINKS.map((link) => {
        const isActive = !isHome && pathname === link.to;

        return (
          <Button
            key={link.to}
            as={Link}
            to={link.to}
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
