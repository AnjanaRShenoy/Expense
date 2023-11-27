import { useState, useEffect } from "react";
import { Form,  Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation,useRegisterMutation } from "../slices/userAdminApiSlice";
import { setCredentials } from "../slices/authSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
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
} from "@chakra-ui/react";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (
   
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Empty fields, please enter a value");
    } else {
      try {
        const res = await register({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const googleHandler = async (decoded) => {
    const email = decoded.email;
    
    try {
      const res = await register({ email, gmail: true }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  return (
    <Flex
    minH={"100vh"}
    align={"center"}
    justify={"center"}
    style={{
      backgroundColor:
        'black',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"} style={{ backgroundColor: "white", color: "black", width: "400px",  height: "500px", paddingTop: "20px" , marginTop: "100px", borderRadius:"10px",}}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"4xl"}>Register</Heading>
          <Form onSubmit={submitHandler}>
          <FormControl id="email">
            <FormLabel>Email </FormLabel>
            <Input style={{ borderColor: "black" }} type="email" 
            placeholder="Your email address"
            onChange={(e)=>setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input style={{ borderColor: "black" }} type="password" 
            placeholder="Your password"
            onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel >Confirm Password</FormLabel>
            <Input style={{ borderColor: "black" }} type="password" 
            placeholder="Your password"
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </FormControl>
          <Stack spacing={6}>
            <div>
            </div>
            <Button
            type="submit" colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
          </Form>
          <GoogleOAuthProvider clientId="491369151018-90df2bi9i480ivns1lmojepi9p2r9vg1.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    googleHandler(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
        </Stack>
      </Flex>
    </Stack>
  </Flex>
);
};

export default RegisterScreen;
