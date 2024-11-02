import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import HeapVisualizer from './HeapVisualizer';
import HeapOperationsVisualizer from './HeapOperationsVisualizer';

const Heap = () => {
  const heapContent = {
    topic: "Heap Data Structure",
    description: "Heap is a tree-based data structure that satisfies the heap property - where each parent node is greater (in a max heap) or smaller (in a min heap) than its children. The key process is called 'heapify', which repeatedly compares a node with its children and swaps when necessary. Heaps are used in priority queues, operating system schedulers, and finding k largest/smallest elements in a dataset.",
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
            <li className="list-item">Build Heap: O(n) using Floyd's algorithm. It works by starting from the last non-leaf node and performing heapify operations up to the root. While each heapify operation could take log(n) steps, nodes closer to the leaves have fewer children to check, so bottom nodes finish quickly while only top nodes need full comparisons. This distribution of work - where half the nodes are leaves (0 steps), a quarter need 1 step, an eighth need 2 steps, and so on - adds up to O(n) rather than O(n*log n).</li>
            <li className="list-item">Insert: O(log n) because as the new element may need to bubble up from the bottom to the top of the heap, traversing at most the height of the tree, which is log n for a binary heap.</li>
            <li className="list-item">Delete from the root: O(log n) because after removing the root, the last element is moved to the top and may need to bubble down to its correct position, potentially traversing the entire height of the heap.</li>
            <li className="list-item">Get Min/Max: O(1) because in a heap, this element is always at the root and can be accessed directly without any comparisons or traversals.</li>
          </ul>
        )
      }
    ],
    visualizations: [
      {
        instructions: "Enter comma-separated numbers to build a heap:",
        content: <HeapVisualizer />
      }, 
      {
        instructions: "Try inserting new values or deleting the root node:",
        content: <HeapOperationsVisualizer />
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