// src/components/home/Home.tsx
import { Box, Heading, Text } from "@chakra-ui/react";
import { MainContainer } from "../../layout/components/MainContainer";

export const Home = () => {
  return (
    <Box w="100%">
      {/* HERO VIDEO FULL WIDTH */}
      <Box
        position="relative"
        w="100%"
        h={{ base: "60vh", md: "80vh" }}
        overflow="hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/air7-home-loop.mp4" type="video/mp4" />
        </video>
      </Box>

      <MainContainer>
        <Heading size="lg" mb={2}>
          Bienvenido a Air7
        </Heading>
        <Text>Tu tienda de zapatillas.</Text>
      </MainContainer>
    </Box>
  );
};
