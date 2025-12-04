import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeToggle, MobileMenu, NavBar } from "./Navbar";
import logoLight from "../../../assets/AIRSEVEN-logo-blanco.webp";
import logoDark from "../../../assets/AIRSEVEN-logo-negro.webp";
import { SearchPill } from "./SearchPill";
import { useLayout } from "../hooks/useLayout";

export const Header = () => {
  const { isHome } = useLayout();
  const logoSrc = isHome ? logoLight : logoDark;

  return (
    <Box
      as="header"
      position="absolute"
      top={0}
      left={0}
      w="100%"
      zIndex={100}
      px={{ base: 4, md: 8 }}
      py={{ base: 3, md: 4 }}
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        gap={4}
      >
        <Box as={Link} to="/" display="inline-flex" alignItems="center">
          <Image src={logoSrc} alt="Air7" h="60px" objectFit="contain" />
        </Box>

        <NavBar />

        <HStack spacing={3}>
          <Box display={{ base: "none", md: "block" }}>
            <SearchPill />
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            <ColorModeToggle />
          </Box>
          <MobileMenu />
        </HStack>
      </Flex>
    </Box>
  );
};
