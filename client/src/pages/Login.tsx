import React, { useEffect, useState } from "react";
import { Flex, Input, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from "react-router-dom";


interface SignupProps {
    setAuth: (boolean: boolean) => void; // Assuming setAuth is a function that takes a boolean parameter and returns void
}
function Login({ setAuth }: SignupProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const onSubmitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:8000/auth/login', {
                email: email,
                password: password
            })

            console.log(response);
            localStorage.setItem("token", response.data.token);
            setAuth(true);

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Flex w='100%' h='100vh' color='black'>
                <Flex w='100%' flexDir='column' ml='20%' mt='10%' mr='20%' color='black'>
                    <Text fontWeight='700' fontSize='30' align='center'>Login</Text>
                    <Flex mt='5%' flexDir='column' gap='5' alignItems='center'>
                        <Input w='50%' placeholder="Enter Email" value={email} onChange={onChangeEmail}></Input>
                        <Input w='50%' placeholder="Enter Password" value={password} onChange={onChangePassword}></Input>
                        <Button bg={'blue.400'} type='submit' onClick={onSubmitForm}>Login</Button>
                        <Button bg={'green.400'}><Link to="/signup">Signup Here</Link></Button>
                    </Flex>

                </Flex>
            </Flex>
        </>
    );

}

export default Login;
