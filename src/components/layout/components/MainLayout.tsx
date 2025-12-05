import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";
import { PorqueElegirnos } from "../../common/PorqueElegirnos";
import { TopHeader } from "../../common/TopHeader";
import { Redes } from "../../common/Redes";

export const MainLayout = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="surface.primary"
    >
      <TopHeader />
      <Header />
      <Box as="main" flex="1">
        <Flex
          zIndex={100}
          position="absolute"
          top={{ base: 32, md: "160px" }}
          right={{ base: 6, md: "86px" }}
        >
          <Redes />
        </Flex>
        <Outlet />
        <PorqueElegirnos />
      </Box>
      <Footer />
    </Box>
  );
};
