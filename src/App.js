import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { DataStructures } from './components/explanations/data-structures/DataStructures';
import HeapPage from './components/explanations/data-structures/Heap';
import './styles/Template.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/data-structures/heap" element={<HeapPage />} />
      </Routes>
    </Router>
  );
};

export default App;