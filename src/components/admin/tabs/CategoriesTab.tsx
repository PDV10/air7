import { useState } from "react";
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
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "../../../services/publicApi";
import { deleteCategory } from "../../../services/adminApi";
import { CategoryModal } from "../modals/CategoryModal";
import { ConfirmModal } from "../../common/ConfirmModal";
import type { Category } from "../../../api/types";

export const CategoriesTab = () => {
	const toast = useToast();
	const queryClient = useQueryClient();

	const { isOpen: isCategoryModalOpen, onOpen: onCategoryModalOpen, onClose: onCategoryModalClose } = useDisclosure();
	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const { data: categories = [], isLoading, isError } = useQuery({
		queryKey: ["admin-categories"],
		queryFn: fetchCategories,
	});

	const handleCreate = () => {
		setSelectedCategory(null);
		onCategoryModalOpen();
	};

	const handleEdit = (category: Category) => {
		setSelectedCategory(category);
		onCategoryModalOpen();
	};

	const handleDeleteClick = (category: Category) => {
		setCategoryToDelete(category);
		onConfirmOpen();
	};

	const handleDeleteConfirm = async () => {
		if (!categoryToDelete) return;

		setIsDeleting(true);
		try {
			await deleteCategory(categoryToDelete.id);
			queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast({
				title: "Categoría eliminada",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onConfirmClose();
		} catch (error) {
			toast({
				title: "Error al eliminar",
				description: error instanceof Error ? error.message : "Error desconocido",
				status: "error",
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsDeleting(false);
			setCategoryToDelete(null);
		}
	};

	const handleModalSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
		queryClient.invalidateQueries({ queryKey: ["categories"] });
		onCategoryModalClose();
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
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
					Error al cargar categorías
				</Text>
				<Button onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-categories"] })}>
					Reintentar
				</Button>
			</Flex>
		);
	}

	if (categories.length === 0) {
		return (
			<Flex direction="column" align="center" py={16} gap={4}>
				<Text color="gray.500" fontSize="lg">
					No hay categorías cargadas
				</Text>
				<Button
					leftIcon={<AddIcon />}
					colorScheme="brand"
					borderRadius="full"
					onClick={handleCreate}
				>
					Crear categoría
				</Button>
			</Flex>
		);
	}

	return (
		<Box>
			<Flex justify="flex-end" mb={4}>
				<Button
					leftIcon={<AddIcon />}
					colorScheme="brand"
					borderRadius="full"
					onClick={handleCreate}
				>
					Crear categoría
				</Button>
			</Flex>

			<TableContainer
				border="1px solid"
				borderColor="gray.200"
				borderRadius="xl"
				boxShadow="sm"
			>
				<Table variant="simple" size="sm">
					<Thead bg="gray.50">
						<Tr>
							<Th>ID</Th>
							<Th>Nombre</Th>
							<Th>Descripción</Th>
							<Th>Creada</Th>
							<Th>Acciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{categories.map((category) => (
							<Tr key={category.id} _hover={{ bg: "gray.50" }}>
								<Td color="gray.500" fontFamily="mono">
									{category.id}
								</Td>
								<Td fontWeight="medium">{category.name}</Td>
								<Td color="gray.600" maxW="300px" isTruncated>
									{category.description || "-"}
								</Td>
								<Td color="gray.500" fontSize="sm">
									{formatDate(category.createdAt)}
								</Td>
								<Td>
									<Flex gap={2}>
										<Tooltip label="Editar">
											<IconButton
												aria-label="Editar categoría"
												icon={<EditIcon />}
												size="sm"
												variant="ghost"
												colorScheme="blue"
												onClick={() => handleEdit(category)}
											/>
										</Tooltip>
										<Tooltip label="Eliminar">
											<IconButton
												aria-label="Eliminar categoría"
												icon={<DeleteIcon />}
												size="sm"
												variant="ghost"
												colorScheme="red"
												onClick={() => handleDeleteClick(category)}
											/>
										</Tooltip>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

			{/* Category Modal */}
			<CategoryModal
				isOpen={isCategoryModalOpen}
				onClose={onCategoryModalClose}
				category={selectedCategory}
				onSuccess={handleModalSuccess}
			/>

			{/* Confirm Delete Modal */}
			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={onConfirmClose}
				onConfirm={handleDeleteConfirm}
				title="Eliminar categoría"
				message={`¿Estás seguro de que querés eliminar "${categoryToDelete?.name}"? Los productos asociados perderán esta categoría.`}
				confirmText="Eliminar"
				isLoading={isDeleting}
			/>
		</Box>
	);
};
