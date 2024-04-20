import {
  Box,
  Flex,
  Icon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export default function statusColor(status: string, size?: string) {
  const CircleIcon = (props: IconProps) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
  return (
    <Flex
      alignItems="center"
      fontSize={size ? "md" : "xs"}
      gap={1.5}
      fontWeight="normal"
      color={"#797C86"}
    >
      <CircleIcon
        boxSize={size ? 5 : 3.5}
        color={
          status === "Pending"
            ? "red.500"
            : status === "Done"
            ? "#29B030"
            : "#F29339"
        }
      />

      <Box as="span">{size ? "" : status}</Box>
    </Flex>
  );
}
