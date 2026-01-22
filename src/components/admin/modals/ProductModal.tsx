import { useState, useEffect } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Select,
	Switch,
	useToast,
	VStack,
	SimpleGrid,
	FormHelperText,
	Box,
	Text,
	Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../services/publicApi";
import {
	createProduct,
	updateProduct,
	updateProductWithImage,
} from "../../../services/adminApi";
import type { Product } from "../../../api/types";
import { parsePrice } from "../../../hooks";

interface ProductModalProps {
	isOpen: boolean;
	onClose: () => void;
	product: Product | null;
	onSuccess: () => void;
}

interface FormData {
	name: string;
	description: string;
	price: string;
	stock: string;
	brand: string;
	categoryId: string;
	gender: string;
	sizes: string;
	isOnSale: boolean;
	salePrice: string;
	image: File | null;
}

const initialFormData: FormData = {
	name: "",
	description: "",
	price: "",
	stock: "0",
	brand: "",
	categoryId: "",
	gender: "",
	sizes: "",
	isOnSale: false,
	salePrice: "",
	image: null,
};

export const ProductModal = ({
	isOpen,
	onClose,
	product,
	onSuccess,
}: ProductModalProps) => {
	const toast = useToast();
	const isEditing = !!product;

	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: categories = [] } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: fetchCategories,
	});

	useEffect(() => {
		if (isOpen) {
			if (product) {
				setFormData({
					name: product.name,
					description: product.description || "",
					price: parsePrice(product.price).toString(),
					stock: product.stock.toString(),
					brand: product.brand || "",
					categoryId: product.categoryId?.toString() || "",
					gender: product.gender || "",
					sizes: product.sizes?.join(",") || "",
					isOnSale: product.isOnSale,
					salePrice: product.salePrice
						? parsePrice(product.salePrice).toString()
						: "",
					image: null,
				});
			} else {
				setFormData(initialFormData);
			}
		}
	}, [product, isOpen]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({ ...prev, [name]: checked }));
	};

	const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
	const ALLOWED_EXTENSIONS = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/webp",
	];

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		if (file) {
			// Validar extensión
			if (!ALLOWED_EXTENSIONS.includes(file.type)) {
				toast({
					title: "Formato no permitido",
					description: "Solo se permiten archivos JPG, PNG o WebP",
					status: "error",
					duration: 4000,
					isClosable: true,
				});
				e.target.value = "";
				return;
			}

			// Validar tamaño
			if (file.size > MAX_FILE_SIZE) {
				toast({
					title: "Archivo muy grande",
					description: "El tamaño máximo permitido es 2MB",
					status: "error",
					duration: 4000,
					isClosable: true,
				});
				e.target.value = "";
				return;
			}
		}

		setFormData((prev) => ({ ...prev, image: file }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name.trim()) {
			toast({
				title: "Error",
				description: "El nombre es obligatorio",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (!formData.price || Number.parseFloat(formData.price) <= 0) {
			toast({
				title: "Error",
				description: "El precio debe ser mayor a 0",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const sizesArray = formData.sizes
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s.length > 0);

			if (isEditing && product) {
				// Si hay imagen nueva, usar FormData
				if (formData.image) {
					const formDataToSend = new FormData();
					formDataToSend.append("name", formData.name.trim());
					if (formData.description.trim()) {
						formDataToSend.append("description", formData.description.trim());
					}
					formDataToSend.append("price", formData.price);
					formDataToSend.append("stock", formData.stock || "0");
					if (formData.brand.trim()) {
						formDataToSend.append("brand", formData.brand.trim());
					}
					if (formData.categoryId) {
						formDataToSend.append("categoryId", formData.categoryId);
					}
					if (formData.gender) {
						formDataToSend.append("gender", formData.gender);
					}
					if (sizesArray.length > 0) {
						formDataToSend.append("sizes", JSON.stringify(sizesArray));
					}
					formDataToSend.append("isOnSale", formData.isOnSale.toString());
					if (formData.isOnSale && formData.salePrice) {
						formDataToSend.append("salePrice", formData.salePrice);
					}
					formDataToSend.append("image", formData.image);

					await updateProductWithImage(product.id, formDataToSend);
				} else {
					// Sin imagen, usar JSON
					const updateData = {
						name: formData.name.trim(),
						description: formData.description.trim() || undefined,
						price: Number.parseFloat(formData.price),
						stock: Number.parseInt(formData.stock, 10) || 0,
						brand: formData.brand.trim() || undefined,
						categoryId: formData.categoryId
							? Number.parseInt(formData.categoryId, 10)
							: null,
						gender: formData.gender || undefined,
						sizes: sizesArray,
						isOnSale: formData.isOnSale,
						salePrice:
							formData.isOnSale && formData.salePrice
								? Number.parseFloat(formData.salePrice)
								: null,
					};

					await updateProduct(product.id, updateData);
				}

				toast({
					title: "Producto actualizado",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				// Create (FormData para subir imagen)
				const formDataToSend = new FormData();
				formDataToSend.append("name", formData.name.trim());
				if (formData.description.trim()) {
					formDataToSend.append("description", formData.description.trim());
				}
				formDataToSend.append("price", formData.price);
				formDataToSend.append("stock", formData.stock || "0");
				if (formData.brand.trim()) {
					formDataToSend.append("brand", formData.brand.trim());
				}
				if (formData.categoryId) {
					formDataToSend.append("categoryId", formData.categoryId);
				}
				if (formData.gender) {
					formDataToSend.append("gender", formData.gender);
				}
				if (sizesArray.length > 0) {
					formDataToSend.append("sizes", JSON.stringify(sizesArray));
				}
				formDataToSend.append("isOnSale", formData.isOnSale.toString());
				if (formData.isOnSale && formData.salePrice) {
					formDataToSend.append("salePrice", formData.salePrice);
				}
				if (formData.image) {
					formDataToSend.append("image", formData.image);
				}

				await createProduct(formDataToSend);
				toast({
					title: "Producto creado",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}

			onSuccess();
		} catch (error) {
			toast({
				title: "Error",
				description:
					error instanceof Error ? error.message : "Error desconocido",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="xl"
			scrollBehavior="inside"
			isCentered
		>
			<ModalOverlay bg="blackAlpha.600" />
			<ModalContent mx={4} borderRadius="xl" maxH="85vh">
				<ModalHeader fontWeight="bold">
					{isEditing ? "Editar producto" : "Crear producto"}
				</ModalHeader>
				<ModalCloseButton />

				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						flex: 1,
					}}
				>
					<ModalBody overflowY="auto" pb={4}>
						<VStack spacing={4}>
							{/* Nombre */}
							<FormControl isRequired>
								<FormLabel fontWeight="semibold">Nombre</FormLabel>
								<Input
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Ej: Nike Air Max 90"
									borderRadius="xl"
									borderColor="gray.300"
									_hover={{ borderColor: "brand.400" }}
									_focus={{
										borderColor: "brand.500",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
									}}
								/>
							</FormControl>

							{/* Descripción */}
							<FormControl>
								<FormLabel fontWeight="semibold">Descripción</FormLabel>
								<Textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									placeholder="Descripción del producto..."
									borderRadius="xl"
									borderColor="gray.300"
									rows={3}
									_hover={{ borderColor: "brand.400" }}
									_focus={{
										borderColor: "brand.500",
										boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
									}}
								/>
							</FormControl>

							{/* Precio y Stock */}
							<SimpleGrid columns={2} spacing={4} w="100%">
								<FormControl isRequired>
									<FormLabel fontWeight="semibold">Precio</FormLabel>
									<Input
										name="price"
										type="number"
										step="0.01"
										min="0"
										value={formData.price}
										onChange={handleChange}
										placeholder="0.00"
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontWeight="semibold">Stock</FormLabel>
									<Input
										name="stock"
										type="number"
										min="0"
										value={formData.stock}
										onChange={handleChange}
										placeholder="0"
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									/>
								</FormControl>
							</SimpleGrid>

							{/* Marca y Categoría */}
							<SimpleGrid columns={2} spacing={4} w="100%">
								<FormControl>
									<FormLabel fontWeight="semibold">Marca</FormLabel>
									<Input
										name="brand"
										value={formData.brand}
										onChange={handleChange}
										placeholder="Ej: Nike"
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontWeight="semibold">Categoría</FormLabel>
									<Select
										name="categoryId"
										value={formData.categoryId}
										onChange={handleChange}
										placeholder="Seleccionar..."
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									>
										{categories.map((cat) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
									</Select>
								</FormControl>
							</SimpleGrid>

							{/* Género y Talles */}
							<SimpleGrid columns={2} spacing={4} w="100%">
								<FormControl>
									<FormLabel fontWeight="semibold">Género</FormLabel>
									<Select
										name="gender"
										value={formData.gender}
										onChange={handleChange}
										placeholder="Seleccionar..."
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									>
										<option value="hombre">Hombre</option>
										<option value="mujer">Mujer</option>
										<option value="unisex">Unisex</option>
									</Select>
								</FormControl>

								<FormControl>
									<FormLabel fontWeight="semibold">Talles</FormLabel>
									<Input
										name="sizes"
										value={formData.sizes}
										onChange={handleChange}
										placeholder="40,41,42,43"
										borderRadius="xl"
										borderColor="gray.300"
										_hover={{ borderColor: "brand.400" }}
										_focus={{
											borderColor: "brand.500",
											boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
										}}
									/>
									<FormHelperText fontSize="xs">
										Separados por coma
									</FormHelperText>
								</FormControl>
							</SimpleGrid>

							{/* Oferta */}
							<Box w="100%" p={4} bg="gray.50" borderRadius="xl">
								<FormControl
									display="flex"
									alignItems="center"
									mb={formData.isOnSale ? 4 : 0}
								>
									<FormLabel fontWeight="semibold" mb={0}>
										¿Está en oferta?
									</FormLabel>
									<Switch
										name="isOnSale"
										isChecked={formData.isOnSale}
										onChange={handleSwitchChange}
										colorScheme="brand"
									/>
								</FormControl>

								{formData.isOnSale && (
									<FormControl>
										<FormLabel fontWeight="semibold">
											Precio de oferta
										</FormLabel>
										<Input
											name="salePrice"
											type="number"
											step="0.01"
											min="0"
											value={formData.salePrice}
											onChange={handleChange}
											placeholder="0.00"
											borderRadius="xl"
											borderColor="gray.300"
											bg="white"
											_hover={{ borderColor: "brand.400" }}
											_focus={{
												borderColor: "brand.500",
												boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
											}}
										/>
									</FormControl>
								)}
							</Box>

							{/* Imagen */}
							<Box w="100%">
								<Text fontWeight="semibold" fontSize="sm" mb={3}>
									{isEditing ? "Imagen del producto" : "Imagen"}
								</Text>

								<Flex
									gap={4}
									direction={{ base: "column", sm: "row" }}
									align="stretch"
									alignItems="center"
								>
									<Box
										as="img"
										src={
											formData.image
												? URL.createObjectURL(formData.image)
												: product?.imageUrl || "/img/defaultProductImg.webp"
										}
										alt={product?.name || "Producto"}
										maxH="160px"
										maxW="100%"
										borderRadius="lg"
										objectFit="contain"
										bg="white"
										boxShadow="sm"
									/>

									{/* Derecha: Área de subida */}
									<Box
										flex="1"
										p={4}
										border="2px dashed"
										borderColor="gray.300"
										borderRadius="xl"
										bg="gray.50"
										textAlign="center"
										transition="all 0.2s"
										_hover={{
											borderColor: "brand.400",
											bg: "brand.50",
										}}
										position="relative"
										cursor="pointer"
										display="flex"
										flexDirection="column"
										alignItems="center"
										justifyContent="center"
										maxH="160px"
									>
										<Input
											type="file"
											accept=".jpg,.jpeg,.png,.webp"
											onChange={handleFileChange}
											position="absolute"
											top={0}
											left={0}
											w="100%"
											h="100%"
											opacity={0}
											cursor="pointer"
										/>
										<Box color="gray.400" mb={3}>
											<Box
												as="svg"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												w={12}
												h={12}
												mx="auto"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
												/>
											</Box>
										</Box>
										<Text
											fontSize="sm"
											color="gray.600"
											fontWeight="semibold"
											mb={1}
										>
											{formData.image ? "Cambiar imagen" : "Subir imagen"}
										</Text>
										<Text fontSize="xs" color="gray.500">
											Arrastrá o hacé click
										</Text>
										<Text fontSize="xs" color="gray.400" mt={2}>
											JPG, PNG, WebP • Máx 2MB
										</Text>
									</Box>
								</Flex>
							</Box>
						</VStack>
					</ModalBody>

					<ModalFooter
						gap={3}
						borderTop="1px solid"
						borderColor="gray.200"
						bg="white"
					>
						<Button
							variant="ghost"
							onClick={onClose}
							isDisabled={isSubmitting}
							borderRadius="full"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							colorScheme="brand"
							isLoading={isSubmitting}
							borderRadius="full"
						>
							{isEditing ? "Guardar cambios" : "Crear"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};
