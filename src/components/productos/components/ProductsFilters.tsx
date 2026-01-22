import {
	Box,
	Heading,
	Text,
	Checkbox,
	CheckboxGroup,
	Stack,
	Divider,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Button,
	Flex,
	Badge,
	useBreakpointValue,
	Collapse,
} from "@chakra-ui/react";
import { useProductsFilters } from "../hooks/useProductsFilters";
import { SvgIcon } from "../../common/SvgIcon";
import { useDisclosure } from "@chakra-ui/react";

const GENDER_OPTIONS = [
	{ value: "hombre", label: "Hombre" },
	{ value: "mujer", label: "Mujer" },
	{ value: "unisex", label: "Unisex" },
];

const checkboxStyles = {
	"&:hover .chakra-checkbox__control": {
		borderColor: "white",
	},
	"&[data-checked] .chakra-checkbox__control": {
		bg: "brand.500",
		borderColor: "brand.500",
		color: "white",
	},
	"&[data-checked]:hover .chakra-checkbox__control": {
		bg: "transparent",
		borderColor: "brand.500",
		color: "white",
	},
};

export const ProductsFilters = () => {
	const {
		titleLabel,
		selectedBrands,
		handleBrandChange,
		selectedSizes,
		handleSizeChange,
		selectedRecommendedFor,
		handleRecommendedForChange,
		handleClearFilters,
		hasActiveFilters,
		checkBoxColorScheme,
		totalProducts,
		brandOptions,
		sizeOptions,
	} = useProductsFilters();

	const isMobile = useBreakpointValue({ base: true, md: false });
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

	const filtersContent = (
		<>
			<Divider mb={4} borderColor="gray.400" />

			<Accordion allowMultiple>
				<AccordionItem border="none">
					<Box py={2} borderBottomWidth="1px" borderColor="gray.400">
						<AccordionButton px={0} _hover={{ bg: "transparent" }}>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg" }}
							>
								Marcas
							</Box>
							<AccordionIcon />
						</AccordionButton>

						<AccordionPanel px={0} pt={2} pb={3}>
							<Box maxW="fit-content" pl={2}>
								<CheckboxGroup
									colorScheme={checkBoxColorScheme}
									value={selectedBrands}
									onChange={(values) => handleBrandChange(values as string[])}
								>
									<Stack direction="column" spacing={1}>
										{brandOptions.map((brand) => (
											<Checkbox
												key={brand}
												value={brand}
												size="md"
												sx={checkboxStyles}
											>
												{brand}
											</Checkbox>
										))}
									</Stack>
								</CheckboxGroup>
							</Box>
						</AccordionPanel>
					</Box>
				</AccordionItem>

				<AccordionItem border="none">
					<Box py={2} borderBottomWidth="1px" borderColor="gray.400">
						<AccordionButton px={0} _hover={{ bg: "transparent" }}>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg" }}
							>
								Talles
							</Box>
							<AccordionIcon />
						</AccordionButton>

						<AccordionPanel px={0} pt={2} pb={3}>
							<Box maxW="fit-content" pl={2}>
								<CheckboxGroup
									colorScheme={checkBoxColorScheme}
									value={selectedSizes}
									onChange={(values) => handleSizeChange(values as string[])}
								>
									<Stack direction="column" spacing={1}>
										{sizeOptions.map((size) => (
											<Checkbox
												key={size}
												value={size}
												size="md"
												sx={checkboxStyles}
											>
												{size}
											</Checkbox>
										))}
									</Stack>
								</CheckboxGroup>
							</Box>
						</AccordionPanel>
					</Box>
				</AccordionItem>

				<AccordionItem border="none">
					<Box py={2}>
						<AccordionButton px={0} _hover={{ bg: "transparent" }}>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg" }}
							>
								Género
							</Box>
							<AccordionIcon />
						</AccordionButton>

						<AccordionPanel px={0} pt={2} pb={3}>
							<Box maxW="fit-content" pl={2}>
								<CheckboxGroup
									colorScheme={checkBoxColorScheme}
									value={selectedRecommendedFor}
									onChange={(values) =>
										handleRecommendedForChange(values as string[])
									}
								>
									<Stack direction="column" spacing={1}>
										{GENDER_OPTIONS.map((option) => (
											<Checkbox
												key={option.value}
												value={option.value}
												color="black"
												size="md"
												sx={checkboxStyles}
											>
												{option.label}
											</Checkbox>
										))}
									</Stack>
								</CheckboxGroup>
							</Box>
						</AccordionPanel>
					</Box>
				</AccordionItem>
			</Accordion>

			<Flex align="center" gap={2} mt={4} pl={2}>
				<Badge
					borderRadius="full"
					px={2}
					colorScheme="brand"
					fontSize="10px"
					fontWeight="bold"
					textTransform="none"
				>
					{totalProducts}
				</Badge>
				<Text fontSize="sm" color="gray.600">
					producto{totalProducts !== 1 ? "s" : ""} encontrados
				</Text>
			</Flex>
		</>
	);

	// MOBILE VERSION
	if (isMobile) {
		return (
			<Box w="90%">
				<Flex align="center" justify="space-between" mb={2}>
					<Heading size="md" fontFamily="zuume" fontWeight="bold" fontSize="lg">
						&gt; {titleLabel}
					</Heading>

					<Flex align="center" gap={2}>
						{hasActiveFilters && (
							<Button
								variant="ghost"
								size="xs"
								color="gray.500"
								_hover={{
									color: "brand.500",
									bg: "transparent",
									textDecoration: "underline",
									transform: "scale(1.05)",
								}}
								onClick={handleClearFilters}
							>
								<SvgIcon
									name="cleanIcon"
									w={6}
									h={6}
									tooltipLabel="Reset Filters"
								/>
							</Button>
						)}
						<Button
							size="sm"
							borderRadius="full"
							variant="outline"
							borderColor="brand.500"
							onClick={onToggle}
						>
							{isOpen ? "Ocultar filtros" : "Mostrar filtros"}
						</Button>
					</Flex>
				</Flex>

				<Collapse in={isOpen} animateOpacity>
					{filtersContent}
				</Collapse>
			</Box>
		);
	}

	// DESKTOP VERSION (sidebar)
	return (
		<Box
			w={{ base: "100%", md: "240px" }}
			pr={{ base: 0, md: 4 }}
			mb={{ base: 8, md: 0 }}
		>
			<Heading
				size="xl"
				fontFamily="zuume"
				fontWeight="bold"
				mb={6}
				fontSize={{ base: "2xl", md: "3xl" }}
			>
				&gt; {titleLabel}
			</Heading>

			<Flex align="center" justify="space-between" mb={2}>
				<Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
					Filtros
				</Text>
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="xs"
						color="gray.500"
						_hover={{
							color: "brand.500",
							bg: "transparent",
							textDecoration: "underline",
							transform: "scale(1.05)",
						}}
						onClick={handleClearFilters}
					>
						<SvgIcon
							name="cleanIcon"
							w={8}
							h={8}
							tooltipLabel="Reset Filters"
						/>
					</Button>
				)}
			</Flex>

			{filtersContent}
		</Box>
	);
};
