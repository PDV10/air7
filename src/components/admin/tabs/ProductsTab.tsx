import { useState, useMemo } from "react";
import {
	Box,
	Button,
	Flex,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	IconButton,
	Tooltip,
	Spinner,
	Text,
	Badge,
	useDisclosure,
	useToast,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Checkbox,
	CheckboxGroup,
	Stack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Divider,
	Heading,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../../services/publicApi";
import { deleteProduct } from "../../../services/adminApi";
import { ProductModal } from "../modals/ProductModal";
import { ConfirmModal } from "../../common/ConfirmModal";
import type { Product } from "../../../api/types";
import { parsePrice } from "../../../hooks";

const DEFAULT_IMG = "/img/defaultProductImg.webp";

const checkboxStyles = {
	"& .chakra-checkbox__control": {
		borderColor: "gray.400",
	},
	"&:hover .chakra-checkbox__control": {
		borderColor: "brand.400",
	},
	"&[data-checked] .chakra-checkbox__control": {
		bg: "brand.500",
		borderColor: "brand.500",
		color: "white",
	},
};

export const ProductsTab = () => {
	const toast = useToast();
	const queryClient = useQueryClient();

	const {
		isOpen: isProductModalOpen,
		onOpen: onProductModalOpen,
		onClose: onProductModalClose,
	} = useDisclosure();
	const {
		isOpen: isConfirmOpen,
		onOpen: onConfirmOpen,
		onClose: onConfirmClose,
	} = useDisclosure();

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	// Filtros
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [selectedOffer, setSelectedOffer] = useState<string[]>([]);

	const {
		data: products = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["admin-products"],
		queryFn: fetchProducts,
	});

	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: fetchCategories,
	});

	// Obtener marcas únicas
	const uniqueBrands = useMemo(() => {
		const brands = products.map((p) => p.brand).filter((b): b is string => !!b);
		return [...new Set(brands)].sort();
	}, [products]);

	// Filtrar productos
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			// Buscar por nombre
			if (
				searchTerm &&
				!product.name.toLowerCase().includes(searchTerm.toLowerCase())
			) {
				return false;
			}
			// Filtrar por categoría
			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(product.categoryId?.toString() || "")
			) {
				return false;
			}
			// Filtrar por marca
			if (
				selectedBrands.length > 0 &&
				!selectedBrands.includes(product.brand || "")
			) {
				return false;
			}
			// Filtrar por oferta
			if (selectedOffer.length > 0) {
				if (selectedOffer.includes("yes") && !product.isOnSale) return false;
				if (selectedOffer.includes("no") && product.isOnSale) return false;
			}
			return true;
		});
	}, [products, searchTerm, selectedCategories, selectedBrands, selectedOffer]);

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategories([]);
		setSelectedBrands([]);
		setSelectedOffer([]);
	};

	const hasActiveFilters =
		searchTerm ||
		selectedCategories.length > 0 ||
		selectedBrands.length > 0 ||
		selectedOffer.length > 0;

	const handleCreate = () => {
		setSelectedProduct(null);
		onProductModalOpen();
	};

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		onProductModalOpen();
	};

	const handleDeleteClick = (product: Product) => {
		setProductToDelete(product);
		onConfirmOpen();
	};

	const handleDeleteConfirm = async () => {
		if (!productToDelete) return;

		setIsDeleting(true);
		try {
			await deleteProduct(productToDelete.id);
			queryClient.invalidateQueries({ queryKey: ["admin-products"] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast({
				title: "Producto eliminado",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onConfirmClose();
		} catch (error) {
			toast({
				title: "Error al eliminar",
				description:
					error instanceof Error ? error.message : "Error desconocido",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsDeleting(false);
			setProductToDelete(null);
		}
	};

	const handleModalSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ["admin-products"] });
		queryClient.invalidateQueries({ queryKey: ["products"] });
		onProductModalClose();
	};

	if (isLoading) {
		return (
			<Flex justify="center" align="center" py={16}>
				<Spinner size="xl" color="brand.500" thickness="4px" />
			</Flex>
		);
	}

	if (isError) {
		return (
			<Flex direction="column" align="center" py={16} gap={4}>
				<Text color="red.500" fontWeight="bold">
					Error al cargar productos
				</Text>
				<Button
					onClick={() =>
						queryClient.invalidateQueries({ queryKey: ["admin-products"] })
					}
				>
					Reintentar
				</Button>
			</Flex>
		);
	}

	// Sidebar de filtros
	const filtersSidebar = (
		<Box
			w="240px"
			flexShrink={0}
			pr={6}
			borderRight="1px solid"
			borderColor="gray.200"
		>
			<Heading size="md" fontWeight="bold" mb={4}>
				Filtros
			</Heading>

			{/* Buscador */}
			<InputGroup mb={4}>
				<InputLeftElement pointerEvents="none">
					<SearchIcon color="gray.400" />
				</InputLeftElement>
				<Input
					placeholder="Buscar..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					bg="white"
					borderRadius="lg"
					borderColor="gray.300"
					size="sm"
					_hover={{ borderColor: "brand.400" }}
					_focus={{
						borderColor: "brand.500",
						boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
					}}
				/>
			</InputGroup>

			{hasActiveFilters && (
				<Button
					variant="link"
					size="sm"
					colorScheme="brand"
					mb={4}
					onClick={clearFilters}
				>
					Limpiar filtros
				</Button>
			)}

			<Divider mb={4} borderColor="gray.300" />

			<Accordion allowMultiple defaultIndex={[0, 1, 2]}>
				{/* Categorías */}
				<AccordionItem border="none">
					<AccordionButton px={0} py={2} _hover={{ bg: "transparent" }}>
						<Box flex="1" textAlign="left" fontWeight="semibold" fontSize="sm">
							Categoría
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel px={0} pt={1} pb={3}>
						<CheckboxGroup
							colorScheme="brand"
							value={selectedCategories}
							onChange={(values) => setSelectedCategories(values as string[])}
						>
							<Stack spacing={1}>
								{categories.map((cat) => (
									<Checkbox
										key={cat.id}
										value={cat.id.toString()}
										size="sm"
										sx={checkboxStyles}
									>
										{cat.name}
									</Checkbox>
								))}
							</Stack>
						</CheckboxGroup>
					</AccordionPanel>
				</AccordionItem>

				{/* Marcas */}
				{uniqueBrands.length > 0 && (
					<AccordionItem border="none">
						<AccordionButton px={0} py={2} _hover={{ bg: "transparent" }}>
							<Box
								flex="1"
								textAlign="left"
								fontWeight="semibold"
								fontSize="sm"
							>
								Marca
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel px={0} pt={1} pb={3}>
							<CheckboxGroup
								colorScheme="brand"
								value={selectedBrands}
								onChange={(values) => setSelectedBrands(values as string[])}
							>
								<Stack spacing={1}>
									{uniqueBrands.map((brand) => (
										<Checkbox
											key={brand}
											value={brand}
											size="sm"
											sx={checkboxStyles}
										>
											{brand}
										</Checkbox>
									))}
								</Stack>
							</CheckboxGroup>
						</AccordionPanel>
					</AccordionItem>
				)}

				{/* Oferta */}
				<AccordionItem border="none">
					<AccordionButton px={0} py={2} _hover={{ bg: "transparent" }}>
						<Box flex="1" textAlign="left" fontWeight="semibold" fontSize="sm">
							Estado
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel px={0} pt={1} pb={3}>
						<CheckboxGroup
							colorScheme="brand"
							value={selectedOffer}
							onChange={(values) => setSelectedOffer(values as string[])}
						>
							<Stack spacing={1}>
								<Checkbox value="yes" size="sm" sx={checkboxStyles}>
									En oferta
								</Checkbox>
								<Checkbox value="no" size="sm" sx={checkboxStyles}>
									Sin oferta
								</Checkbox>
							</Stack>
						</CheckboxGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>

			{/* Contador */}
			<Flex
				align="center"
				gap={2}
				mt={4}
				pt={4}
				borderTop="1px solid"
				borderColor="gray.200"
			>
				<Badge borderRadius="full" px={2} colorScheme="brand" fontSize="xs">
					{filteredProducts.length}
				</Badge>
				<Text fontSize="xs" color="gray.600">
					de {products.length} productos
				</Text>
			</Flex>
		</Box>
	);

	return (
		<Flex gap={6}>
			{/* Sidebar de filtros */}
			{filtersSidebar}

			{/* Contenido principal */}
			<Box flex="1">
				{/* Header con botón crear */}
				<Flex justify="space-between" align="center" mb={4}>
					<Text fontSize="lg" fontWeight="semibold" color="gray.700">
						{hasActiveFilters
							? `Mostrando ${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""}`
							: `${products.length} producto${products.length !== 1 ? "s" : ""} en total`}
					</Text>
					<Button
						leftIcon={<AddIcon />}
						colorScheme="brand"
						borderRadius="full"
						size="sm"
						onClick={handleCreate}
					>
						Crear producto
					</Button>
				</Flex>

				{/* Mensaje si no hay productos */}
				{products.length === 0 ? (
					<Flex
						direction="column"
						align="center"
						py={16}
						gap={4}
						bg="gray.50"
						borderRadius="xl"
						border="1px dashed"
						borderColor="gray.300"
					>
						<Text color="gray.500" fontSize="lg">
							No hay productos cargados
						</Text>
						<Button
							leftIcon={<AddIcon />}
							colorScheme="brand"
							borderRadius="full"
							onClick={handleCreate}
						>
							Crear producto
						</Button>
					</Flex>
				) : filteredProducts.length === 0 ? (
					<Flex
						direction="column"
						align="center"
						py={12}
						gap={3}
						bg="gray.50"
						borderRadius="xl"
						border="1px dashed"
						borderColor="gray.300"
					>
						<Text color="gray.500" fontSize="lg">
							No se encontraron productos
						</Text>
						<Button variant="link" colorScheme="brand" onClick={clearFilters}>
							Limpiar filtros
						</Button>
					</Flex>
				) : (
					<TableContainer
						border="1px solid"
						borderColor="gray.200"
						borderRadius="xl"
						boxShadow="sm"
						bg="white"
					>
						<Table variant="simple" size="sm">
							<Thead bg="gray.50">
								<Tr>
									<Th>Imagen</Th>
									<Th>Nombre</Th>
									<Th>Categoría</Th>
									<Th>Marca</Th>
									<Th isNumeric>Precio</Th>
									<Th isNumeric>Stock</Th>
									<Th>Oferta</Th>
									<Th>Acciones</Th>
								</Tr>
							</Thead>
							<Tbody>
								{filteredProducts.map((product) => (
									<Tr
										key={product.id}
										_hover={{ bg: "gray.50", cursor: "pointer" }}
										onClick={() => handleEdit(product)}
										transition="background 0.15s"
									>
										<Td>
											<Image
												src={product.imageUrl || DEFAULT_IMG}
												alt={product.name}
												boxSize="40px"
												objectFit="cover"
												borderRadius="md"
											/>
										</Td>
										<Td fontWeight="medium" maxW="200px" isTruncated>
											{product.name}
										</Td>
										<Td color="gray.600">{product.category?.name || "-"}</Td>
										<Td color="gray.600">{product.brand || "-"}</Td>
										<Td isNumeric fontWeight="semibold">
											${parsePrice(product.price).toLocaleString("es-AR")}
											{product.isOnSale && product.salePrice && (
												<Text as="span" color="green.500" fontSize="xs" ml={1}>
													($
													{parsePrice(product.salePrice).toLocaleString(
														"es-AR",
													)}
													)
												</Text>
											)}
										</Td>
										<Td isNumeric>
											<Badge
												colorScheme={product.stock > 0 ? "green" : "red"}
												borderRadius="full"
												px={2}
											>
												{product.stock}
											</Badge>
										</Td>
										<Td>
											{product.isOnSale ? (
												<Badge colorScheme="orange" borderRadius="full">
													Sí
												</Badge>
											) : (
												<Text color="gray.400">No</Text>
											)}
										</Td>
										<Td onClick={(e) => e.stopPropagation()}>
											<Flex gap={2}>
												<Tooltip label="Editar">
													<IconButton
														aria-label="Editar producto"
														icon={<EditIcon />}
														size="sm"
														variant="ghost"
														colorScheme="blue"
														onClick={() => handleEdit(product)}
													/>
												</Tooltip>
												<Tooltip label="Eliminar">
													<IconButton
														aria-label="Eliminar producto"
														icon={<DeleteIcon />}
														size="sm"
														variant="ghost"
														colorScheme="red"
														onClick={() => handleDeleteClick(product)}
													/>
												</Tooltip>
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				)}
			</Box>

			{/* Product Modal */}
			<ProductModal
				isOpen={isProductModalOpen}
				onClose={onProductModalClose}
				product={selectedProduct}
				onSuccess={handleModalSuccess}
			/>

			{/* Confirm Delete Modal */}
			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
				onConfirm={handleDeleteConfirm}
				title="Eliminar producto"
				message={`¿Estás seguro de que querés eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
				confirmText="Eliminar"
				isLoading={isDeleting}
			/>
		</Flex>
	);
};
