import {
  Image,
  type ImageProps,
  Tooltip,
  type TooltipProps,
} from "@chakra-ui/react";

const svgModules = import.meta.glob("../../assets/icons/*.svg", {
  eager: true,
  as: "url",
});

const ICON_MAP: Record<string, string> = {};

Object.entries(svgModules).forEach(([path, mod]) => {
  const fileName = path.split("/").pop() || "";
  const name = fileName.replace(".svg", "");
  ICON_MAP[name] = mod as string;
});

type SvgIconProps = Omit<ImageProps, "src" | "alt"> & {
  name: string;
  tooltipLabel?: string;
  tooltipProps?: TooltipProps;
};

export const SvgIcon = ({
  name,
  w = 4,
  h = 4,
  tooltipLabel,
  tooltipProps,
  ...rest
}: SvgIconProps) => {
  const src = ICON_MAP[name];

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(`SvgIcon: icon "${name}" not found in /assets/icons`);
    }
    return null;
  }

  const image = (
    <Image src={src} alt={name} w={w} h={h} display="inline-block" {...rest} />
  );

  if (!tooltipLabel) {
    return image;
  }

  return (
    <Tooltip
      label={tooltipLabel}
      hasArrow
      bg="gray.200"
      color="black"
      borderRadius="xl"
      px={3}
      py={2}
      fontSize="xs"
      placement="bottom-start"
      {...tooltipProps}
    >
      {image}
    </Tooltip>
  );
};
