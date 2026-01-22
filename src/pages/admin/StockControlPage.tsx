import { useNavigate } from "react-router-dom";
import {
	Box,
	Flex,
	Heading,
	Button,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Container,
} from "@chakra-ui/react";
import { logoutAdmin } from "../../components/admin/AdminGuard";
import { ProductsTab } from "../../components/admin/tabs/ProductsTab";
import { CategoriesTab } from "../../components/admin/tabs/CategoriesTab";

export const StockControlPage = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutAdmin();
		navigate("/admin/login");
	};

	return (
		<Box minH="100vh" bg="gray.100" py={8}>
			<Container maxW="1200px" px={4}>
				{/* Header */}
				<Flex
					justify="space-between"
					align="center"
					mb={8}
					flexWrap="wrap"
					gap={4}
				>
					<Heading
						fontFamily="Zuume"
						fontWeight="bold"
						fontSize={{ base: "2xl", md: "3xl" }}
						color="gray.900"
					>
						Control de Stock
					</Heading>
					<Button
						onClick={handleLogout}
						variant="outline"
						borderColor="gray.400"
						color="gray.700"
						borderRadius="full"
						_hover={{ bg: "gray.200" }}
					>
						Cerrar sesión
					</Button>
				</Flex>

				{/* Tabs */}
				<Box
					bg="white"
					borderRadius="2xl"
					boxShadow="0 4px 20px rgba(0,0,0,0.08)"
					overflow="hidden"
				>
					<Tabs colorScheme="brand" isLazy>
						<TabList
							borderBottom="1px solid"
							borderColor="gray.200"
							px={4}
						>
							<Tab
								fontWeight="semibold"
								_selected={{
									color: "brand.500",
									borderColor: "brand.500",
								}}
							>
								Productos
							</Tab>
							<Tab
								fontWeight="semibold"
								_selected={{
									color: "brand.500",
									borderColor: "brand.500",
								}}
							>
								Categorías
							</Tab>
						</TabList>

						<TabPanels>
							<TabPanel p={6}>
								<ProductsTab />
							</TabPanel>
							<TabPanel p={6}>
								<CategoriesTab />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Container>
		</Box>
	);
};
