import { Box, type BoxProps } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const MainContainer = ({
  children,
  ...boxProps
}: PropsWithChildren<BoxProps>) => {
  return (
    <Box w="100%" pt={{ base: 6, md: 8 }} {...boxProps}>
      {children}
    </Box>
  );
};
