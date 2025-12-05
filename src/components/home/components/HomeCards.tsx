import { Flex, Heading } from "@chakra-ui/react";

import flyer05 from "../../../assets/AIRSEVEN-FLYERS-05.webp";
import flyer07 from "../../../assets/AIRSEVEN-FLYERS-07.webp";
import flyer09 from "../../../assets/AIRSEVEN-FLYERS-09.webp";
import { ProductCard } from "../../common/ProductCard";

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
          <ProductCard
            key={card.to}
            to={card.to}
            image={card.img}
            imageAlt={card.label}
            labelOverlay={card.label}
            cardHeight="350px"
            cardWidth="300px"
            objectFit="cover"
          />
        ))}
      </Flex>
    </Flex>
  );
};
