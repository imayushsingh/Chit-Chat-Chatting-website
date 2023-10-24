import React,{useState} from 'react';
import { Button } from "@chakra-ui/button";
import  {FormControl,FormLabel} from '@chakra-ui/form-control';
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input"
import { VStack } from '@chakra-ui/layout';
import {  useToast } from '@chakra-ui/react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

const Login = () => {

const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [show, setShow] = useState(false);
const [loading, setLoading]=useState(false);
const toast = useToast();
const history= useHistory();

const handleClick = () => setShow(!show);

const submitHandler = async() => {
  setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred !",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
};

  return (
    <VStack spacing='5px' color="black">
      <FormControl id='email' isRequired>
       <FormLabel>Email-Id</FormLabel>
       <Input
       value={email}
       placeholder='Enter your Email-Id'
       onChange={(e) => setEmail(e.target.value)}
       />
       </FormControl>
       <FormControl id='password' isRequired>
       <FormLabel>Password</FormLabel>
       <InputGroup size="md">
       <Input
       type={show ? "text" : "password"}
       placeholder='Enter your Password'
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       />
       <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
       </InputGroup>
       </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
        </Button>
        <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={()=>{
          setEmail("guest@abc.com");
          setPassword("123456");
        }}
      >
        Login as Guest
      </Button>
    </VStack>
  );
}

export default Login
