"use client";
import { Databases, ID, Query } from "appwrite";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Box,
  Button,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { use } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import statusColor from "@/utils/statusColor";
import client from "../../../lib/appwrite_client";

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
  const toast = useToast();

  const { push } = useRouter();
  React.useEffect(() => {
    const databases = new Databases(client);
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      let promise = databases.listDocuments(
        "65d2608933aec898f3e4",
        "65d260a60a5d813b1ab7",
        [Query.equal("pin", [userData?.pin])]
      );

      promise.then(
        function (response) {
          const data = response.documents.filter(
            (item) =>
              item.username === userData.userName && item.pin === userData.pin
          );
          setTaskList(data);
        },
        function (error) {
          toast({
            title: `${error}`,
            status: "error",
            duration: 5000,
            variant: "left-accent",
            isClosable: true,
          });
        }
      );
    } else {
      push("/login");
    }
  }, [createDocumentResponse]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    const databases = new Databases(client);
    e.preventDefault();
    if (title.length < 3) setTitleError(true);
    if (description.length < 4) setDescriptionError(true);
    if (title.length && description.length && status.length && user) {
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
          toast({
            title: "Task created successfully",
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
          });
        },
        function (error) {
          toast({
            title: `${error}`,
            status: "error",
            duration: 5000,
            variant: "left-accent",
            isClosable: true,
          });
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    const databases = new Databases(client);
    const promise = databases.deleteDocument(
      "65d2608933aec898f3e4",
      "65d260a60a5d813b1ab7",
      id
    );
    promise.then(
      function (response) {
        onClose();
        setCreateDocumentResponse(response); // Trigger useEffect again
        toast({
          title: "Task Deleted successfully",
          status: "success",
          variant: "left-accent",
          duration: 5000,
          isClosable: true,
        });
      },
      function (error) {
        toast({
          title: `${error}`,
          status: "error",
          duration: 5000,
          variant: "left-accent",
          isClosable: true,
        });
      }
    );
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
          fontSize={{ base: "md", md: "24px" }}
          display={taskList?.length ? "block" : "none"}
        >
          Your Tasks
        </Text>
        <Box display={{ base: "block", md: "none" }}>
          {taskList?.length ? (
            <>
              {taskList?.map((item, i) => (
                <Box key={`task-${i}`}>
                  <TaskCard
                    handleDelete={handleDelete}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    taskId={item.$id}
                    mt={i === 0 ? "1" : "2"}
                  />
                </Box>
              ))}
            </>
          ) : (
            <ErrorMessage mt="10" />
          )}
        </Box>
        <Flex
          py="5"
          justify="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <Box w="33%">
            {statusColor("Pending", "md")}
            {taskList
              ?.filter((item) => item.status === "Pending")
              .map((item, i) => (
                <Box key={`task-${i}`}>
                  <TaskCard
                    handleDelete={handleDelete}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    mt={i === 0 ? "1" : "2"}
                    taskId={item.$id}
                  />
                </Box>
              ))}
          </Box>
          <Box w="33%">
            {statusColor("In progress", "md")}

            {taskList
              ?.filter((item) => item.status === "In progress")
              .map((item, i) => (
                <Box key={`task-${i}`}>
                  <TaskCard
                    handleDelete={handleDelete}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    taskId={item.$id}
                    mt={i === 0 ? "1" : "2"}
                  />
                </Box>
              ))}
          </Box>
          <Box w="33%">
            {statusColor("Done", "md")}
            {taskList
              ?.filter((item) => item.status === "Done")
              .map((item, i) => (
                <Box key={`task-${i}`}>
                  <TaskCard
                    handleDelete={handleDelete}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    taskId={item.$id}
                    mt={i === 0 ? "1" : "2"}
                  />
                </Box>
              ))}
          </Box>
        </Flex>
      </Box>
      <IconButton
        rounded="full"
        pos="absolute"
        bottom={{ base: 10, md: 20 }}
        h="14"
        w="14"
        onClick={onOpen}
        _focus={{
          border: "none",
        }}
        right={{ base: 5, md: 20 }}
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
