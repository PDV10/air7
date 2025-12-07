import { Flex, Text, Image } from "@chakra-ui/react";
import img from "../../../assets/AIRSEVEN-FLYERS-07.webp";
import { Redes } from "../../common/Redes";
import useNosotros from "../hooks/useNosotros";

export const Nosotros = () => {
  const {
    sectionTextProps,
    sectionTitleProps,
    sectionWrapperProps,
    ABOUT_SECTIONS,
  } = useNosotros();

  return (
    <Flex
      as="section"
      minH={{ base: "auto", md: "100vh" }}
      w="100%"
      px={{ base: 4, md: 0, lg: 0 }}
      pl={{ base: 4, md: 10, lg: 28 }}
      pt={{ base: 24, md: 32 }}
      pb={{ base: 8, md: 10 }}
      flexDir={{ base: "column", md: "row" }}
      align="flex-start"
      gap={{ base: 8, md: 4 }}
    >
      <Flex
        flexDir="column"
        w={{ base: "100%", md: "60%" }}
        pr={{ base: 0, md: 10 }}
        gap={4}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap={4}
          mb={{ base: 4, md: 0 }}
        >
          <Text
            fontFamily="Zuume"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "5xl", lg: "6xl" }}
            color="gray.900"
            textTransform="uppercase"
            letterSpacing={{ base: "0.08em", md: "0.12em" }}
          >
            {"> "}
            Nosotros
          </Text>

          <Flex display={{ base: "none", md: "flex" }}>
            <Redes flexDir="row" />
          </Flex>
        </Flex>

        <Flex flex={1} flexDir="column" gap={{ base: 4, md: 6 }}>
          {ABOUT_SECTIONS.map((section) => (
            <Flex key={section.id} {...sectionWrapperProps}>
              <Text {...sectionTitleProps}>{section.title}</Text>

              {section.paragraphs.map((paragraph) => (
                <Text key={paragraph.id} {...sectionTextProps}>
                  {paragraph.text}
                </Text>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex
        w={{ base: "100%", md: "40%" }}
        display={{ base: "none", md: "block" }}
        justify="center"
        align="center"
      >
        <Image
          src={img}
          alt="Air 7even Store Imagen"
          objectFit="cover"
          w="100%"
          maxH={{ base: "260px", md: "100%" }}
          borderRadius={{ base: "lg", md: "none" }}
        />
      </Flex>
    </Flex>
  );
};
