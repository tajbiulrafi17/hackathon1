import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Flex,
    Text,
    Input,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    IconButton,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Link
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';


interface Todo {
    id: number;
    description: string;
    user: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
interface SignupProps {
    setAuth: (boolean: boolean) => void; // Assuming setAuth is a function that takes a boolean parameter and returns void
}

function Home({ setAuth }: SignupProps) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [user, setUser] = useState<User[]>();

    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // State for handling the selected todo for editing
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal open/close

    useEffect(() => {
        getName();
    }, []);

    useEffect(() => {
        getTodos();
    }, []);

    const getName = async () => {
        // try {
        //     try {
        //         const token = localStorage.getItem('token');
        //         // console.log(token);
        //         const response = await axios.get<User[]>('http://localhost:8000/todos', {
        //             headers: { token: token }
        //         });
        //         console.log(response.data);

        //     } catch (error) {
        //         console.error(error);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const getTodos = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log(token);
            const response = await axios.get<{ todo: Todo[], user: User[] }>('http://localhost:8000/todos', {
                headers: { token: token }
            });
            const { todo, user } = response.data;

            console.log(response.data);
            console.log('Todos:', todo);
            console.log('User:', user);
            console.log(user[0].name);

            setTodos(todo);
            setUser(user);

        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle opening the edit modal
    const openEditModal = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
    }

    // Function to handle closing the edit modal
    const closeEditModal = () => {
        setSelectedTodo(null);
        setIsModalOpen(false);
    }

    const updateTodo = async () => {
        try {
            if (selectedTodo) {
                const response = await axios.put<Todo>(
                    `http://localhost:8000/todos/${selectedTodo.id}`,
                    { description: selectedTodo.description }
                );
                console.log('Updated todo:', response.data);

                closeEditModal();
                window.location.assign('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/todos/${id}`);
            console.log('Deleted todo with ID:', id);

            // You can update the todos state to remove the deleted todo from the UI
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            // window.location.assign('/');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }



    return (
        <>
            <Flex w='100%' h='100vh'>
                <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%' color='black'>

                    <Flex>
                        <Text fontWeight='700' fontSize='30'>{user ? user[0].name : "No Name"}</Text>
                        <Link href='' ml='auto'>
                            <Button ml={5} bg={'red.400'} onClick={e => logout(e)}>Signout</Button>
                        </Link>
                    </Flex>

                    <Text fontWeight='700' fontSize='30' mt='5%'>Todo List</Text>
                    <Flex mt='5%'>

                        <Link href='http://localhost:3000/add' >
                            <Button ml={5} bg={'blue.400'} >Add New Todo</Button>
                        </Link>

                    </Flex>

                    <Tabs mt='5%' w='100%'>
                        <TabList>
                            <Tab>Incomplete Todo</Tab>
                            <Tab>Completed todo</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {todos.length === 0 ? (
                                    <Text>No todos available.</Text>
                                ) : (
                                    todos.map(todo => (
                                        <Box key={todo.id} borderWidth='1px' p={4} mb={2}>
                                            <Heading fontSize='lg' mb={2}>{todo.description}</Heading>
                                            <Flex gap='2'>
                                                <IconButton
                                                    aria-label="Edit Todo"
                                                    icon={<EditIcon />}
                                                    onClick={() => openEditModal(todo)}
                                                />
                                                <IconButton
                                                    aria-label="Delete Todo"
                                                    icon={<DeleteIcon />}
                                                    onClick={() => deleteTodo(todo.id)}
                                                />
                                            </Flex>
                                        </Box>
                                    ))
                                )}
                            </TabPanel>
                            <TabPanel>
                                <Text>Complete</Text>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Flex>
            </Flex>

            {/* Edit Todo Modal */}
            <Modal isOpen={isModalOpen} onClose={closeEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedTodo && (
                            <Input
                                value={selectedTodo.description}
                                onChange={(e) => setSelectedTodo({
                                    ...selectedTodo,
                                    description: e.target.value
                                })}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={updateTodo}>
                            Update
                        </Button>
                        <Button onClick={closeEditModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>

    );
};



export default Home;