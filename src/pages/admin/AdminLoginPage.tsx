import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
	Box,
	Flex,
	Heading,
	Input,
	Button,
	FormControl,
	FormLabel,
	Text,
	useToast,
	InputGroup,
	InputRightElement,
	IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { isAdminLoggedIn, loginAdmin } from "../../components/admin/AdminGuard";

export const AdminLoginPage = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Si ya está logueado, redirigir a stock
	if (isAdminLoggedIn()) {
		return <Navigate to="/admin/stock" replace />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username.trim() || !password.trim()) {
			toast({
				title: "Error",
				description: "Ingresá usuario y contraseña",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			const result = await loginAdmin(username, password);

			if (result.success) {
				toast({
					title: "Bienvenido",
					description: "Sesión iniciada correctamente",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate("/admin/stock");
			} else {
				toast({
					title: "Error",
					description: result.error || "Usuario o contraseña incorrectos",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch {
			toast({
				title: "Error",
				description: "Error de conexión",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Flex minH="100vh" align="center" justify="center" bg="gray.100" px={4}>
			<Box
				bg="white"
				p={8}
				borderRadius="2xl"
				boxShadow="0 4px 20px rgba(0,0,0,0.1)"
				w="100%"
				maxW="400px"
			>
				<Heading
					fontFamily="Zuume"
					fontWeight="bold"
					fontSize="3xl"
					textAlign="center"
					mb={2}
					color="gray.900"
				>
					Admin Panel
				</Heading>
				<Text textAlign="center" color="gray.500" mb={8} fontSize="sm">
					Ingresá tus credenciales para continuar
				</Text>

				<form onSubmit={handleSubmit}>
					<FormControl mb={4}>
						<FormLabel fontWeight="semibold" color="gray.700">
							Usuario
						</FormLabel>
						<Input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="admin"
							borderRadius="xl"
							borderColor="gray.300"
							_hover={{ borderColor: "brand.400" }}
							_focus={{
								borderColor: "brand.500",
								boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
							}}
						/>
					</FormControl>

					<FormControl mb={6}>
						<FormLabel fontWeight="semibold" color="gray.700">
							Contraseña
						</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								borderRadius="xl"
								borderColor="gray.300"
								_hover={{ borderColor: "brand.400" }}
								_focus={{
									borderColor: "brand.500",
									boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
								}}
							/>
							<InputRightElement>
								<IconButton
									aria-label={
										showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
									}
									icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
									variant="ghost"
									size="sm"
									onClick={() => setShowPassword(!showPassword)}
								/>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<Button
						type="submit"
						w="100%"
						bg="brand.500"
						color="white"
						borderRadius="full"
						py={6}
						fontWeight="bold"
						isLoading={isLoading}
						_hover={{
							bg: "brand.600",
							transform: "translateY(-1px)",
						}}
					>
						Iniciar sesión
					</Button>
				</form>
			</Box>
		</Flex>
	);
};
