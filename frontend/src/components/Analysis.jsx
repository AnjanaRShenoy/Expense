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
  Progress,
} from "@chakra-ui/react";


export default function Analysis() {


  
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        minH={"100vh"}
        style={{
          borderTopRightRadius: "20px",
          borderRightLeftRadius: "20px",
          backgroundColor: "#e4e1e1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack spacing={4} w={"full"} maxW={"md"} color="black">
          <Heading fontSize={"xl"}>Where your money goes?</Heading>
          <Text mb={2}>Food and Drinks</Text>
          <Progress value={20} size="xs" colorScheme="red" />
          <Text mb={2}>Shopping</Text>
          <Progress value={20} size="xs" colorScheme="red" />
          <Text mb={2}>Housing</Text>
          <Progress value={20} size="xs" colorScheme="red" />
          <Text mb={2}>Transportation</Text>
          <Progress value={20} size="xs" colorScheme="red" />
          <Text mb={2}>Vehicle</Text>
          <Progress value={20} size="xs" colorScheme="red" />
          <div style={{border: "1px solid #000", padding: "10px", backgroundColor:"white", borderRadius:"18px"}}>
            <div style={{ display: "flex" }}>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                style={{ width: "85px", height: "85px", marginRight: "70px",  marginLeft:"45px"}}
              />
              <img
                src="https://www.creativefabrica.com/wp-content/uploads/2021/07/21/Plant-Natural-Leaf-Outline-Graphics-14972027-3-580x387.png"
                alt=""
                style={{ width: "85px", height: "85px" }}
              />
              
            </div>
            <h6>
                Save your money
              </h6>
              <p>
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
              </p>
              <Button colorScheme='blue'>VIEW TIPS</Button>
          </div>
        </Stack>
      </Flex>
    </Stack>
  );
}
