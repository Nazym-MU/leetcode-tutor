import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { DataStructures } from './components/explanations/data-structures/DataStructures';
import Heap from './components/explanations/data-structures/Heap';
import BST from './components/explanations/data-structures/BST';
import './styles/Template.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/data-structures/heap" element={<Heap />} />
        <Route path="/data-structures/bst" element={<BST />} />
      </Routes>
    </Router>
  );
};

export default App;