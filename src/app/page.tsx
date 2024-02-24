"use client";
import {
  Box,
  Button,
  Image,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const GradientWrapper = dynamic(() => import("@/components/GradientWrapper"));
export default function Home() {
  const { push } = useRouter();
  return (
    <GradientWrapper
      colorSwitch={true}
      wrapperProps={{
        w: "full",
        pos: "relative",
      }}
    >
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
          Welcome to TaskBlitz
        </Heading>
        <Text mt={2.5} fontWeight="semibold" fontSize="sm" color="gray.400">
          Simplify your life, stay organized, and boost productivity with our
          intuitive and feature-rich application.
        </Text>
      </Box>
      <Button
        variant="solid"
        colorScheme="primary"
        pos="fixed"
        bottom={8}
        left={5}
        _focus={{
          border: "none",
        }}
        right={5}
        onClick={() => push("/login")}
      >
        Get Started
      </Button>
    </GradientWrapper>
  );
}
