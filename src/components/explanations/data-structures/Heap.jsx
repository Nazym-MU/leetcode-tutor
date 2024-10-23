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
            <h3 className="text-xl mb-3">1. Max Heap</h3>
            <p className="mb-4">In a max heap, the value of each node is greater than or equal to its children.</p>
            
            <h3 className="text-xl mb-3">2. Min Heap</h3>
            <p>In a min heap, the value of each node is less than or equal to its children.</p>
          </div>
        )
      },
      {
        title: "Time Complexity",
        content: (
          <ul className="list-disc pl-6 space-y-2">
            <li>Build Heap: O(n)</li>
            <li>Insert: O(log n)</li>
            <li>Delete: O(log n)</li>
            <li>Get Min/Max: O(1)</li>
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
    faqs: [
      {
        question: "What's the difference between a heap and a binary search tree?",
        answer: "While both are tree data structures, a binary search tree maintains a specific ordering between left and right children, while a heap only maintains the heap property between parent and child nodes."
      },
      {
        question: "When should I use a heap?",
        answer: "Heaps are particularly useful for implementing priority queues, finding the k-th largest/smallest elements, and in algorithms like heap sort."
      }
    ]
  };

  return <ExplanationTemplate {...heapContent} />;
};

export default Heap;