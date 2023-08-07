import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, Text, Input, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import axios from 'axios';

function AddTodo() {

    const [newTodo, setNewTodo] = useState('');

    const onSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("submited");
        e.preventDefault();
        try {
            const body = { description: newTodo };
            const response = await axios.post("http://localhost:8000/todo/add", body);
            // const response = await fetch("http://localhost:8000/todo/add", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(body)
            // });
            console.log(response);
            window.location.assign('/');


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%' color='black'>
                    <Text fontWeight='700' fontSize='30'>Todo</Text>
                    <form >
                        <Flex mt='5%'>
                            <Input value={newTodo} onChange={e => setNewTodo(e.target.value)} variant='outline' placeholder='Add new Todo' w='50%' />
                            <Button ml={5} bg={'blue.400'} type='submit' onClick={onSubmitForm} >Add Todo</Button>
                        </Flex>
                    </form>

                </Flex>
            </Flex>
        </>

    );
}

export default AddTodo;
