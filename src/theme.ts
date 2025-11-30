import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      500: "#2b82cc"
    }
  }
});
