import {
  Box,
  BoxProps,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MoonIcon, SunIcon } from "./Icons";
type ColorSwitchProps = {
  switchProps?: BoxProps;
};
export default function ColorSwitch({ switchProps }: ColorSwitchProps) {
  const [darkMode, setDarkMode] = React.useState(false);
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      onClick={() => {
        toggleColorMode();
        setDarkMode(!darkMode);
      }}
      h={7}
      px={0.5}
      w={12}
      rounded="full"
      bg={useColorModeValue("primary.100", "black.500")}
      border="1px solid"
      borderColor={useColorModeValue("primary.200", "gray.800")}
      alignItems="center"
      {...switchProps}
    >
      <Box
        rounded="full"
        border="1px solid"
        p="1"
        borderColor={useColorModeValue("primary.400", "gray.800")}
        display="inline-flex"
        color={useColorModeValue("primary.400", "gray.400")}
        transform={darkMode ? "translateX(20px)" : "translateX(0px)"}
        transition="0.4s"
        bg={useColorModeValue("primary.300", "secondary.400")}
      >
        {darkMode ? <MoonIcon w={3} h={3} /> : <SunIcon w={3} h={3} />}
      </Box>
    </Flex>
  );
}
