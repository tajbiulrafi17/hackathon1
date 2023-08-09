import React, { useEffect, useState } from 'react';
import { Flex, Text, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

interface SignupProps {
    setAuth: (boolean: boolean) => void; // Assuming setAuth is a function that takes a boolean parameter and returns void
}

function Signup({ setAuth }: SignupProps) {

    // const [inputs, setInputs] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    // });

    // const { name, email, password, confirmPassword } = inputs;

    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputs({ ...inputs, [e.target.name]: e.target.value });
    // };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };


    const onSubmitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return console.error("Passwords do not match");
        }
        try {
            const response = await axios.post('http://localhost:8000/auth/signup', {
                name: name,
                email: email,
                password: password
            })

            console.log(response);
            localStorage.setItem("token", response.data.token);
            setAuth(true);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Flex w='100%' flexDir='column' ml='20%' mt='10%' mr='20%' color='black'>
                    <Text fontWeight='700' fontSize='30' align='center'>Signup</Text>
                    <Flex mt='5%' flexDir='column' gap='5' alignItems='center'>
                        <Input w='50%' placeholder='Enter Name' type='text' value={name} onChange={onChangeName}></Input>
                        <Input w='50%' placeholder='Enter Email' type='email' value={email} onChange={onChangeEmail}></Input>
                        <Input w='50%' placeholder='Enter Password' type='password' value={password} onChange={onChangePassword}></Input>
                        <Input w='50%' placeholder='Confirm Password' type='password' value={confirmPassword} onChange={onChangeConfirmPassword}></Input>
                        <Button bg={'blue.400'} type='submit' onClick={onSubmitForm}>Signup</Button>
                    </Flex>
                </Flex>
            </Flex >
        </>
    );
}

export default Signup;