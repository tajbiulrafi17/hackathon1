import React, { useEffect, useState } from 'react';
import { Flex, Text, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

import { useAddTodoMutation } from '../api';

interface SignupProps {
    setAuth: (boolean: boolean) => void; // Assuming setAuth is a function that takes a boolean parameter and returns void
}

function AddTodo({ setAuth }: SignupProps) {

    const [newTodo, setNewTodo] = useState('');
    const [addTodoMutation] = useAddTodoMutation();

    const onSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        try {
            // const body = { description: newTodo };
            // const token = localStorage.getItem('token');
            // const response = await axios.post('http://localhost:8000/todos', body, {
            //     headers: { token: token }
            // });
            // console.log(response);
            // window.location.assign('/');

            // --------------------------------------

            const response = await addTodoMutation(newTodo);
            console.log(response);
            window.location.assign('/'); // Redirect if needed



        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%' color='black'>
                    <Text fontWeight='700' fontSize='30'>Todo</Text>
                    <Flex mt='10%'>
                        <Input value={newTodo} onChange={e => setNewTodo(e.target.value)} variant='outline' placeholder='Add new Todo' w='50%' />
                        <Button ml={5} bg={'blue.400'} type='submit' onClick={onSubmitForm} >Add Todo</Button>
                    </Flex>

                </Flex>
            </Flex>
        </>

    );
}

export default AddTodo;
