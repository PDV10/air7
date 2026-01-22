import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useProducts, getUniqueValues } from "../../../hooks";

export type OrderBy = "popular" | "priceAsc" | "priceDesc" | "nameAsc";

const ORDER_BY_VALUES: OrderBy[] = [
	"popular",
	"priceAsc",
	"priceDesc",
	"nameAsc",
];

export const useProductsFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = new URLSearchParams(searchParams);

	// Fetch productos desde la API
	const { data: allProducts = [], isLoading, isError } = useProducts();

	// Obtener el mapeo de categorías (nombre a id)
	const categoryMap = useMemo(() => {
		const map: Record<string, number> = {};
		for (const product of allProducts) {
			if (product.category) {
				map[product.category.name.toLowerCase()] = product.category.id;
			}
		}
		return map;
	}, [allProducts]);

	// Obtener label de categorías disponibles
	const categoryLabels = useMemo(() => {
		const labels: Record<string, string> = {};
		for (const product of allProducts) {
			if (product.category) {
				labels[product.category.name.toLowerCase()] = product.category.name;
			}
		}
		return labels;
	}, [allProducts]);

	// Obtener opciones dinámicas de marcas y talles (sin repetir)
	const brandOptions = useMemo(
		() => getUniqueValues(allProducts, "brand"),
		[allProducts],
	);

	const sizeOptions = useMemo(
		() => getUniqueValues(allProducts, "sizes"),
		[allProducts],
	);

	const categoryParam = searchParams.get("category");

	const brandsParam = searchParams.get("brands") ?? "";
	const selectedBrands = brandsParam ? brandsParam.split(",") : [];

	const sizesParam = searchParams.get("sizes") ?? "";
	const selectedSizes = sizesParam ? sizesParam.split(",") : [];

	const searchTermParam = searchParams.get("search") ?? "";
	const searchTerm = searchTermParam.trim().toLowerCase();

	const recommendedForParam = searchParams.get("recommendedFor") ?? "";
	const selectedRecommendedFor = recommendedForParam
		? recommendedForParam.split(",")
		: [];

	const rawOrderBy = searchParams.get("orderBy") as OrderBy | null;
	const orderBy: OrderBy = ORDER_BY_VALUES.includes(rawOrderBy as OrderBy)
		? (rawOrderBy as OrderBy)
		: "popular";

	const handleBrandChange = (values: string[]) => {
		if (values.length > 0) {
			params.set("brands", values.join(","));
		} else {
			params.delete("brands");
		}
		params.delete("page");
		setSearchParams(params);
	};

	const handleSizeChange = (values: string[]) => {
		if (values.length > 0) {
			params.set("sizes", values.join(","));
		} else {
			params.delete("sizes");
		}
		params.delete("page");
		setSearchParams(params);
	};

	const handleRecommendedForChange = (values: string[]) => {
		if (values.length > 0) {
			params.set("recommendedFor", values.join(","));
		} else {
			params.delete("recommendedFor");
		}
		params.delete("page");
		setSearchParams(params);
	};

	const handleOrderByChange = (value: OrderBy) => {
		if (value === "popular") {
			params.delete("orderBy");
		} else {
			params.set("orderBy", value);
		}
		setSearchParams(params);
	};

	const handleClearFilters = () => {
		params.delete("brands");
		params.delete("sizes");
		params.delete("recommendedFor");
		params.delete("search");
		params.delete("category");
		params.delete("page");
		setSearchParams(params);
	};

	const hasActiveFilters =
		selectedBrands.length > 0 ||
		selectedSizes.length > 0 ||
		selectedRecommendedFor.length > 0 ||
		!!searchTerm ||
		!!categoryParam;

	const checkBoxColorScheme = "brand";

	const isOfertasFilter = categoryParam?.toLowerCase() === "ofertas";

	const titleLabel = isOfertasFilter
		? "Ofertas"
		: categoryParam
			? categoryLabels[categoryParam.toLowerCase()] || categoryParam
			: "Productos";

	const filteredProducts = useMemo(() => {
		return allProducts.filter((product) => {
			if (isOfertasFilter) {
				if (!product.isOnSale) return false;
			} else if (categoryParam) {
				const categoryId = categoryMap[categoryParam.toLowerCase()];
				if (categoryId && product.categoryId !== categoryId) return false;

				if (
					!categoryId &&
					product.category?.name.toLowerCase() !== categoryParam.toLowerCase()
				) {
					return false;
				}
			}

			if (selectedBrands.length > 0 && product.brand) {
				if (!selectedBrands.includes(product.brand)) {
					return false;
				}
			} else if (selectedBrands.length > 0 && !product.brand) {
				return false;
			}

			if (selectedSizes.length > 0) {
				if (
					!product.sizes ||
					!product.sizes.some((size) => selectedSizes.includes(size))
				) {
					return false;
				}
			}

			if (selectedRecommendedFor.length > 0 && product.gender) {
				if (!selectedRecommendedFor.includes(product.gender)) {
					return false;
				}
			} else if (selectedRecommendedFor.length > 0 && !product.gender) {
				return false;
			}

			if (searchTerm) {
				const name = product.name.toLowerCase();
				const brand = (product.brand || "").toLowerCase();
				if (!name.includes(searchTerm) && !brand.includes(searchTerm)) {
					return false;
				}
			}

			return true;
		});
	}, [
		allProducts,
		categoryParam,
		categoryMap,
		selectedBrands,
		selectedSizes,
		selectedRecommendedFor,
		searchTerm,
		isOfertasFilter,
	]);

	const hasFilterParams =
		!!searchParams.get("category") ||
		!!searchParams.get("brands") ||
		!!searchParams.get("sizes") ||
		!!searchParams.get("recommendedFor") ||
		!!searchParams.get("search");

	const products = hasFilterParams ? filteredProducts : allProducts;
	const totalProducts = products.length;

	return {
		handleBrandChange,
		handleSizeChange,
		handleRecommendedForChange,
		handleOrderByChange,
		titleLabel,
		selectedBrands,
		selectedSizes,
		selectedRecommendedFor,
		products,
		checkBoxColorScheme,
		handleClearFilters,
		hasActiveFilters,
		orderBy,
		totalProducts,
		isLoading,
		isError,
		categoryLabels,
		// Opciones dinámicas para filtros
		brandOptions,
		sizeOptions,
	};
};
