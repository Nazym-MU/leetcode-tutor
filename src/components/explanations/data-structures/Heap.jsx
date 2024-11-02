import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import HeapVisualizer from './HeapVisualizer';

const Heap = () => {
  const heapContent = {
    topic: "Heap Data Structure",
    description: "A Heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, for any given node I, the value of I is greater than or equal to the values of its children. In a min heap, the value of I is less than or equal to the values of its children.",
    sections: [
      {
        title: "Types of Heaps",
        content: (
          <div>
            <h3 className="subsection-title">1. Max Heap</h3>
            <p className="content-paragraph">The value of each node is greater than or equal to its children.</p>
            
            <h3 className="subsection-title">2. Min Heap</h3>
            <p className="content-paragraph">The value of each node is less than or equal to its children.</p>
          </div>
        )
      },
      {
        title: "Time Complexity",
        content: (
          <ul className="list-container">
            <li className="list-item">Build Heap: O(n)</li>
            <li className="list-item">Insert: O(log n)</li>
            <li className="list-item">Delete: O(log n)</li>
            <li className="list-item">Get Min/Max: O(1)</li>
          </ul>
        )
      }
    ],
    visualizations: [
      {
        instructions: "Enter comma-separated numbers to build a heap:",
        content: <HeapVisualizer />
      }
    ],
      quizQuestions: [
      {
        question: "What's the difference between a heap and a binary search tree?",
        options: ["A heap maintains the heap property between parent and child nodes, while a binary search tree maintains a specific ordering between left and right children.", 
          "A heap has a time complexity of O(log n) for insert and delete operations, while a binary search tree has a time complexity of O(n).", 
          "A heap is a balanced binary tree, while a binary search tree is an unbalanced binary tree."],
        correctAnswer: "A heap maintains the heap property between parent and child nodes, while a binary search tree maintains a specific ordering between left and right children.",
        explanation: "While both are tree data structures, a binary search tree maintains a specific ordering between left and right children, while a heap only maintains the heap property between parent and child nodes."
      },
      {
        question: "When should I use a heap?",
        options: ["When you need to maintain the max or min value in constant time.", 
          "When you need to maintain a specific ordering between left and right children.", 
          "When you need to maintain a balanced binary tree."],
        correctAnswer: "When you need to maintain the max or min value in constant time.",
        explanation: "Heaps are useful when you need to maintain the max or min value in constant time, such as in priority queues or heap sort."
      }, 
      {
        question: "What is the time complexity of building a heap?",
        options: ["O(n)", "O(log n)", "O(n^2)"],
        correctAnswer: "O(n)",
        explanation: "The time complexity of building a heap is O(n)."
      },
      {
        question: "What is the time complexity of deleting an element from a heap?",
        options: ["O(log n)", "O(n)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "The time complexity of deleting an element from a heap is O(log n)."
      },
      {
        question: "What is the time complexity of getting the minimum or maximum element from a heap?",
        options: ["O(log n)", "O(n)", "O(1)"],
        correctAnswer: "O(1)",
        explanation: "The time complexity of getting the minimum or maximum element from a heap is O(1)."
      }
    ]
  };

  return <ExplanationTemplate {...heapContent} />;
};

export default Heap;