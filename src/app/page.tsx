"use client";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  useColorModeValue,
  Image,
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
        overflowY: "auto",
        h: "100vh",
      }}
    >
      <Box
        mt="10"
        h="300px"
        w="full"
        display={{ base: "block", md: "none" }}
        bgImage={useColorModeValue(
          "/images/landing-bg-light.png",
          "/images/landing-bg-dark.png"
        )}
        bgSize="100% auto"
        bgRepeat="no-repeat"
      ></Box>
      <Box
        textAlign="center"
        display={{
          base: "block",
          md: "flex",
        }}
        flexDir="column"
        justifyContent="center"
        mt={{ base: "none", md: "200px" }}
        alignItems="center"
        pos="relative"
        zIndex={999}
      >
        <Heading
          fontWeight="semibold"
          fontSize={{ base: "28px", md: "60px" }}
          color={useColorModeValue("black.600", "contrast.200")}
        >
          Welcome to TaskBlitz
        </Heading>
        <Text
          mt={2.5}
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "lg" }}
          color="gray.400"
          w={{ base: "full", md: "40%" }}
        >
          Simplify your life, stay organized, and boost productivity with our
          intuitive and feature-rich application.
        </Text>
        <Button
          variant="solid"
          colorScheme="primary"
          _focus={{
            border: "none",
          }}
          mt="16"
          px={20}
          right={5}
          onClick={() => push("/login")}
          display={{ base: "none", md: "block" }}
        >
          Get Started
        </Button>
      </Box>
      <Flex
        position="fixed"
        align="center"
        justify="center"
        left="50%"
        transform="translateX(-50%)"
        bottom="0"
      ></Flex>
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
        display={{ base: "block", md: "none" }}
      >
        Get Started
      </Button>
    </GradientWrapper>
  );
}
