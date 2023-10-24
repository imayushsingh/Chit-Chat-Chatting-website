import React,{useState} from 'react';
import { Button } from "@chakra-ui/button";
import  {FormControl,FormLabel} from '@chakra-ui/form-control';
import {Input,InputGroup,InputRightElement} from "@chakra-ui/input"
import { VStack } from '@chakra-ui/layout';
import {  useToast } from '@chakra-ui/react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

const Signup = () => {
const [show, setShow] = useState(false);



const [name, setName] = useState();
const [email, setEmail] = useState();
const [confirmpassword, setConfirmpassword] = useState();
const [password, setPassword] = useState();
const [pic, setPic] = useState();
const [loading, setLoading]=useState(false);
const toast = useToast();
const history= useHistory();


const handleClick = () => setShow(!show);

const postDetails=(pics) => {
  setLoading(true);
  if(pics === undefined){
    toast({
      title: "Please select an Image",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
  if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
    toast({
      title: "Please Select a JPEG or PNG Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (pics.type === "image/jpeg" || pic.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "Chatting");
    data.append("cloud_name", "dlprtvxiw");
    axios.post("https://api.cloudinary.com/v1_1/dlprtvxiw/image/upload",data) 
    .then((response) => {
      console.log("Cloudinary response:", response);
      setPic(response.data.url.toString());
      setLoading(false);
      toast({
        title: "Image uploaded successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    })
    .catch((error) => {
      console.log("Cloudinary error:", error);
      setLoading(false);
    });
}
}

const submitHandler = async () => {
setLoading(true);
if (!name || !email || !password || !confirmpassword) {
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

if (password !== confirmpassword) {
  toast({
    title: "Passwords Do Not Match",
    status: "warning",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  return;
}
try {
  const config = {
    headers: {
      "Content-type": "application/json",
    }
};
  const {data} = await axios.post(
    "/api/user",
  {name,email,password,pic},
  config
  );

  toast({
    title: "Registration Successful",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
}catch (error){
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
      <FormControl id='first-name' isRequired>
       <FormLabel>Name</FormLabel>
       <Input
       placeholder='Enter your Name'
       onChange={(e) => setName(e.target.value)}
       />
      </FormControl>

      <FormControl id='email' isRequired>
       <FormLabel>Email-Id</FormLabel>
       <Input
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
       onChange={(e) => setPassword(e.target.value)}
       />
       <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
       </InputGroup>
       </FormControl>
       <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
        
      </Button>
    </VStack>
  )
}
export default Signup