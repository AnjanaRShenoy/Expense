import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userAdminApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const LinkItems = [
  { name: "Dashboard" },
  { name: "Expenses", url: "/expense" },
  { name: "Add Expense", url: "/addExpense" },
  { name: "Summary" },
  { name: "Accounts" },
  { name: "Setting" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();

      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("white", "white")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      mt="90px"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          <Box>
            <img
              src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              alt="Profile Image"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "7px",
              }}
            />
          </Box>
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="0.5px"
            ml="2"
          >
            <Text fontSize="m">Don Paul</Text>
            <Text fontSize="sm" style={{ color: "grey" }}>
              {userInfo.email}
            </Text>
          </VStack>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Box key={link.name}>
          <NavItem icon={link.icon} onClick={() => navigate(link.url)}>
            <Link as={Link} to={link.url}>
              {link.name}
            </Link>
          </NavItem>
        </Box>
      ))}
      <Box>
        <NavItem onClick={logoutHandler}>
          <Link as={Link} to="/logout">
            Logout
          </Link>
        </NavItem>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none", color: "grey" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      ></Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack></HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
