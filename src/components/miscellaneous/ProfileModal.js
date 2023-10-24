import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { ViewIcon } from '@chakra-ui/icons';
import { Button,Divider,Image,Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

const ProfileModal = ({user, children}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
         d={{ base: "flex" }} 
         icon={<ViewIcon />}
        onClick={onOpen}
         />
      )}

<Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="380px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Comic sans"
            display="flex"
            justifyContent="center"
          >
            
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Comic sans"
            >
              Name: {user.name}
              <Divider/>
              Email: {user.email}
              
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;