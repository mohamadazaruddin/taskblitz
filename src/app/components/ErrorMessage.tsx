import {
  Box,
  BoxProps,
  Image,
  useColorModeValue,
  Text,
  Heading,
} from "@chakra-ui/react";
import React from "react";

export default function ErrorMessage({ ...rest }: BoxProps) {
  return (
    <Box {...rest} textAlign="center">
      <Box
        mt="10"
        h="300px"
        w="full"
        bgImage={useColorModeValue(
          "/images/landing-bg-light.png",
          "/images/landing-bg-dark.png"
        )}
        bgSize="100% auto"
        bgRepeat="no-repeat"
      ></Box>
      <Box textAlign="center">
        <Heading
          fontWeight="semibold"
          fontSize="28px"
          color={useColorModeValue("black.600", "contrast.200")}
        >
          No Task Found
        </Heading>
        <Text fontWeight="semibold" fontSize="sm" color="gray.400">
          Try Aadding New tasks
        </Text>
      </Box>
    </Box>
  );
}
