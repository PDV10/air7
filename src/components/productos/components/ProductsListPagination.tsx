import { Flex, IconButton, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type ProductsListPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const ProductsListPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: ProductsListPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Flex justifyContent="center" align="center" mt={6} gap={2} flexWrap="wrap">
      <IconButton
        aria-label="Página anterior"
        size="md"
        icon={<ChevronLeftIcon w={6} h={6} />}
        variant="ghost"
        borderRadius="full"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        _hover={{ bg: "gray.100" }}
      />

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Button
            key={`page-${page}`}
            size="sm"
            variant="ghost"
            borderRadius="full"
            minW="28px"
            px={2}
            h="32px"
            fontSize="sm"
            onClick={() => onPageChange(page)}
            bg="transparent"
            border="none"
            color={isActive ? "brand.600" : "gray.500"}
            fontWeight={isActive ? "semibold" : "medium"}
            _hover={{
              bg: "transparent",
              color: "brand.600",
              textDecoration: isActive ? "none" : "underline",
              textUnderlineOffset: "3px",
            }}
            _active={{
              bg: "transparent",
              transform: "scale(0.96)",
            }}
            _focus={{ boxShadow: "none" }}
          >
            {page}
          </Button>
        );
      })}

      <IconButton
        aria-label="Página siguiente"
        size="md"
        icon={<ChevronRightIcon w={6} h={6} />}
        variant="ghost"
        borderRadius="full"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        _hover={{ bg: "gray.100" }}
      />
    </Flex>
  );
};
