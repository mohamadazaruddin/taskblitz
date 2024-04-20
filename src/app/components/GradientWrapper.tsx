import {
  useColorModeValue,
  Switch,
  Box,
  Flex,
  useColorMode,
  BoxProps,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import dynamic from "next/dynamic";
import { HamburgerIcon } from "@chakra-ui/icons";
const ColorSwitch = dynamic(() => import("./ColorSwitch"));
const SideBar = dynamic(() => import("./SideBar"));

type GradientWrapperProps = {
  colorSwitch?: boolean;
  wrapperProps?: BoxProps;
  switchProps?: BoxProps;
  sideBar?: boolean;
};

export default function GradientWrapper(
  props: React.PropsWithChildren<GradientWrapperProps>
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { children, colorSwitch, wrapperProps, sideBar, switchProps, ...rest } =
    props;
  return (
    <Box bg="gray.100" h="full" w="full" overflowY="auto" {...rest}>
      <Box
        h="full"
        w="full"
        py={8}
        px={{ base: 5, md: 20 }}
        bg={useColorModeValue(
          "linear-gradient(166deg, #5251CC -7.84%, #FFF 68.35%)",
          "linear-gradient(345deg, #000 0.39%, rgba(2, 2, 10, 0.64) 137.26%, #000 137.26%)"
        )}
        {...wrapperProps}
      >
        <Flex justify="space-between" align="center">
          {sideBar ? (
            <SideBar
              onClose={onClose}
              isOpen={isOpen}
              DrawerButton={
                <HamburgerIcon color="gray.600" w={7} h={7} onClick={onOpen} />
              }
            />
          ) : (
            <Box></Box>
          )}

          {colorSwitch && <ColorSwitch switchProps={switchProps} />}
        </Flex>
        {children}
      </Box>
    </Box>
  );
}
