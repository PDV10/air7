import { Button } from "@chakra-ui/react";

export const App = () => {
  return (
    <Button
      onClick={() => {
        console.log("hola");
      }}
    >
      click
    </Button>
  );
};
