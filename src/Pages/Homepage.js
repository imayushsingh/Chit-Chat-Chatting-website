import React from 'react'
import {Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from "react-router-dom";
import { useEffect} from 'react';


const Homepage = () => {


const history = useHistory();

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
      history.push('/chats');
    }

  },[history]);

  
  return (
    <Container maxW='xl' centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text bg="black" fontSize="5xl" fontFamily=" Orbitron" color="yellow" align="center" >Chit-Chat !! </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black">
      <Tabs variant='soft-rounded' colorScheme='yellow'>
  <TabList mb='1em'>
    <Tab color="Black" width="50%">Login</Tab>
    <Tab Color="Black" width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default Homepage