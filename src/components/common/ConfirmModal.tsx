import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Text,
} from "@chakra-ui/react";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
	colorScheme?: string;
}

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	isLoading = false,
	colorScheme = "red",
}: ConfirmModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay bg="blackAlpha.600" />
			<ModalContent mx={4} borderRadius="xl">
				<ModalHeader fontWeight="bold">{title}</ModalHeader>
				<ModalBody>
					<Text color="gray.600">{message}</Text>
				</ModalBody>
				<ModalFooter gap={3}>
					<Button
						variant="ghost"
						onClick={onClose}
						isDisabled={isLoading}
						borderRadius="full"
					>
						{cancelText}
					</Button>
					<Button
						colorScheme={colorScheme}
						onClick={onConfirm}
						isLoading={isLoading}
						borderRadius="full"
					>
						{confirmText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
