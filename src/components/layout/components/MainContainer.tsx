import { Box, type BoxProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const MainContainer = ({
  children,
  ...boxProps
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      maxW="1200px"
      mx="auto"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
