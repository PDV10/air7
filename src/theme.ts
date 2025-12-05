import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

export const theme = extendTheme({
	config,

	/* ================================
     FONTS
  ================================= */
	fonts: {
		heading: "Zuume, system-ui, sans-serif",
		body: "Inter, system-ui, sans-serif",
	},

	fontWeights: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
	},

	/* ================================
     PALETA DE COLORES
  ================================= */
	colors: {
		brand: {
			50: "#FFF5F0",
			100: "#FFE0D1",
			200: "#FFC0A3",
			300: "#FF9966",
			400: "#FF7138",
			500: "#FE471E",
			600: "#D83616",
			700: "#763324",
			800: "#6E1608",
			900: "#3A0A04",
		},

		gray: {
			50: "#F9F9F9",
			100: "#F2F2F2",
			200: "#E6E6E6",
			300: "#D8D8D8",
			400: "#B3B3B3",
			500: "#777777",
			600: "#555555",
			700: "#323232",
			800: "#151515",
			900: "#090909",
		},
	},

	/* ================================
     SEMANTIC TOKENS
  ================================= */
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
					default: "brand.500",
					_dark: "brand.300",
				},
			},
		},
	},

	/* ================================
     COMPONENTS BASE STYLES
  ================================= */
	components: {
		Text: {
			baseStyle: {
				fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
				color: "gray.800",
			},
		},
		Heading: {
			baseStyle: {
				fontFamily: `"Zumme", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
				color: "gray.900",
			},
		},
	},
});
