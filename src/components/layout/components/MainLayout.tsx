import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";

export const MainLayout = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="surface.primary"
    >
      <Header />

      <Box as="main" flex="1">
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};
