import {
  Box,
  Flex,
  IconButton,
  Input,
  useOutsideClick,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useLayout } from "../hooks/useLayout";
import { useSearchParams } from "react-router-dom";

export const SearchPill = () => {
  const { isHome } = useLayout();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";

  const inputColor = isHome ? "white" : "gray.900";

  const [open, setOpen] = useState(Boolean(initialSearch));
  const [query, setQuery] = useState(initialSearch);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: ref as React.RefObject<HTMLElement>,
    handler: () => setOpen(false),
  });

  const updateSearchParam = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const trimmed = value.trim();

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handleIconClick = () => {
    setOpen((prev) => !prev);
  };

  if (isHome) {
    return null;
  }

  return (
    <Box ref={ref}>
      <Flex
        align="center"
        gap={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor="brand.500"
        bg={isHome ? "rgba(109, 60, 49, 0.35)" : "rgba(250, 110, 79, 0.35)"}
        backdropFilter="blur(6px)"
        h="50px"
        px={open ? 3 : 0}
        width={open ? "260px" : "50px"}
        transition="all 0.25s ease"
        position="absolute"
        top={5}
        right="80px"
      >
        <IconButton
          aria-label="Buscar"
          icon={<SearchIcon boxSize={5} />}
          variant="ghost"
          color="black"
          size="lg"
          _hover={{
            bg: "transparent",
            opacity: 0.85,
            transform: "scale(1.05)",
          }}
          _active={{ transform: "scale(0.95)" }}
          onClick={handleIconClick}
        />

        {open && (
          <Input
            autoFocus
            value={query}
            placeholder="Buscar..."
            border="none"
            bg="none"
            color={inputColor}
            _placeholder={{ color: "gray.600" }}
            _focus={{ boxShadow: "none" }}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              updateSearchParam(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setOpen(false);
              }
            }}
          />
        )}
      </Flex>
    </Box>
  );
};
