import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const HeapOperationsVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMaxHeap, setIsMaxHeap] = useState(false);
  const [animatingIndices, setAnimatingIndices] = useState([]);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const getParentIndex = (index) => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index) => 2 * index + 1;
  const getRightChildIndex = (index) => 2 * index + 2;

  const shouldSwap = (parentVal, childVal) => {
    return isMaxHeap ? parentVal < childVal : parentVal > childVal;
  };

  const calculateNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelWidth = 800;
    const nodesInLevel = Math.pow(2, level);
    const position = index - Math.pow(2, level) + 1;
    const horizontalSpacing = levelWidth / nodesInLevel;
    const x = (position + 0.5) * horizontalSpacing;
    const y = level * 100 + 40;
    return { x, y };
  };

  const drawConnectingLines = () => {
    return heap.map((_, index) => {
      const leftChild = getLeftChildIndex(index);
      const rightChild = getRightChildIndex(index);
      const lines = [];

      if (leftChild < heap.length) {
        const parent = calculateNodePosition(index);
        const child = calculateNodePosition(leftChild);
        parent.y += 15;
        child.y += 15;
        lines.push(
          <line
            key={`line-${index}-${leftChild}`}
            x1={parent.x}
            y1={parent.y}
            x2={child.x}
            y2={child.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        );
      }

      if (rightChild < heap.length) {
        const parent = calculateNodePosition(index);
        const child = calculateNodePosition(rightChild);
        lines.push(
          <line
            key={`line-${index}-${rightChild}`}
            x1={parent.x}
            y1={parent.y}
            x2={child.x}
            y2={child.y}
            stroke="#94a3b8"
            strokeWidth="2"
          />
        );
      }

      return lines;
    }).flat();
  };

  const generateInsertSteps = (value) => {
    const steps = [];
    const tempArray = [...heap];
    tempArray.push(value);
    
    steps.push({
      array: [...tempArray],
      highlighted: [tempArray.length - 1],
      message: `Added ${value} to the end of the heap`
    });

    let currentIdx = tempArray.length - 1;
    
    while (currentIdx > 0) {
      const parentIdx = getParentIndex(currentIdx);
      
      steps.push({
        array: [...tempArray],
        comparing: [currentIdx, parentIdx],
        message: `Comparing ${tempArray[currentIdx]} with parent ${tempArray[parentIdx]}`
      });

      if (shouldSwap(tempArray[parentIdx], tempArray[currentIdx])) {
        [tempArray[currentIdx], tempArray[parentIdx]] = [tempArray[parentIdx], tempArray[currentIdx]];
        
        steps.push({
          array: [...tempArray],
          swapped: [currentIdx, parentIdx],
          message: `Swapped ${tempArray[currentIdx]} with ${tempArray[parentIdx]}`
        });
        
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
    
    return steps;
  };

  const generateDeleteSteps = () => {
    if (heap.length === 0) return [];
    
    const steps = [];
    const tempArray = [...heap];
    
    steps.push({
      array: [...tempArray],
      highlighted: [0],
      message: `Removing root element ${tempArray[0]}`
    });

    // Replace root with last element
    const lastElement = tempArray.pop();
    if (tempArray.length > 0) {
      tempArray[0] = lastElement;
      
      steps.push({
        array: [...tempArray],
        highlighted: [0],
        message: `Replaced root with last element ${lastElement}`
      });

      let currentIdx = 0;
      
      while (true) {
        let targetIdx = currentIdx;
        const leftChildIdx = getLeftChildIndex(currentIdx);
        const rightChildIdx = getRightChildIndex(currentIdx);

        if (leftChildIdx < tempArray.length && shouldSwap(tempArray[targetIdx], tempArray[leftChildIdx])) {
          targetIdx = leftChildIdx;
        }

        if (rightChildIdx < tempArray.length && shouldSwap(tempArray[targetIdx], tempArray[rightChildIdx])) {
          targetIdx = rightChildIdx;
        }

        if (targetIdx === currentIdx) break;

        steps.push({
          array: [...tempArray],
          comparing: [currentIdx, targetIdx],
          message: `Comparing ${tempArray[currentIdx]} with child ${tempArray[targetIdx]}`
        });

        [tempArray[currentIdx], tempArray[targetIdx]] = [tempArray[targetIdx], tempArray[currentIdx]];
        
        steps.push({
          array: [...tempArray],
          swapped: [currentIdx, targetIdx],
          message: `Swapped ${tempArray[currentIdx]} with ${tempArray[targetIdx]}`
        });

        currentIdx = targetIdx;
      }
    }
    
    return steps;
  };

  const handleInsert = () => {
    try {
      const value = parseInt(inputValue.trim());
      if (isNaN(value)) {
        setMessage('Please enter a valid number');
        return;
      }
      const newSteps = generateInsertSteps(value);
      setSteps(newSteps);
      setCurrentStep(-1);
      setMessage('Click "Next Step" to start insertion');
      setInputValue('');
    } catch (error) {
      setMessage('Invalid input');
    }
  };

  const handleDelete = () => {
    if (heap.length === 0) {
      setMessage('Heap is empty');
      return;
    }
    const newSteps = generateDeleteSteps();
    setSteps(newSteps);
    setCurrentStep(-1);
    setMessage('Click "Next Step" to start deletion');
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setHeap(steps[nextStep].array);
      setAnimatingIndices(
        steps[nextStep].comparing || 
        steps[nextStep].swapped || 
        steps[nextStep].highlighted || 
        []
      );
      setMessage(steps[nextStep].message);
    } else {
      setMessage('Operation complete!');
      setAnimatingIndices([]);
    }
  };

  const getNodeColor = (index) => {
    if (animatingIndices.includes(index)) {
      if (steps[currentStep]?.highlighted) return 'bg-purple-500';
      return animatingIndices.length === 2 && steps[currentStep]?.swapped ? 
        'bg-green-500' : 'bg-yellow-400';
    }
    return isMaxHeap ? 'bg-blue-600' : 'bg-blue-400';
  };

  return (
    <Card className="w-full max-w-4xl mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Insert/Delete Operations</span>
          <Button 
            onClick={() => setIsMaxHeap(!isMaxHeap)}
            variant="outline"
            className="text-xl px-6 py-3 border-2 hover:bg-blue-50"
          >
            Switch to {isMaxHeap ? 'Min' : 'Max'} Heap
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number to insert"
              className="flex-1 text-2xl p-6 font-indie"
            />
            <Button 
              onClick={handleInsert}
              className="text-xl px-8 py-6 font-indie"
            >
              <Plus className="w-5 h-5 mr-2" />
              Insert
            </Button>
            <Button 
              onClick={handleDelete}
              className="text-xl px-8 py-6 font-indie"
              variant="destructive"
            >
              <Minus className="w-5 h-5 mr-2" />
              Delete Root
            </Button>
          </div>

          <Button 
            onClick={handleNextStep}
            disabled={currentStep >= steps.length - 1 && steps.length > 0}
            className="w-full text-xl py-8 font-indie"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Next Step
          </Button>

          {message && (
            <div className="text-lg p-4 rounded bg-gray-100">{message}</div>
          )}

          <div className="relative h-96 border rounded-lg p-4 overflow-hidden">
            <svg className="w-full h-full absolute top-0 left-0">
              {drawConnectingLines()}
            </svg>
            <div className="relative w-full h-full">
              {heap.map((value, index) => {
                const position = calculateNodePosition(index);
                if (index > 0 && (index % 2) === 1) {
                  position.y += 10;
                }
                return (
                  <div
                    key={`${index}-${value}`}
                    className={`absolute rounded-full w-14 h-14 flex items-center justify-center text-white transition-all duration-500 text-xl ${getNodeColor(index)}`}
                    style={{
                      left: `${position.x - 28}px`,
                      top: `${position.y - 28}px`
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeapOperationsVisualizer;