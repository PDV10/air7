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
	useToast,
	VStack,
} from "@chakra-ui/react";
import { createCategory, updateCategory } from "../../../services/adminApi";
import type { Category } from "../../../api/types";

interface CategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	category: Category | null;
	onSuccess: () => void;
}

export const CategoryModal = ({
	isOpen,
	onClose,
	category,
	onSuccess,
}: CategoryModalProps) => {
	const toast = useToast();
	const isEditing = !!category;

	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isOpen) {
			if (category) {
				setFormData({
					name: category.name,
					description: category.description || "",
				});
			} else {
				setFormData({
					name: "",
					description: "",
				});
			}
		}
	}, [category, isOpen]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
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

		setIsSubmitting(true);

		try {
			const data = {
				name: formData.name.trim(),
				description: formData.description.trim() || undefined,
			};

			if (isEditing && category) {
				await updateCategory(category.id, data);
				toast({
					title: "Categoría actualizada",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				await createCategory(data);
				toast({
					title: "Categoría creada",
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
		<Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
			<ModalOverlay bg="blackAlpha.600" />
			<ModalContent mx={4} borderRadius="xl">
				<ModalHeader fontWeight="bold">
					{isEditing ? "Editar categoría" : "Crear categoría"}
				</ModalHeader>
				<ModalCloseButton />

				<form onSubmit={handleSubmit}>
					<ModalBody>
						<VStack spacing={4}>
							<FormControl isRequired>
								<FormLabel fontWeight="semibold">Nombre</FormLabel>
								<Input
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Ej: Deporte"
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
								<FormLabel fontWeight="semibold">Descripción</FormLabel>
								<Textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									placeholder="Descripción opcional..."
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
						</VStack>
					</ModalBody>

					<ModalFooter gap={3}>
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
