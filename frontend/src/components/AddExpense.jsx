import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChakraProvider,
  extendTheme,
  ColorModeScript,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useExpenseMutation } from "../slices/userAdminApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const lightTheme = extendTheme({
  config: {
    initialColorMode: "light",
  },
});

export default function AddExpense() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expense, { isExpense }] = useExpenseMutation();

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (amount.trim() || date.trim() || !selectedValue) {
        const res = await expense({ selectedValue, amount, date }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/expense");
      } else {
        toast.error("Please Enter all details");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <ChakraProvider theme={lightTheme}>
      {/* Use ColorModeScript to set the initial color mode */}
      <ColorModeScript initialColorMode={lightTheme.config.initialColorMode} />
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          minH={"100vh"}
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "850px",
            color: "black",
          }}
        >
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Add Expense</Heading>
            <Form onSubmit={submitHandler}>
              <Text mb={2}>Expense Category</Text>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {selectedValue && <Text mt={2}>{selectedValue}</Text>}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleSelect("Food and Drinks")}>
                        Food and Drinks
                      </MenuItem>
                      <MenuItem onClick={() => handleSelect("Shopping")}>
                        Shopping
                      </MenuItem>
                      <MenuItem onClick={() => handleSelect("Housing")}>
                        Housing
                      </MenuItem>
                      <MenuItem onClick={() => handleSelect("Transportation")}>
                        Transportation
                      </MenuItem>
                      <MenuItem onClick={() => handleSelect("Vehicle")}>
                        Vehicle
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
              <FormControl id="date" style={{ borderColor: "black" }}>
                <FormLabel>Date</FormLabel>
                <Input type="date" onChange={(e) => setDate(e.target.value)} />
              </FormControl>
              <FormControl id="amount" style={{ borderColor: "black" }}>
                <FormLabel>Amount[₹]</FormLabel>
                <Input
                  type="amount"
                  placeholder="Your email address"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <Stack spacing={6}>
                <div></div>
                <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                  Submit
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Flex>
      </Stack>
    </ChakraProvider>
  );
}
