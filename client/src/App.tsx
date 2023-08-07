import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import { Flex, Text, Input, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddTodo />} />
    </Routes>

  );
}

export default App;
