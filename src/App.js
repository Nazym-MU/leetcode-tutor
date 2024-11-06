import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { DataStructures } from './components/explanations/data-structures/DataStructures';
import Heap from './components/explanations/data-structures/Heap';
import BST from './components/explanations/data-structures/BST';
import RBT from './components/explanations/data-structures/RBT';
import { Algorithms } from './components/explanations/algorithms/Algorithms';
import Sorting from './components/explanations/algorithms/Sorting';
import LeetCode from './components/explanations/leetcode/LeetCode';
import { ReactJS } from './components/explanations/reactjs/ReactJS';
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
        <Route path="/data-structures/rbt" element={<RBT />} />
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/algorithms/sorting" element={<Sorting />} />
        <Route path="/react" element={<ReactJS />} />
        <Route path="/leetcode" element={<LeetCode />} />
      </Routes>
    </Router>
  );
};

export default App;