import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorMode,
  Slide,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaTimes, FaStream } from "react-icons/fa";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bgValue = useColorModeValue("white", "gray.800");

  return (
    <Flex
      p={4}
      justify="space-between"
      align="center"
      boxShadow={"sm"}
      zIndex={3}
      position="sticky"
      top={0}
      bg={bgValue}
    >
      <Heading size={{ sm: "md", md: "lg" }}>CryptoInfo</Heading>
      <Box display={{ base: "block", md: "none" }}>
        <Toggle />
        <IconButton
          icon={isOpen === true ? <FaTimes /> : <FaStream />}
          onClick={onToggle}
          aria-label="transition switch"
        />
      </Box>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box bg={bgValue} p={4} shadow="md">
          <VStack spacing="25px" pb={10}>
            <Text>Home</Text>
            <Text>Coins</Text>
          </VStack>
        </Box>
      </Slide>
      <Box display={{ base: "none", md: "block" }}>
        <HStack spacing={6}>
          <Text>Home</Text>
          <Text>Coins</Text>
          <Toggle />
        </HStack>
      </Box>
    </Flex>
  );
};

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      borderRadius={"full"}
      variant="ghost"
      aria-label="dark/light mode switch"
      icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
      onClick={() => toggleColorMode()}
    />
  );
};

export default Navbar;
