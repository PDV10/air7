import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { SvgIcon } from "./SvgIcon";
import img from "../../assets/AIRSEVEN-FEED-IDEAS-06.webp";

const FEATURES = [
  { icon: "products", label: "PRODUCTOS ORIGINALES." },
  { icon: "calidadSeleccionada", label: "CALIDAD SELECCIONADA." },
  { icon: "asesoriamiento", label: "ASESORAMIENTO PERSONALIZADO." },
  { icon: "devolucion", label: "MÉTODO DE DEVOLUCIÓN SIMPLE." },
] as const;

export const PorqueElegirnos = () => {
  return (
    <Flex
      w="100%"
      flexDir={{ base: "column", md: "row" }}
      bgColor={{ base: "gray.900", md: "gray.300" }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        bg="rgba(0,0,0,0.35)"
        display={{ base: "block", md: "none" }}
        pointerEvents="none"
        zIndex={2}
      />

      <Flex
        w={{ base: "100%", md: "40%" }}
        maxH={{ base: "260px", md: "none" }}
        position="relative"
        zIndex={1}
      >
        <Image
          src={img}
          alt="Air 7even Store Imagen"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Flex>

      <Flex
        flexDir="column"
        w={{ base: "100%", md: "60%" }}
        alignItems={{ base: "flex-end", md: "flex-start" }}
        px={{ base: 4, md: 10, lg: 16 }}
        py={{ base: 6, md: 10, lg: 16 }}
        mt={{ base: -20, sm: -15, md: 0 }}
        position="relative"
        zIndex={3}
      >
        <Flex flexDir="column" gap={{ base: 4, md: 6 }} maxW="300px">
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            fontFamily="Zuume"
            letterSpacing="-1px"
            lineHeight="1.1"
            color={{ base: "white", md: "gray.900" }}
            textAlign={{ base: "right", md: "left" }}
          >
            &gt; ¿POR QUÉ ELEGIRNOS?
          </Heading>

          <Flex
            flexDir="column"
            alignItems="flex-start"
            gap={{ base: 3, md: 4, lg: 6 }}
          >
            {FEATURES.map((item) => (
              <Flex key={item.icon} align="center" gap={3}>
                <Flex
                  align="center"
                  justify="center"
                  w={{ base: 8, md: 10, lg: 12 }}
                  h={{ base: 8, md: 10, lg: 12 }}
                >
                  <SvgIcon
                    name={item.icon}
                    w={{ base: 8, md: 12, lg: 24 }}
                    h={{ base: 8, md: 12, lg: 24 }}
                  />
                </Flex>

                <Text
                  fontWeight="medium"
                  fontSize={{ base: "sm", sm: "md", md: "xl", lg: "2xl" }}
                  textTransform="uppercase"
                  fontFamily="Zuume"
                  color={{ base: "white", md: "gray.900" }}
                  textAlign="left"
                >
                  {item.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
