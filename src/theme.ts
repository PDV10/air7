import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,
	semanticTokens: {
		colors: {
			surface: {
				primary: {
					default: "white",
					_dark: "gray.900",
				},
			},
			border: {
				primary: {
					default: "gray.200",
					_dark: "gray.700",
				},
			},
			text: {
				brand: {
					default: "orange.500",
					_dark: "orange.300",
				},
			},
		},
	},
});
