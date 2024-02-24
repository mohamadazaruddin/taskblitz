"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  useColorModeValue,
  Heading,
  Button,
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const GradientWrapper = dynamic(() => import("@/components/GradientWrapper"));

export default function Login() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [pin, setPin] = useState("");
  const { response, setResponse } = useCurrentUser();
  const { push } = useRouter();
  const handleSubmit = () => {
    if (username.length < 3) setUsernameError(true);
    if (pin.length < 4) setPinError(true);
    if (!pinError && !usernameError && username.length && pin.length) {
      setResponse({ userName: username, pin: pin });
      push("/dashboard");
      localStorage.setItem(
        "user",
        JSON.stringify({ userName: username, pin: pin })
      );
    }
  };
  return (
    <GradientWrapper
      colorSwitch={true}
      wrapperProps={{
        w: "full",
        pos: "relative",
      }}
    >
      <Box textAlign="center" mt="5">
        <Heading
          fontWeight="semibold"
          fontSize="22px"
          color={useColorModeValue("black.600", "contrast.200")}
        >
          Welcome !!
        </Heading>
        <Text mt={1} fontWeight="semibold" fontSize="sm" color="gray.400">
          Lets help you in completing your tasks
        </Text>
      </Box>
      <Box
        h="180px"
        m="auto"
        mt="10"
        w="180px"
        bgImage={useColorModeValue(
          "/images/login-bg-light.png",
          "/images/login-bg-dark.png"
        )}
        bgSize="cover"
        bgRepeat="no-repeat"
      ></Box>
      <Box mt="8">
        <FormControl isInvalid={usernameError}>
          <FormLabel
            fontSize="sm"
            fontWeight="semibold"
            color={useColorModeValue("black.500", "contrast.200")}
          >
            Enter Username
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.length) setUsernameError(false);
              else setUsernameError(true);
            }}
            bg={useColorModeValue("contrast.200", "black.500")}
            borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
          />

          <FormErrorMessage>
            Username should be greater than 3 letters
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={pinError}>
          <FormLabel
            fontSize="sm"
            fontWeight="semibold"
            color={useColorModeValue("black.500", "contrast.200")}
          >
            Enter Pin
          </FormLabel>
          <HStack w="full">
            <PinInput
              isInvalid={pinError}
              onChange={(e) => {
                setPin(e);
                if (e.length) setPinError(false);
                else setPinError(true);
              }}
            >
              <PinInputField
                w="25%"
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
                bg={useColorModeValue("contrast.200", "black.500")}
              />
              <PinInputField
                w="25%"
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
                bg={useColorModeValue("contrast.200", "black.500")}
              />
              <PinInputField
                w="25%"
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
                bg={useColorModeValue("contrast.200", "black.500")}
              />
              <PinInputField
                w="25%"
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
                bg={useColorModeValue("contrast.200", "black.500")}
              />
            </PinInput>
          </HStack>
          <FormErrorMessage>Please enter Pin</FormErrorMessage>
        </FormControl>
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
        onClick={handleSubmit}
        right={5}
      >
        Login
      </Button>
    </GradientWrapper>
  );
}
