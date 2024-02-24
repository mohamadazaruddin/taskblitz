import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

type SideBarProps = {
  DrawerButton: React.ReactNode;
  DraweerProps?: DrawerProps;
  isOpen: boolean;
  onClose: () => void;
};
export default function SideBar({
  DrawerButton,
  DraweerProps,
  isOpen,
  onClose,
}: SideBarProps) {
  const btnRef = React.useRef(null);
  return (
    <>
      {DrawerButton}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
        {...DraweerProps}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
