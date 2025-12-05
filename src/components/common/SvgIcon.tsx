import { Image, type ImageProps } from "@chakra-ui/react";

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
};

export const SvgIcon = ({ name, w = 4, h = 4, ...rest }: SvgIconProps) => {
  const src = ICON_MAP[name];

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(`SvgIcon: icon "${name}" not found in /assets/icons`);
    }
    return null;
  }

  return (
    <Image src={src} alt={name} w={w} h={h} display="inline-block" {...rest} />
  );
};
