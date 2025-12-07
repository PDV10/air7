export default function useNosotros() {
  const ABOUT_SECTIONS = [
    {
      id: "history",
      title: "NUESTRA HISTORIA",
      paragraphs: [
        {
          id: "history-1",
          text: "Nacimos en diciembre de 2024, casi por boca en boca. Desde ese momento conectamos con gente que busca no solo un calzado, sino un estilo y una actitud. En marzo lanzamos nuestra web para estar más cerca que nunca de vos.",
        },
      ],
    },
    {
      id: "name",
      title: "EL SIGNIFICADO DE NUESTRO NOMBRE",
      paragraphs: [
        {
          id: "name-1",
          text: "“Air” es homenaje al mítico Air Jordan. El “Seven” viene del número que representa a Tomás, nuestro fundador, en la cancha de básquet. Esa combinación refleja nuestra pasión por el basket, el diseño y los códigos urbanos.",
        },
      ],
    },
    {
      id: "what-we-do",
      title: "LO QUE HACEMOS",
      paragraphs: [
        {
          id: "what-we-do-1",
          text: "Curamos zapatillas de moda y básquet con ojo profesional: originales y de calidad premium. Cada par que ves en nuestras redes y en la web fue seleccionado pensando en estilo, performance y autenticidad.",
        },
      ],
    },
    {
      id: "mission",
      title: "NUESTRA MISIÓN",
      paragraphs: [
        {
          id: "mission-1",
          text: "Queremos que cada pisada cuente. Que encuentres el par que hable por vos. Traemos diseños urbanos y deportivos para quienes caminan con actitud, desde la pista hasta la calle.",
        },
        {
          id: "mission-2",
          text: "Apuntamos a ser la tienda de zapatillas de referencia en Argentina: una marca con presencia online, respaldo real y comunidad auténtica.",
        },
      ],
    },
  ];

  const sectionWrapperProps = {
    flexDir: "column" as const,
    gap: 2,
    maxW: { base: "100%", md: "80%" },
    alignItems: "flex-start" as const,
  };

  const sectionTitleProps = {
    fontWeight: "bold" as const,
    fontSize: { base: "md", md: "xl", lg: "2xl" },
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  };

  const sectionTextProps = {
    fontWeight: "semibold" as const,
    fontSize: { base: "sm", md: "md", lg: "lg" },
    pl: { base: 0, md: 1 },
    lineHeight: { base: "1.7", md: "1.8" },
    color: "gray.700",
    textAlign: { base: "justify", md: "left" } as const,
  };

  return {
    sectionTextProps,
    sectionTitleProps,
    sectionWrapperProps,
    ABOUT_SECTIONS,
  };
}
