"use client";
import { Client, Databases, ID, Query } from "appwrite";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { use } from "react";
import { AddIcon } from "@chakra-ui/icons";

const GradientWrapper = dynamic(() => import("@/components/GradientWrapper"));
const TaskCard = dynamic(() => import("@/components/TaskCard"));
const ErrorMessage = dynamic(() => import("@/components/ErrorMessage"));
type TaskListProps = {
  title: string;
  description: string;
  status: string;
  username: string;
  pin: string;
  $collectionId?: string;
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  $permissions: [];
  $databaseId: string;
};
export default function Dashboard() {
  const [taskList, setTaskList] = React.useState<any[]>();
  const [createDocumentResponse, setCreateDocumentResponse] =
    React.useState<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = React.useState("Pending");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const client = new Client();
  client
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`)
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

  const databases = new Databases(client);
  React.useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      let promise = databases.listDocuments(
        "65d2608933aec898f3e4",
        "65d260a60a5d813b1ab7",
        []
      );
      promise.then(
        function (response) {
          const data = response.documents.filter(
            (item) =>
              item.username === userData.userName && item.pin === userData.pin
          );

          setTaskList(data);
          console.log(data, "ddd");
        },
        function (error) {
          console.log(error, "error");
        }
      );
    } else {
      alert("user not found");
    }
  }, [createDocumentResponse]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title.length < 3) setTitleError(true);
    if (description.length < 4) setDescriptionError(true);
    if (title.length && description.length && status.length && user) {
      console.log(user.userName);

      const promise = databases.createDocument(
        "65d2608933aec898f3e4",
        "65d260a60a5d813b1ab7",
        ID.unique(),
        {
          title: title,
          description: description,
          status: status,
          username: user.userName,
          pin: user.pin,
        }
      );
      promise.then(
        function (response) {
          onClose();
          setCreateDocumentResponse(response); // Trigger useEffect again
        },
        function (error) {
          console.log(error);
        }
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
      <Box mt="2.5">
        <Text
          color={useColorModeValue("#3B3B45", "gray.900")}
          fontWeight="semibold"
          fontSize="md"
          display={taskList?.length ? "block" : "none"}
        >
          Your Tasks
        </Text>
        {taskList?.length ? (
          <>
            {taskList?.map(({ title, description, status }, i) => (
              <Box key={`task-${i}`}>
                <TaskCard
                  title={title}
                  description={description}
                  status={status}
                  mt={i === 0 ? "1" : "2"}
                />
              </Box>
            ))}
          </>
        ) : (
          <ErrorMessage mt="10" />
        )}
      </Box>
      <IconButton
        rounded="full"
        pos="absolute"
        bottom={10}
        h="14"
        w="14"
        onClick={onOpen}
        _focus={{
          border: "none",
        }}
        right={5}
        aria-label="add"
        icon={<AddIcon h={5} w={5} />}
      />

      <Modal
        motionPreset="slideInBottom"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          border="1px solid"
          borderColor="#2F2F37"
          // bg="#0B0B0D"
          bgColor={useColorModeValue("contrast.200", "#0B0B0D")}
        >
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={titleError}>
              <FormLabel
                fontSize="sm"
                mb="1"
                fontWeight="semibold"
                color={useColorModeValue("black.500", "contrast.200")}
              >
                Title
              </FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.length) setTitleError(false);
                  else setTitleError(true);
                }}
                bg={useColorModeValue("contrast.200", "black.500")}
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
              />

              <FormErrorMessage>Title is required</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={descriptionError}>
              <FormLabel
                mt="4"
                mb="1"
                fontSize="sm"
                fontWeight="semibold"
                color={useColorModeValue("black.500", "contrast.200")}
              >
                Description
              </FormLabel>
              <Input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (e.target.value.length) setDescriptionError(false);
                  else setDescriptionError(true);
                }}
                bg={useColorModeValue("contrast.200", "black.500")}
                borderColor={useColorModeValue("#BABAFF", "#2F2F37")}
              />

              <FormErrorMessage>Description is Required</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel
                mt="4"
                fontSize="sm"
                fontWeight="semibold"
                color={useColorModeValue("black.500", "contrast.200")}
              >
                Status
              </FormLabel>

              <RadioGroup onChange={setStatus} value={status}>
                <Stack direction="row" gap={8} align="center">
                  <Radio
                    colorScheme="primary"
                    _focus={{ colorScheme: "none" }}
                    value="Pending"
                  >
                    Pending
                  </Radio>
                  <Radio value="In progress" _focus={{ colorScheme: "none" }}>
                    In-Progress
                  </Radio>
                  <Radio value="Done" _focus={{ colorScheme: "none" }}>
                    Done
                  </Radio>
                </Stack>
              </RadioGroup>

              <FormErrorMessage>
                Username should be greater than 3 letters
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GradientWrapper>
  );
}
