import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Play, ArrowRight } from 'lucide-react';

const HeapVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMaxHeap, setIsMaxHeap] = useState(false);
  const [animatingIndices, setAnimatingIndices] = useState([]);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const getLeftChildIndex = (index) => 2 * index + 1;
  const getRightChildIndex = (index) => 2 * index + 2;

  const shouldSwap = (parentVal, childVal) => {
    return isMaxHeap ? parentVal < childVal : parentVal > childVal;
  };

  const calculateNodePosition = (index) => {
    const level = Math.floor(Math.log2(index + 1));
    const levelWidth = 600;
    const nodesInLevel = Math.pow(2, level);
    const position = index - Math.pow(2, level) + 1;
    const horizontalSpacing = levelWidth / (nodesInLevel + 1);
    const x = (position + 1) * horizontalSpacing;
    const y = level * 80 + 40;
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

  const generateHeapifySteps = (array) => {
    const steps = [];
    const tempArray = [...array];
    
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      let currentIndex = i;
      
      while (true) {
        let targetIndex = currentIndex;
        const leftChild = getLeftChildIndex(currentIndex);
        const rightChild = getRightChildIndex(currentIndex);

        if (leftChild < tempArray.length && shouldSwap(tempArray[targetIndex], tempArray[leftChild])) {
          targetIndex = leftChild;
        }

        if (rightChild < tempArray.length && shouldSwap(tempArray[targetIndex], tempArray[rightChild])) {
          targetIndex = rightChild;
        }

        if (targetIndex !== currentIndex) {
          steps.push({
            array: [...tempArray],
            comparing: [currentIndex, targetIndex],
            message: `Comparing ${tempArray[currentIndex]} with ${tempArray[targetIndex]}`
          });
          
          // Swap
          const temp = tempArray[currentIndex];
          tempArray[currentIndex] = tempArray[targetIndex];
          tempArray[targetIndex] = temp;
          
          steps.push({
            array: [...tempArray],
            swapped: [currentIndex, targetIndex],
            message: `Swapped ${tempArray[currentIndex]} and ${tempArray[targetIndex]}`
          });
          
          currentIndex = targetIndex;
        } else {
          break;
        }
      }
    }
    
    return steps;
  };

  const handleInitialInput = () => {
    try {
      const numbers = inputValue.split(',').map(num => parseInt(num.trim()));
      if (numbers.some(isNaN)) {
        setMessage('Please enter valid numbers separated by commas');
        return;
      }
      setHeap(numbers);
      const newSteps = generateHeapifySteps(numbers);
      setSteps(newSteps);
      setCurrentStep(-1);
      setMessage('Click "Next Step" to start heapification');
    } catch (error) {
      setMessage('Invalid input format');
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setHeap(steps[nextStep].array);
      setAnimatingIndices(steps[nextStep].comparing || steps[nextStep].swapped || []);
      setMessage(steps[nextStep].message);
    } else {
      setMessage('Heapification complete!');
      setAnimatingIndices([]);
    }
  };

  const getNodeColor = (index) => {
    if (animatingIndices.includes(index)) {
      return animatingIndices.length === 2 && steps[currentStep]?.swapped ? 
        'bg-green-500' : 'bg-yellow-400';
    }
    return isMaxHeap ? 'bg-blue-600' : 'bg-blue-400';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{isMaxHeap ? 'Max Heap' : 'Min Heap'} Visualizer</span>
          <Button 
            onClick={() => setIsMaxHeap(!isMaxHeap)}
            variant="outline"
          >
            Toggle Max/Min Heap
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter numbers (comma-separated)"
              className="flex-1"
            />
            <Button onClick={handleInitialInput}>
              <Play className="w-4 h-4 mr-2" />
              Initialize
            </Button>
          </div>

          <Button 
            onClick={handleNextStep}
            disabled={currentStep >= steps.length - 1 && steps.length > 0}
            className="w-full"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Next Step
          </Button>

          {message && (
            <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{message}</div>
          )}

          <div className="relative h-96 border rounded-lg p-4 overflow-hidden">
            <svg className="w-full h-full absolute top-0 left-0">
              {drawConnectingLines()}
            </svg>
            <div className="relative w-full h-full">
              {heap.map((value, index) => {
                const position = calculateNodePosition(index);
                return (
                  <div
                    key={`${index}-${value}`}
                    className={`absolute rounded-full w-12 h-12 flex items-center justify-center text-white transition-all duration-500 ${getNodeColor(index)}`}
                    style={{
                      left: `${position.x - 24}px`,
                      top: `${position.y - 24}px`
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

export default HeapVisualizer;