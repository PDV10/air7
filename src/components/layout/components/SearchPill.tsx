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

export const SearchPill = () => {
  const { isHome } = useLayout();

  const iconColor = isHome ? "white" : "gray.900";
  const inputColor = isHome ? "white" : "gray.900";
  const placeholderColor = isHome ? "whiteAlpha.600" : "gray.400";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const searchText = (text: string) => {
    console.log("Buscar:", text);
  };

  useOutsideClick({
    ref: ref as React.RefObject<HTMLElement>,
    handler: () => setOpen(false),
  });

  const handleSubmit = () => {
    if (!query.trim()) return;
    searchText(query);
    setOpen(false);
    setQuery("");
  };

  return (
    <Box ref={ref}>
      <Flex
        align="center"
        gap={2}
        borderRadius="full"
        borderWidth="1px"
        borderColor="#763324"
        bg={isHome ? "rgba(109, 60, 49, 0.35)" : "rgba(250, 110, 79, 0.35)"}
        backdropFilter="blur(6px)"
        h="50px"
        px={open ? 3 : 0}
        width={open ? "260px" : "50px"}
        transition="all 0.25s ease"
      >
        <IconButton
          aria-label="Buscar"
          icon={<SearchIcon boxSize={5} />}
          variant="ghost"
          color={iconColor}
          size="lg"
          _hover={{
            bg: "transparent",
            opacity: 0.85,
            transform: "scale(1.05)",
          }}
          _active={{ transform: "scale(0.95)" }}
          onClick={() => setOpen((v) => !v)}
        />

        {open && (
          <Input
            autoFocus
            value={query}
            placeholder="Buscar..."
            border="none"
            bg="none"
            color={inputColor}
            _placeholder={{ color: placeholderColor }}
            _focus={{ boxShadow: "none" }}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        )}
      </Flex>
    </Box>
  );
};
