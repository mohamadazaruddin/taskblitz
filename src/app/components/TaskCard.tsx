import {
  Box,
  Card,
  CardProps,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type TaskcardProps = {
  title: string;
  description: string;
  status: string;
};
export default function TaskCard({
  title,
  description,
  status,
  ...rest
}: TaskcardProps & CardProps) {
  return (
    <Card
      p={3}
      rounded="md"
      bgColor={useColorModeValue("contrast.200", "black.500")}
      borderColor={useColorModeValue(
        "#BABAFF !important",
        "#2F2F37 !important"
      )}
      border="1px solid"
      {...rest}
    >
      <Heading
        fontSize="md"
        fontWeight="normal"
        color={useColorModeValue("black.500", "#CACACE")}
      >
        {title}
      </Heading>
      <Text fontSize="sm" mt={1} fontWeight="normal" color="#797C86">
        {description}
      </Text>
      <Flex
        alignItems="center"
        fontSize="xs"
        mt={2.5}
        gap={1.5}
        fontWeight="normal"
        color="#797C86"
      >
        <Icon
          viewBox="0 0 200 200"
          color={
            status === "Pending"
              ? "red.500"
              : status === "Done"
              ? "#29B030"
              : "#F29339"
          }
        >
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
        <Box as="span">{status}</Box>
      </Flex>
    </Card>
  );
}
