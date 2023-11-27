import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation,useRegisterMutation } from "../slices/userAdminApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Loader from "../components/Loader";
import { jwtDecode } from "jwt-decode";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() || password.trim()) {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } else {
        toast.error("Please Enter email and password");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const googleHandler = async (decoded) => {
    const email = decoded.email;
    try {
      const res = await login({ email, gmail: true }).unwrap();
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
        <Flex p={8} flex={1} align={"center"} justify={"center"} style={{ backgroundColor: "white", color: "black", width: "500px",  height: "500px", paddingTop: "20px" , marginTop: "100px", borderRadius:"10px",}}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"4xl"}>Login</Heading>
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
            <Stack spacing={6}>
              <div>
              </div>
              <Button
              type="submit" colorScheme={"blue"} variant={"solid"}>
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
                <Text align={"center"}>
                  Not a User? 
                  <Link to="/register" cursor={"pointer"} color={"red.400"}>
                    Sign up
                  </Link>
                </Text>
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

export default LoginScreen;
