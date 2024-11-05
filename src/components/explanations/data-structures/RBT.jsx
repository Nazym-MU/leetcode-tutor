import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import RBTVisualizer from './RBTVisualizer';

const RBT = () => {
  const rbtContent = {
    topic: "Red-Black Tree Data Structure",
    description: "Binary Search Trees are not always balanced, which might make the operations less efficient than in a balanced tree. So how to keep it balanced? Here's how -> A Red-Black Tree (RBT) is a self-balancing binary search tree where each node has an extra color property, either RED or BLACK, helping ensure the tree remains balanced during operations. It has main 5 properties that must be satisfied to maintain balance.",
    sections: [
      {
        title: "Properties of Red-Black Trees",
        content: (
          <div>
            <h3 className="subsection-title">1. Node Colors</h3>
            <p className="content-paragraph">Every node is either RED or BLACK</p>
            
            <h3 className="subsection-title">2. Root Property</h3>
            <p className="content-paragraph">The root must be BLACK</p>
            
            <h3 className="subsection-title">3. Red Property</h3>
            <p className="content-paragraph">RED nodes cannot have RED children (No two RED nodes can be adjacent)</p>
            
            <h3 className="subsection-title">4. Black Height Property</h3>
            <p className="content-paragraph">Every path from root to NULL has the same number of BLACK nodes</p>
            
            <h3 className="subsection-title">5. Leaf Property</h3>
            <p className="content-paragraph">All NULL leaves are considered BLACK</p>
          </div>
        )
      },
      {
        title: "Time Complexity",
        content: (
          <div>
            <p className="content-paragraph">Red-Black Trees guarantee O(log n) time complexity for basic operations:</p>
            <ul className="list-disc pl-6">
              <li className="list-item">Search: O(log n)</li>
              <li className="list-item">Insert: O(log n)</li>
              <li className="list-item">Delete: O(log n)</li>
            </ul>
            <p className="content-paragraph mt-4">The balanced nature of Red-Black Trees ensures these time complexities even in worst-case scenarios.</p>
          </div>
        )
      },
      {
        title: "Balancing Operations",
        content: (
          <div>
            <h3 className="subsection-title">1. Recoloring</h3>
            <p className="content-paragraph">Changing the colors of nodes to maintain Red-Black properties</p>
            
            <h3 className="subsection-title">2. Rotations</h3>
            <p className="content-paragraph">Two types of rotations are used:</p>
            <ul className="list-disc pl-6">
              <li>Left Rotation: Used when right subtree becomes heavier</li>
              <li>Right Rotation: Used when left subtree becomes heavier</li>
            </ul>
            
            <h3 className="subsection-title">3. Insert Fixes</h3>
            <p className="content-paragraph">After insertion:</p>
            <ul className="list-disc pl-6">
              <li>New nodes are always inserted as RED</li>
              <li>If parent is BLACK, no fixing needed</li>
              <li>If parent is RED, apply recoloring and/or rotations</li>
            </ul>
          </div>
        )
      },
      {
        title: "Applications",
        content: (
          <div>
            <p className="content-paragraph">Red-Black Trees are widely used in:</p>
            <ul className="list-disc pl-6">
              <li>Standard Template Library (STL) in C++</li>
              <li>Java TreeMap and TreeSet implementations</li>
              <li>Linux Kernel's Completely Fair Scheduler</li>
              <li>Database indexing</li>
              <li>File system implementations</li>
            </ul>
          </div>
        )
      }
    ],
    visualizations: [
      {
        title: "Red-Black Tree Visualization",
        instructions: "Insert numbers to build a red-black tree. Watch how the tree maintains its balance through recoloring and rotations:",
        content: <RBTVisualizer />
      }
    ],
    quizQuestions: [
      {
        question: "What is the color of a newly inserted node in a Red-Black Tree?",
        options: [
          "RED",
          "BLACK",
          "Depends on the parent node"
        ],
        correctAnswer: "RED",
        explanation: "New nodes are always colored RED because this minimizes violations of Red-Black properties."
      },
      {
        question: "Which property ensures the tree's balance?",
        options: [
          "All paths must have same number of RED nodes",
          "All paths must have same number of BLACK nodes",
          "All leaves must be RED nodes"
        ],
        correctAnswer: "All paths must have same number of BLACK nodes",
        explanation: "The black-height property ensures that all paths from root to leaves have the same number of BLACK nodes, maintaining balance."
      },
      {
        question: "What is the maximum possible height of a Red-Black Tree with n nodes?",
        options: [
          "2 log(n)",
          "log(n)",
          "2 log(n + 1)"
        ],
        correctAnswer: "2 log(n + 1)",
        explanation: "The height is at most 2 log(n + 1) due to the balance properties enforced by node coloring."
      }
    ]
  };

  return <ExplanationTemplate {...rbtContent} />;
};

export default RBT;