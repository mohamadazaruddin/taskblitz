import statusColor from "@/utils/statusColor";
import {
  AddIcon,
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardProps,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import OptionIcon from "./Icons/OptionIcon";

type TaskcardProps = {
  title: string;
  description: string;
  status: string;
  taskId: string;
  handleDelete: (id: string) => void;
};
export default function TaskCard({
  title,
  description,
  status,
  taskId,
  handleDelete,
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
      <Flex justify="space-between">
        <Box>
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
          {statusColor(status)}
        </Box>
        <Box>
          <DeleteIcon
            onClick={() => handleDelete(taskId)}
            mt={2}
            mr={2}
            h="4"
            w="4"
            color="#BF1E2E"
          />
          {/* <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<OptionIcon h={5} w={5} />}
              bg="none"
              p={0}
              _focus={{ bg: "none" }}
            />
            <MenuList>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu> */}
        </Box>
      </Flex>
    </Card>
  );
}
