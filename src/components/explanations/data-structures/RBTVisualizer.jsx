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
  const [comparisonNodes, setComparisonNodes] = useState([]);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const deepCopyTree = (node) => {
    if (!node) return null;
    return {
      value: node.value,
      left: deepCopyTree(node.left),
      right: deepCopyTree(node.right)
    };
  };

  const generateInsertSteps = (root, value) => {
    const steps = [];
    
    const traverse = (node, path = []) => {
      if (!node) {
        steps.push({
          tree: path.length ? deepCopyTree(root) : null,
          highlighted: path,
          message: `Found insertion point for ${value}`,
          type: 'position'
        });
        return { value, left: null, right: null };
      }

      steps.push({
        tree: deepCopyTree(root),
        comparing: [node.value, value],
        message: `Comparing ${value} with ${node.value}`,
        type: 'comparison'
      });

      if (value < node.value) {
        steps.push({
          tree: deepCopyTree(root),
          highlighted: [node.value],
          message: `${value} is less than ${node.value}, going left`,
          type: 'direction'
        });
        node.left = traverse(node.left, [...path, node.value]);
      } else {
        steps.push({
          tree: deepCopyTree(root),
          highlighted: [node.value],
          message: `${value} is greater than or equal to ${node.value}, going right`,
          type: 'direction'
        });
        node.right = traverse(node.right, [...path, node.value]);
      }

      return node;
    };

    if (!root) {
      steps.push({
        tree: { value, left: null, right: null },
        highlighted: [value],
        message: `Creating root node with value ${value}`,
        type: 'insert'
      });
      return steps;
    }

    const workingTree = deepCopyTree(root);
    traverse(workingTree);
    steps.push({
      tree: workingTree,
      highlighted: [value],
      message: `Inserted ${value} into the tree`,
      type: 'complete'
    });

    return steps;
  };

  const generateSearchSteps = (root, value) => {
    const steps = [];
    
    const traverse = (node) => {
      if (!node) {
        steps.push({
          tree: root,
          message: `Value ${value} not found in the tree`,
          type: 'notfound'
        });
        return false;
      }

      steps.push({
        tree: root,
        comparing: [node.value, value],
        message: `Comparing ${value} with ${node.value}`,
        type: 'comparison'
      });

      if (value === node.value) {
        steps.push({
          tree: root,
          highlighted: [node.value],
          message: `Found ${value}!`,
          type: 'found'
        });
        return true;
      }

      if (value < node.value) {
        steps.push({
          tree: root,
          highlighted: [node.value],
          message: `${value} is less than ${node.value}, going left`,
          type: 'direction'
        });
        return traverse(node.left);
      }

      steps.push({
        tree: root,
        highlighted: [node.value],
        message: `${value} is greater than ${node.value}, going right`,
        type: 'direction'
      });
      return traverse(node.right);
    };

    traverse(root);
    return steps;
  };

  const generateDeleteSteps = (root, targetValue) => {
    const steps = [];
  
    const findMin = (node) => {
      let current = node;
      let parent = node;
      
      while (current.left) {
        parent = current;
        current = current.left;
      }
      return { value: current.value, node: current, parent };
    };
  
    const removeNode = (node, value) => {
      if (!node) return null;
  
      if (node.value !== value) {
        steps.push({
          tree: deepCopyTree(root),
          comparing: [node.value, value],
          message: `Looking for ${value}`,
          type: 'comparison'
        });
      }
  
      if (value < node.value) {
        node.left = removeNode(node.left, value);
      } 
      else if (value > node.value) {
        node.right = removeNode(node.right, value);
      }
      else {
        // Node to delete found
        steps.push({
          tree: deepCopyTree(root),
          highlighted: [node.value],
          message: `Found node ${node.value} to delete`,
          type: 'found'
        });
  
        // Case 1: No children
        if (!node.left && !node.right) {
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [node.value],
            message: `Removing leaf node ${node.value}`,
            type: 'delete'
          });
          return null;
        }
        
        // Case 2: One child
        if (!node.left) {
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [node.value, node.right.value],
            message: `Replacing ${node.value} with its right child ${node.right.value}`,
            type: 'replace'
          });
          return node.right;
        }
        
        if (!node.right) {
          steps.push({
            tree: deepCopyTree(root),
            highlighted: [node.value, node.left.value],
            message: `Replacing ${node.value} with its left child ${node.left.value}`,
            type: 'replace'
          });
          return node.left;
        }
  
        // Case 3: Two children
        const { value: successorValue } = findMin(node.right);
        
        steps.push({
          tree: deepCopyTree(root),
          highlighted: [successorValue],
          message: `Found successor ${successorValue}, replacing ${node.value} and removing successor`,
          type: 'successor'
        });
  
        node.value = successorValue;
        node.right = removeNode(node.right, successorValue);
      }
      return node;
    };
  
    const workingTree = deepCopyTree(root);
    const finalTree = removeNode(workingTree, targetValue);
  
    if (finalTree) {
      steps.push({
        tree: finalTree,
        message: 'Deletion complete',
        type: 'complete'
      });
    } else {
      steps.push({
        tree: null,
        message: 'Tree is now empty',
        type: 'complete'
      });
    }
  
    return steps;
  };

  const handleOperation = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    let newSteps = [];
    switch (mode) {
      case 'insert':
        newSteps = generateInsertSteps(tree, value);
        break;
      case 'delete':
        newSteps = generateDeleteSteps(tree, value);
        break;
      case 'search':
        newSteps = generateSearchSteps(tree, value);
        break;
      default:
        setMessage('Please select an operation');
        return;
    }

    setSteps(newSteps);
    setCurrentStepIndex(-1);
    setIsAnimating(true);
    setInputValue('');
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < steps.length) {
      const nextIndex = currentStepIndex + 1;
      const step = steps[nextIndex];
      
      setCurrentStepIndex(nextIndex);
      setTree(step.tree);
      setHighlightedNodes(step.highlighted || []);
      setComparisonNodes(step.comparing || []);
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
            fill={getNodeColor(layout.value)}
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

  const getNodeColor = (value) => {
    if (comparisonNodes.includes(value)) return '#eab308';
    if (highlightedNodes.includes(value)) return '#22c55e';
    return '#3b82f6';
  };

  const treeLayout = calculateNodePosition(tree);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Binary Search Tree Visualizer</span>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="w-[200px]">
              <SelectValue value={mode} placeholder="Select Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insert">Insert Node</SelectItem>
              <SelectItem value="delete">Delete Node</SelectItem>
              <SelectItem value="search">Search Node</SelectItem>
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
              placeholder={`Enter a number to ${mode}`}
              className="flex-1 text-xl p-4"
              disabled={isAnimating}
            />
            <Button 
              onClick={handleOperation}
              className="px-6 py-2"
              disabled={isAnimating}
            >
              {mode === 'insert' ? 'Insert' : mode === 'delete' ? 'Delete' : 'Search'}
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