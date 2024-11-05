import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import RBTVisualizer from './RBTVisualizer';

const RBT = () => {
  const rbtContent = {
    topic: "Red-black Tree Data Structure",
    description: "A Red-Black Tree (RBT) is a type of self-balancing binary search tree (BST) that maintains balance through a set of rules.",
    sections: [
      {
        title: "Properties of RBT",
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
        instructions: "Insert numbers one by one to build a red-black tree:",
        content: <RBTVisualizer />
      }
    ],
    quizQuestions: [
      {
        question: "What distinguishes a RBT from a BDT?",
        options: [
            "RBT has additional color property for each node",
            "RBT has a fixed height",
            "RBT has a unique root node"
            ],
        correctAnswer: "RBT has additional color property for each node",
        explanation: "RBT nodes are colored red or black to maintain balance."
      },
    ]
  };

  return <ExplanationTemplate {...rbtContent} />;
};

export default RBT;