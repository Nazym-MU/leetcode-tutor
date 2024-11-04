import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Play, ArrowRight } from 'lucide-react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [animatingIndices, setAnimatingIndices] = useState([]);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  const generateSortingSteps = (arr, algorithm) => {
    const steps = [];
    const tempArray = [...arr];
    
    switch (algorithm) {
      case 'bubble':
        return generateBubbleSortSteps(tempArray);
      case 'selection':
        return generateSelectionSortSteps(tempArray);
      case 'insertion':
        return generateInsertionSortSteps(tempArray);
      case 'quick':
        return generateQuickSortSteps(tempArray);
      case 'merge':
        return generateMergeSortSteps(tempArray);
      case 'heap':
        return generateHeapSortSteps(tempArray);
      default:
        return [];
    }
  };

  const generateBubbleSortSteps = (arr) => {
    const steps = [];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          message: `Comparing ${arr[j]} and ${arr[j + 1]}`
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            swapped: [j, j + 1],
            message: `Swapped ${arr[j]} and ${arr[j + 1]}`
          });
        }
      }
    }
    
    return steps;
  };

  const generateSelectionSortSteps = (arr) => {
    const steps = [];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arr],
          comparing: [minIndex, j],
          message: `Comparing ${arr[minIndex]} and ${arr[j]}`
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({
          array: [...arr],
          swapped: [i, minIndex],
          message: `Swapped ${arr[i]} and ${arr[minIndex]}`
        });
      }
    }

    return steps;
};

  const generateInsertionSortSteps = (arr) => {
    const steps = [];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          message: `Comparing ${arr[j]} and ${arr[j + 1]}`
        });

        arr[j + 1] = arr[j];
        j = j - 1;
      }

      arr[j + 1] = key;
      steps.push({
        array: [...arr],
        swapped: [j + 1, i],
        message: `Inserted ${key} into the correct position`
      });
    }
    return steps;
    };

    const generateQuickSortSteps = (arr) => { 
        const steps = [];
        const n = arr.length;

        const quickSort = (arr, low, high) => {
            if (low < high) {
                const pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        };

        const partition = (arr, low, high) => {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                steps.push({
                    array: [...arr],
                    comparing: [j, high],
                    message: `Comparing ${arr[j]} and ${arr[high]}`
                });

                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    steps.push({
                        array: [...arr],
                        swapped: [i, j],
                        message: `Swapped ${arr[i]} and ${arr[j]}`
                    });
                }
            }
            
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            steps.push({
                array: [...arr],
                swapped: [i + 1, high],
                message: `Swapped ${arr[i + 1]} and ${arr[high]}`
            });

            return i + 1;
        };
        quickSort(arr, 0, n - 1);
        return steps;
    };

    const generateMergeSortSteps = (arr) => {
        const steps = [];
        const n = arr.length;

        const mergeSort = (arr, l, r) => {
            if (l < r) {
                const m = Math.floor((l + r) / 2);
                mergeSort(arr, l, m);
                mergeSort(arr, m + 1, r);
                merge(arr, l, m, r);
            }
        };

        const merge = (arr, l, m, r) => {
            const n1 = m - l + 1;
            const n2 = r - m;
            const L = new Array(n1);
            const R = new Array(n2);

            for (let i = 0; i < n1; i++) {
                L[i] = arr[l + i];
            }
            for (let j = 0; j < n2; j++) {
                R[j] = arr[m + 1 + j];
            }

            let i = 0;
            let j = 0;
            let k = l;

            while (i < n1 && j < n2) {
                steps.push({
                    array: [...arr],
                    comparing: [l + i, m + 1 + j],
                    message: `Comparing ${arr[l + i]} and ${arr[m + 1 + j]}`
                });

                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;

            }
        };
        mergeSort(arr, 0, n - 1);
        return steps;
    };

    const generateHeapSortSteps = (arr) => {
        const steps = [];
        const n = arr.length;

        const heapify = (arr, n, i) => {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }
            
            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                steps.push({
                    array: [...arr],
                    swapped: [i, largest],
                    message: `Swapped ${arr[i]} and ${arr[largest]}`
                });
                heapify(arr, n, largest);
            }
        };

        const heapSort = (arr) => {
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(arr, n, i);
            }
            for (let i = n - 1; i > 0; i--) {
                [arr[0], arr[i]] = [arr[i], arr[0]];
                steps.push({
                    array: [...arr],
                    swapped: [0, i],
                    message: `Swapped ${arr[0]} and ${arr[i]}`
                });
                heapify(arr, i, 0);
            }
        };
        heapSort(arr);
        return steps;
    };


  const handleInitialInput = () => {
    try {
      const numbers = inputValue.split(',').map(num => parseInt(num.trim()));
      if (numbers.some(isNaN)) {
        setMessage('Please enter valid numbers separated by commas');
        return;
      }
      setArray(numbers);
      const newSteps = generateSortingSteps(numbers, selectedAlgorithm);
      setSteps(newSteps);
      setCurrentStep(-1);
      setMessage('Click "Next Step" to start sorting');
    } catch (error) {
      setMessage('Invalid input format');
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setArray(steps[nextStep].array);
      setAnimatingIndices(steps[nextStep].comparing || steps[nextStep].swapped || []);
      setMessage(steps[nextStep].message);
    } else {
      setMessage('Sorting complete!');
      setAnimatingIndices([]);
    }
  };

  const getBarColor = (index) => {
    if (animatingIndices.includes(index)) {
      return animatingIndices.length === 2 && steps[currentStep]?.swapped ? 
        'bg-green-500' : 'bg-yellow-400';
    }
    return 'bg-blue-500';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Sorting Visualizer</span>
          <Select
            value={selectedAlgorithm}
            onValueChange={setSelectedAlgorithm}
          >
            <SelectTrigger className="w-60 text-[1.1rem]">
              <SelectValue placeholder='Choose sorting method' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble Sort</SelectItem>
              <SelectItem value="selection">Selection Sort</SelectItem>
              <SelectItem value="insertion">Insertion Sort</SelectItem>
              <SelectItem value="quick">Quick Sort</SelectItem>
              <SelectItem value="merge">Merge Sort</SelectItem>
              <SelectItem value="heap">Heap Sort</SelectItem>
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
              placeholder="Enter numbers (comma-separated)"
              className="flex-1 text-2xl p-6 font-indie"
            />
            <Button 
              onClick={handleInitialInput}
              className="text-xl px-8 py-6 font-indie"
            >
              <Play className="w-5 h-5 mr-2" />
              Initialize
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

          <div className="relative h-64 border rounded-lg p-4">
            <div className="flex items-end justify-around h-full">
              {array.map((value, index) => (
                <div
                  key={`${index}-${value}`}
                  className={`w-12 transition-all duration-500 ${getBarColor(index)}`}
                  style={{
                    height: `${(value / Math.max(...array)) * 100}%`
                  }}
                >
                  <div className="text-center text-sm mt-2">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SortingVisualizer;