import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import BSTVisualizer from './BSTVisualizer.jsx';

const BST = () => {
  const bstContent = {
    topic: "Binary Search Tree Data Structure",
    description: "A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children, with all left subtree values being less than the parent node and all right subtree values being greater than the parent node.",
    sections: [
      {
        title: "Properties of BST",
        content: (
          <div>
            <h3 className="subsection-title">1. Node Structure</h3>
            <p className="content-paragraph">Each node contains a value and references to two child nodes (left and right).</p>
            
            <h3 className="subsection-title">2. Ordering Property</h3>
            <p className="content-paragraph">For any node:</p>
            <ul className="list-disc pl-6">
              <li>All values in left subtree are less than the node's value.</li>
              <li>All values in right subtree are greater than the node's value</li>
            </ul>
            
            <h3 className="subsection-title">3. Balance</h3>
            <p className="content-paragraph">A BST can be balanced or unbalanced, affecting performance.</p>
          </div>
        )
      },
      {
        title: "Time Complexity",
        content: (
          <ul className="list-container">
            <li className="list-item">Search: O(log n) average case, O(n) worst case for highly unbalanced trees</li>
            <li className="list-item">Insert: O(log n) average case, following a search path from root to leaf</li>
            <li className="list-item">Delete: O(log n) average case, may require restructuring</li>
            <li className="list-item">Traversal: O(n) to visit all nodes</li>
            <li className="list-item">Space Complexity: O(n) for storage, O(h) for recursion stack where h is height</li>
          </ul>
        )
      }
    ],
    visualizations: [
      {
        instructions: "Insert numbers one by one to build a binary search tree:",
        content: <BSTVisualizer />
      }
    ],
    quizQuestions: [
      {
        question: "What distinguishes a BST from a regular binary tree?",
        options: [
          "The ordering property between parent and child nodes", 
          "The number of children each node can have", 
          "The balance factor of the tree"
        ],
        correctAnswer: "The ordering property between parent and child nodes",
        explanation: "A BST maintains a specific ordering where left child values are less than the parent and right child values are greater."
      },
      {
        question: "What is the time complexity of searching in a balanced BST?",
        options: ["O(log n)", "O(n)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "In a balanced BST, each comparison eliminates half of the remaining nodes."
      },
      {
        question: "When might a BST's performance degrade to O(n)?",
        options: [
          "When the tree becomes completely unbalanced (like a linked list)", 
          "When the tree is perfectly balanced",
          "When the tree has duplicate values"
        ],
        correctAnswer: "When the tree becomes completely unbalanced (like a linked list)",
        explanation: "An unbalanced BST can degrade into a linear structure, making operations take O(n) time."
      }
    ]
  };

  return <ExplanationTemplate {...bstContent} />;
};

export default BST;