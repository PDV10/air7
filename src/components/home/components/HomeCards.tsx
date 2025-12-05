import { Flex, Heading, Image, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import flyer05 from "../../../assets/AIRSEVEN-FLYERS-05.jpg";
import flyer07 from "../../../assets/AIRSEVEN-FLYERS-07.jpg";
import flyer09 from "../../../assets/AIRSEVEN-FLYERS-09.jpg";

const CARDS = [
  { img: flyer05, label: "Ofertas", to: "/ofertas" },
  { img: flyer07, label: "Deporte", to: "/deporte" },
  { img: flyer09, label: "Moda", to: "/moda" },
];

export const HomeCards = () => {
  return (
    <Flex flexDir="column" gap={6} w="full">
      <Heading
        maxW="1200px"
        ml={12}
        fontSize={{ base: "4xl", md: "7xl" }}
        fontWeight="bold"
        fontFamily="Zuume"
        letterSpacing="-1px"
      >
        &gt; YOUR NEXT SNEAKERS ARE HERE
      </Heading>

      <Flex
        gap={{ base: 10, md: 24 }}
        w="full"
        justifyContent="center"
        flexWrap="wrap"
      >
        {CARDS.map((card) => (
          <Box
            key={card.to}
            as={Link}
            to={card.to}
            width="300px"
            h="350px"
            borderRadius="3xl"
            overflow="hidden"
            position="relative"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Image
              src={card.img}
              alt={card.label}
              objectFit="cover"
              w="100%"
              h="100%"
            />

            <Box
              position="absolute"
              bottom={0}
              left={0}
              w="100%"
              h="80px"
              bgGradient="linear(to-b, transparent, brand.500)"
              display="flex"
              alignItems="flex-end"
              pl={6}
              pb={3}
            >
              <Text
                fontFamily="Zuume"
                fontSize="3xl"
                fontWeight="medium"
                color="white"
                letterSpacing="-0.5px"
              >
                {card.label}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
