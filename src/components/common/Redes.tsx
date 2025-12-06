import { Flex, Link, type FlexProps } from "@chakra-ui/react";
import { SvgIcon } from "./SvgIcon";
import { useMatch } from "react-router-dom";

type RedesProps = {
  flexDir?: FlexProps["flexDir"];
  w?: number;
  h?: number;
};

export const Redes = ({ flexDir = "column", w = 8, h = 8 }: RedesProps) => {
  const isProductDetail = useMatch("/productos/:productoId");

  if (isProductDetail) return null;
  const facebookHref = "#";
  const whatsappHref = "https://wa.me/5492284580546";
  const whatsappMessage =
    "Buenas, me gustaría recibir más información sobre las zapatillas. ¿Me pueden ayudar?";
  const instagramHref = "https://www.instagram.com/airseven.store/";

  const whatsappUrl = whatsappMessage
    ? `${whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`
    : whatsappHref;

  const linkHoverStyles = {
    opacity: 0.85,
    transform: "scale(1.05)",
  };

  const linkBaseStyles = {
    transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;

  return (
    <Flex flexDir={flexDir} gap={4}>
      <Link
        href={instagramHref}
        isExternal
        aria-label="Instagram"
        {...linkBaseStyles}
        _hover={linkHoverStyles}
      >
        <SvgIcon name="instagram-ico" w={w} h={h} />
      </Link>

      <Link
        href={facebookHref}
        isExternal
        aria-label="Facebook"
        {...linkBaseStyles}
        _hover={linkHoverStyles}
      >
        <SvgIcon name="facebook-ico" w={w} h={h} />
      </Link>

      <Link
        href={whatsappUrl}
        isExternal
        aria-label="WhatsApp"
        {...linkBaseStyles}
        _hover={linkHoverStyles}
      >
        <SvgIcon name="wsp-ico" w={w} h={h} />
      </Link>
    </Flex>
  );
};
