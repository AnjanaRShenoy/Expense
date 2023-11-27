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
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useExpenseMutation } from "../slices/userAdminApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { MdLocalGroceryStore} from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { FaRegPlayCircle } from "react-icons/fa";

export default function Expense(data) {



  
  return (
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
          <Flex justifyContent="space-between">
            <Heading fontSize={"3xl"}>Expenses</Heading>
            <AvatarGroup size="md" max={3}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            </AvatarGroup>
          </Flex>
          <div></div>
          <img
            style={{ height: "50px", width: "1000px" }}
            src="https://domo-support.domo.com/servlet/rtaImage?eid=ka05w00000123pE&feoid=00N5w00000Ri7BU&refid=0EM5w000005vPFM"
            alt=""
          />

          <div>
            <p>Today</p>
            <hr></hr>
            <Flex justifyContent="space-between">
            <MdLocalGroceryStore
              style={{
                backgroundColor: "pink",
                borderRadius: "50%",
                fontSize: "30px",
                width: "30px",
                height: "30px",
              }}
              
            />
            <p style={{fontSize: "18px",}}>Grocery</p>
            <CiTrash style={{color:"red"}} />
            <p>-₹{}</p>
            </Flex>
            <Flex justifyContent="space-between">
            <FaCar 
              style={{
                backgroundColor: "violet",
                borderRadius: "50%",
                fontSize: "30px",
                width: "30px",
                height: "30px",
              }}
              
            />
            <p style={{fontSize: "18px",}}>Transportation</p>
            <CiTrash style={{color:"red"}} />
            <p>-₹{data.amount}</p>
            </Flex>
            <Flex justifyContent="space-between">
            <FaHouse 
              style={{
                backgroundColor: "orange",
                borderRadius: "50%",
                fontSize: "30px",
                width: "30px",
                height: "30px",
              }}
              
            />
            <p style={{fontSize: "18px",}}>Housing</p>
            <CiTrash style={{color:"red"}} />
            <p>-₹{}</p>
            </Flex>
            <Flex justifyContent="space-between">
            <FaBowlFood 
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                fontSize: "30px",
                width: "30px",
                height: "30px",
              }}
              
            />
            <p style={{fontSize: "18px",}}>Food and Drink</p>
            <CiTrash style={{color:"red"}} />
            <p>-₹{}</p>
            </Flex>
            <Flex justifyContent="space-between">
            <FaRegPlayCircle
              style={{
                backgroundColor: "pink",
                borderRadius: "50%",
                fontSize: "30px",
                width: "30px",
                height: "30px",
              }}
              
            />
            <p style={{fontSize: "18px",}}>Entertainment</p>
            <CiTrash style={{color:"red"}} />
            <p>-₹{}</p>
            </Flex>
          </div>
        </Stack>
      </Flex>
    </Stack>
  );
}
