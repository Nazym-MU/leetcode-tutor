import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ArrowRight } from 'lucide-react';

const RBTVisualizer = () => {
  const [tree, setTree] = useState(null);
  const [mode, setMode] = useState('insert');
  const [inputValue, setInputValue] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [rotatingNodes, setRotatingNodes] = useState([]);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const createNode = (value, color = 'RED') => ({
    value,
    color,
    left: null,
    right: null,
    parent: null
  });

  const deepCopyTree = (node) => {
    if (!node) return null;
    const newNode = {
      value: node.value,
      color: node.color,
      left: null,
      right: null,
      parent: null
    };
    if (node.left) {
      newNode.left = deepCopyTree(node.left);
      newNode.left.parent = newNode;
    }
    if (node.right) {
      newNode.right = deepCopyTree(node.right);
      newNode.right.parent = newNode;
    }
    return newNode;
  };

  // RBT Helper Functions
  const rotateLeft = (root, node) => {
    const rightChild = node.right;
    node.right = rightChild.left;
    
    if (rightChild.left) {
      rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (!node.parent) {
      root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
    
    return root;
  };

  const rotateRight = (root, node) => {
    const leftChild = node.left;
    node.left = leftChild.right;
    
    if (leftChild.right) {
      leftChild.right.parent = node;
    }
    
    leftChild.parent = node.parent;
    
    if (!node.parent) {
      root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    
    leftChild.right = node;
    node.parent = leftChild;
    
    return root;
  };

  const fixInsertViolation = (root, node, steps) => {
    let current = node;
    
    while (current !== root && current.parent.color === 'RED') {
      if (current.parent === current.parent.parent.right) {
        const uncle = current.parent.parent.left;
        
        if (uncle && uncle.color === 'RED') {
          uncle.color = 'BLACK';
          current.parent.color = 'BLACK';
          current.parent.parent.color = 'RED';
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [uncle.value, current.parent.value, current.parent.parent.value],
            message: 'Recoloring nodes to maintain Red-Black properties',
            type: 'recolor'
          });
          current = current.parent.parent;
        } else {
          if (current === current.parent.left) {
            current = current.parent;
            steps.push({
              tree: deepCopyTree(root),
              rotating: [current.value],
              message: 'Right rotation needed',
              type: 'rotate'
            });
            root = rotateRight(root, current);
          }
          current.parent.color = 'BLACK';
          current.parent.parent.color = 'RED';
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [current.parent.value, current.parent.parent.value],
            message: 'Left rotation and recoloring',
            type: 'recolor'
          });
          root = rotateLeft(root, current.parent.parent);
        }
      } else {
        const uncle = current.parent.parent.right;
        
        if (uncle && uncle.color === 'RED') {
          uncle.color = 'BLACK';
          current.parent.color = 'BLACK';
          current.parent.parent.color = 'RED';
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [uncle.value, current.parent.value, current.parent.parent.value],
            message: 'Recoloring nodes to maintain Red-Black properties',
            type: 'recolor'
          });
          current = current.parent.parent;
        } else {
          if (current === current.parent.right) {
            current = current.parent;
            steps.push({
              tree: deepCopyTree(root),
              rotating: [current.value],
              message: 'Left rotation needed',
              type: 'rotate'
            });
            root = rotateLeft(root, current);
          }
          current.parent.color = 'BLACK';
          current.parent.parent.color = 'RED';
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [current.parent.value, current.parent.parent.value],
            message: 'Right rotation and recoloring',
            type: 'recolor'
          });
          root = rotateRight(root, current.parent.parent);
        }
      }
    }
    
    root.color = 'BLACK';
    return root;
  };

  const generateInsertSteps = (root, value) => {
    const steps = [];
    
    if (!root) {
      const newNode = createNode(value, 'BLACK');
      steps.push({
        tree: newNode,
        highlighted: [value],
        message: `Creating root node with value ${value} (colored BLACK)`,
        type: 'insert'
      });
      return steps;
    }
    
    let current = root;
    const newNode = createNode(value);
    let parent = null;
    
    while (current) {
      parent = current;
      steps.push({
        tree: deepCopyTree(root),
        highlighted: [current.value],
        message: `Comparing ${value} with ${current.value}`,
        type: 'comparison'
      });
      
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    newNode.parent = parent;
    
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    
    steps.push({
      tree: deepCopyTree(root),
      highlighted: [value],
      message: `Inserted ${value} as RED node`,
      type: 'insert'
    });
    
    // Fix Red-Black tree violations
    root = fixInsertViolation(root, newNode, steps);
    
    steps.push({
      tree: deepCopyTree(root),
      message: 'Red-Black tree properties restored',
      type: 'complete'
    });
    
    return steps;
  };

  const handleOperation = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    let newSteps = [];
    if (mode === 'insert') {
      newSteps = generateInsertSteps(tree, value);
      setSteps(newSteps);
      setCurrentStepIndex(-1);
      setIsAnimating(true);
      setInputValue('');
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < steps.length) {
      const nextIndex = currentStepIndex + 1;
      const step = steps[nextIndex];
      
      setCurrentStepIndex(nextIndex);
      setTree(step.tree);
      setHighlightedNodes(step.highlighted || []);
      setRotatingNodes(step.rotating || []);
      setMessage(step.message);

      if (nextIndex === steps.length - 1) {
        setIsAnimating(false);
      }
    }
  };

  const calculateNodePosition = (node, level = 0, offset = 400, spacing = 200) => {
    if (!node) return null;
    
    return {
      x: offset,
      y: level * 60 + 40,
      value: node.value,
      color: node.color,
      left: node.left ? calculateNodePosition(node.left, level + 1, offset - spacing / (level + 1)) : null,
      right: node.right ? calculateNodePosition(node.right, level + 1, offset + spacing / (level + 1)) : null
    };
  };
  
  const drawTree = (nodeLayout) => {
    if (!nodeLayout) return null;
  
    const nodes = [];
    const edges = [];
  
    const traverse = (layout) => {
      if (!layout) return;
  
      if (layout.left) {
        edges.push(
          <line
            key={`edge-${layout.value}-${layout.left.value}`}
            x1={layout.x}
            y1={layout.y}
            x2={layout.left.x}
            y2={layout.left.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        );
        traverse(layout.left);
      }
  
      if (layout.right) {
        edges.push(
          <line
            key={`edge-${layout.value}-${layout.right.value}`}
            x1={layout.x}
            y1={layout.y}
            x2={layout.right.x}
            y2={layout.right.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        );
        traverse(layout.right);
      }
  
      nodes.push(
        <g key={`node-${layout.value}`}>
          <circle
            cx={layout.x}
            cy={layout.y}
            r="20"
            fill={getNodeColor(layout.value, layout.color)}
            className="transition-colors duration-300"
          />
          <text
            x={layout.x}
            y={layout.y}
            textAnchor="middle"
            dy=".3em"
            fill="white"
            fontSize="14"
          >
            {layout.value}
          </text>
        </g>
      );
    };
  
    traverse(nodeLayout);
    return [...edges, ...nodes];
  };

  const getNodeColor = (value, nodeColor) => {
    if (rotatingNodes.includes(value)) return '#eab308';
    if (highlightedNodes.includes(value)) return '#22c55e';
    return nodeColor === 'RED' ? '#ef4444' : '#1e293b';
  };

  const treeLayout = calculateNodePosition(tree);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Red-Black Tree Visualizer</span>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-[200px]">
              <SelectValue value={mode} placeholder="Select Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insert">Insert Node</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number to insert"
              className="flex-1 text-xl p-4"
              disabled={isAnimating}
            />
            <Button 
              onClick={handleOperation}
              className="px-6 py-2"
              disabled={isAnimating}
            >
              Insert
            </Button>
          </div>

          {isAnimating && (
            <Button 
              onClick={handleNextStep}
              className="w-full py-3"
              disabled={currentStepIndex === steps.length - 1}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Next Step
            </Button>
          )}

          {message && (
            <div className="text-lg p-4 rounded bg-gray-100">{message}</div>
          )}

          <div className="relative h-[400px] border rounded-lg overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
              {treeLayout && drawTree(treeLayout)}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RBTVisualizer;