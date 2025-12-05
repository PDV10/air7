import { Box, Flex } from "@chakra-ui/react";
import { MainContainer } from "../../layout/components/MainContainer";
import { HomeCards } from "./HomeCards";
import { HomeDestacados } from "./HomeDestacados";

export const Home = () => {
  return (
    <Box w="100%" bgColor="gray.300">
      {/* HERO VIDEO FULL WIDTH */}
      <Box
        position="relative"
        w={{ base: "100%" }}
        h={{ base: "75vh", md: "85vh" }}
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
        <Flex flexDir="column" gap={20}>
          <HomeCards />
          <HomeDestacados />
        </Flex>
      </MainContainer>
    </Box>
  );
};
