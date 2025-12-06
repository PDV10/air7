import type { Product } from "./types/product";

import img1 from "../../assets/zapatillas/MB-04-phoenix.webp";
import img2 from "../../assets/zapatillas/zapatilla-puma-2.webp";
import img3 from "../../assets/zapatillas/zapatilla-puma-3.webp";
import img4 from "../../assets/zapatillas/zapatilla-puma-4.webp";
import img5 from "../../assets/zapatillas/zapatillas-puma.webp";

export const ALL_PRODUCTS: Product[] = [
	// OFERTAS (10)
	{
		id: "1",
		name: "Nike Elevate Pro Oferta",
		price: 149999,
		category: "ofertas",
		brand: "Nike",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img1,
		description:
			"Lightweight performance shoe with responsive cushioning and a grippy sole, ideal for everyday play on indoor or outdoor courts.",
	},
	{
		id: "2",
		name: "Nike Court Drive Low",
		price: 139999,
		category: "ofertas",
		brand: "Nike",
		sizes: ["38", "39", "40", "41"],
		recommendedFor: "hombre",
		imageUrl: img2,
		description:
			"Low-profile design for quick cuts and explosive first steps, with a flexible upper that adapts to your foot.",
	},
	{
		id: "3",
		name: "Nike Bounce Street",
		price: 159999,
		category: "ofertas",
		brand: "Nike",
		sizes: ["40", "41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img3,
		description:
			"Street-inspired basketball sneaker featuring bouncy midsole foam and durable rubber for asphalt games.",
	},
	{
		id: "4",
		name: "Adidas Pro Bounce Oferta",
		price: 149999,
		category: "ofertas",
		brand: "Adidas",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img4,
		description:
			"Supportive high-cut silhouette with Pro Bounce cushioning that keeps you comfortable from tip-off to final buzzer.",
	},
	{
		id: "5",
		name: "Adidas Streetball Low",
		price: 139999,
		category: "ofertas",
		brand: "Adidas",
		sizes: ["38", "39", "40"],
		recommendedFor: "mujer",
		imageUrl: img5,
		description:
			"Lifestyle-ready sneaker with soft cushioning and a sleek low profile, perfect for both court play and city walks.",
	},
	{
		id: "6",
		name: "Adidas Triple Threat",
		price: 159999,
		category: "ofertas",
		brand: "Adidas",
		sizes: ["41", "42", "43", "44"],
		recommendedFor: "unisex",
		imageUrl: img1,
		description:
			"Built for scoring, rebounding and defending with a stable base and multidirectional traction pattern.",
	},
	{
		id: "7",
		name: "Puma Court Rider Oferta",
		price: 144999,
		category: "ofertas",
		brand: "Puma",
		sizes: ["39", "40", "41"],
		recommendedFor: "unisex",
		imageUrl: img2,
		description:
			"Dynamic court shoe with soft Rider foam for smooth landings and quick transitions from end to end.",
	},
	{
		id: "8",
		name: "Puma RS Bounce",
		price: 134999,
		category: "ofertas",
		brand: "Puma",
		sizes: ["38", "39", "40"],
		recommendedFor: "mujer",
		imageUrl: img3,
		description:
			"Retro-running inspired sneaker that combines RS cushioning with bold color blocking for everyday comfort.",
	},
	{
		id: "9",
		name: "Puma Skyline Mid",
		price: 154999,
		category: "ofertas",
		brand: "Puma",
		sizes: ["40", "41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img4,
		description:
			"Mid-cut profile for added ankle support with a padded collar and durable upper that stands up to daily wear.",
	},
	{
		id: "10",
		name: "Puma City Dunk",
		price: 149999,
		category: "ofertas",
		brand: "Puma",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img5,
		description:
			"Classic dunk-style silhouette with soft cushioning and a clean finish that works on the court and in the streets.",
	},

	// DEPORTE (10)
	{
		id: "11",
		name: "Nike Game Time Pro",
		price: 259999,
		category: "deporte",
		brand: "Nike",
		sizes: ["41", "42", "43", "44"],
		recommendedFor: "hombre",
		imageUrl: img1,
		description:
			"High-performance game shoe with responsive cushioning and a locked-in fit for players who live above the rim.",
	},
	{
		id: "12",
		name: "Nike Air Court Elite",
		price: 269999,
		category: "deporte",
		brand: "Nike",
		sizes: ["42", "43", "44", "45"],
		recommendedFor: "unisex",
		imageUrl: img2,
		description:
			"Dominate the court with Air cushioning for explosive jumps and a durable upper that supports sharp cuts.",
	},
	{
		id: "13",
		name: "Nike Fastbreak React",
		price: 249999,
		category: "deporte",
		brand: "Nike",
		sizes: ["40", "41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img3,
		description:
			"React foam midsole delivers a smooth, springy ride so you can push the pace on every fastbreak.",
	},
	{
		id: "14",
		name: "Adidas Court Control",
		price: 239999,
		category: "deporte",
		brand: "Adidas",
		sizes: ["40", "41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img4,
		description:
			"Engineered for stability with a supportive upper and grippy outsole that keeps you in control on quick changes of direction.",
	},
	{
		id: "15",
		name: "Adidas Elevate Mid",
		price: 229999,
		category: "deporte",
		brand: "Adidas",
		sizes: ["39", "40", "41"],
		recommendedFor: "mujer",
		imageUrl: img5,
		description:
			"Mid-cut design that blends cushioned comfort and light support, ideal for versatile players on both ends of the floor.",
	},
	{
		id: "16",
		name: "Adidas Bounce Arena",
		price: 259999,
		category: "deporte",
		brand: "Adidas",
		sizes: ["42", "43", "44", "45"],
		recommendedFor: "hombre",
		imageUrl: img1,
		description:
			"Bounce cushioning absorbs impact on hard landings while delivering the energy return you need to attack the basket.",
	},
	{
		id: "17",
		name: "Puma Skyline Pro",
		price: 249999,
		category: "deporte",
		brand: "Puma",
		sizes: ["41", "42", "43", "44"],
		recommendedFor: "unisex",
		imageUrl: img2,
		description:
			"Performance-driven sneaker with a sleek profile, responsive midsole and aggressive traction for indoor courts.",
	},
	{
		id: "18",
		name: "Puma Fast Court",
		price: 239999,
		category: "deporte",
		brand: "Puma",
		sizes: ["40", "41", "42"],
		recommendedFor: "mujer",
		imageUrl: img3,
		description:
			"Designed for speed with a lightweight upper and supportive midfoot that helps you stay quick on your feet.",
	},
	{
		id: "19",
		name: "Puma Triple Double",
		price: 269999,
		category: "deporte",
		brand: "Puma",
		sizes: ["42", "43", "44", "45"],
		recommendedFor: "hombre",
		imageUrl: img4,
		description:
			"Built to fill the stat sheet with plush cushioning, strong support and a durable outsole ready for heavy minutes.",
	},
	{
		id: "20",
		name: "Puma Court Impact",
		price: 259999,
		category: "deporte",
		brand: "Puma",
		sizes: ["41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img5,
		description:
			"Impact-ready padding around the heel and forefoot keeps every landing comfortable during intense games.",
	},

	// MODA (10)
	{
		id: "21",
		name: "Nike Streetball Icon",
		price: 219999,
		category: "moda",
		brand: "Nike",
		sizes: ["39", "40", "41", "42", "43"],
		recommendedFor: "unisex",
		imageUrl: img1,
		description:
			"Bold streetball look with retro details and soft cushioning, perfect for casual outfits with a hoops vibe.",
	},
	{
		id: "22",
		name: "Nike Urban Dunk Low",
		price: 209999,
		category: "moda",
		brand: "Nike",
		sizes: ["38", "39", "40", "41"],
		recommendedFor: "mujer",
		imageUrl: img2,
		description:
			"Clean low-top silhouette that pairs with everything, featuring a cushioned midsole for all-day city comfort.",
	},
	{
		id: "23",
		name: "Nike Barrio Court",
		price: 229999,
		category: "moda",
		brand: "Nike",
		sizes: ["41", "42", "43", "44"],
		recommendedFor: "hombre",
		imageUrl: img3,
		description:
			"Inspired by neighborhood courts, this model combines premium materials with a sturdy cupsole for everyday wear.",
	},
	{
		id: "24",
		name: "Adidas Triple Stripe",
		price: 219999,
		category: "moda",
		brand: "Adidas",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img4,
		description:
			"Signature three-stripe style with a smooth upper and cushioned insole, ideal for a sporty casual look.",
	},
	{
		id: "25",
		name: "Adidas Barrio Style",
		price: 209999,
		category: "moda",
		brand: "Adidas",
		sizes: ["38", "39", "40"],
		recommendedFor: "mujer",
		imageUrl: img5,
		description:
			"Street-ready sneaker with subtle details and a soft step-in feel, created to move comfortably around the city.",
	},
	{
		id: "26",
		name: "Adidas Court Lifestyle",
		price: 229999,
		category: "moda",
		brand: "Adidas",
		sizes: ["41", "42", "43", "44"],
		recommendedFor: "unisex",
		imageUrl: img1,
		description:
			"Court DNA reimagined for daily wear, with a minimalist design and plush cushioning for all-day lifestyle comfort.",
	},
	{
		id: "27",
		name: "Puma City Court",
		price: 219999,
		category: "moda",
		brand: "Puma",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img2,
		description:
			"Slim city sneaker that blends court heritage with modern lines, perfect for jeans, joggers or shorts.",
	},
	{
		id: "28",
		name: "Puma Street Glow",
		price: 209999,
		category: "moda",
		brand: "Puma",
		sizes: ["38", "39", "40"],
		recommendedFor: "mujer",
		imageUrl: img3,
		description:
			"Eye-catching colors and a sculpted sole give this model a bright, energetic look for your everyday outfits.",
	},
	{
		id: "29",
		name: "Puma Retro Court",
		price: 229999,
		category: "moda",
		brand: "Puma",
		sizes: ["41", "42", "43", "44", "45"],
		recommendedFor: "hombre",
		imageUrl: img4,
		description:
			"Vintage basketball aesthetic with modern comfort tech, combining a sturdy upper with a cushioned footbed.",
	},
	{
		id: "30",
		name: "Puma Urban Skyline",
		price: 219999,
		category: "moda",
		brand: "Puma",
		sizes: ["39", "40", "41", "42"],
		recommendedFor: "unisex",
		imageUrl: img5,
		description:
			"Designed for city life with a smooth ride and clean lines, inspired by night lights and urban skylines.",
	},
];
