import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Flex, Text, Input, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import axios from 'axios';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuth()
  })

  const isAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/auth/is-verify", {
        headers: { token: token }
      })

      console.log(response.data);

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />} />
      <Route path="/add" element={<AddTodo setAuth={setAuth} />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setAuth={setAuth} />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup setAuth={setAuth} />} />
    </Routes>

  );
}

export default App;
