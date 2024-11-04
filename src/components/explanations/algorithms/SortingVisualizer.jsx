import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../ui/select';
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
      steps.push({
        array: [...arr],
        comparing: [i],
        message: `Starting new pass: finding minimum element to place at position ${i}`
      });
      
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arr],
          comparing: [minIndex, j],
          message: `Checking if ${arr[j]} is smaller than current minimum ${arr[minIndex]}`
        });

        if (arr[j] < arr[minIndex]) {
          steps.push({
            array: [...arr],
            comparing: [j],
            message: `Found new minimum: ${arr[j]}`
          });
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push({
          array: [...arr],
          swapped: [i, minIndex],
          message: `Placed minimum element ${arr[i]} at position ${i}`
        });
      } else {
        steps.push({
          array: [...arr],
          comparing: [i],
          message: `Element ${arr[i]} is already in its correct position`
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
      steps.push({
        array: [...arr],
        comparing: [i],
        message: `Taking element ${key} to insert into sorted portion`
      });

      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          message: `${arr[j]} is greater than ${key}, shifting it right`
        });

        arr[j + 1] = arr[j];
        j = j - 1;
      }

      arr[j + 1] = key;
      steps.push({
        array: [...arr],
        swapped: [j + 1],
        message: `Found correct position for ${key}, inserted at index ${j + 1}`
      });
    }
    return steps;
};

const generateQuickSortSteps = (arr) => { 
    const steps = [];
    const n = arr.length;

    const quickSort = (arr, low, high) => {
        if (low < high) {
            steps.push({
                array: [...arr],
                comparing: [high],
                message: `Choosing ${arr[high]} as pivot`
            });
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    };

    const partition = (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
            array: [...arr],
            comparing: [high],
            message: `Partitioning array with pivot ${pivot}`
        });

        for (let j = low; j < high; j++) {
            steps.push({
                array: [...arr],
                comparing: [j, high],
                message: `Is ${arr[j]} less than pivot ${pivot}?`
            });

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                if (i !== j) {
                    steps.push({
                        array: [...arr],
                        swapped: [i, j],
                        message: `Moving ${arr[i]} to the left side of pivot`
                    });
                }
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({
            array: [...arr],
            swapped: [i + 1, high],
            message: `Placing pivot ${pivot} in its final position`
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
            steps.push({
                array: [...arr],
                comparing: [l, r],
                message: `Dividing array from index ${l} to ${r}`
            });
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    };

    const merge = (arr, l, m, r) => {
        steps.push({
            array: [...arr],
            comparing: [l, r],
            message: `Merging subarrays from index ${l} to ${r}`
        });

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
                message: `Comparing elements: ${L[i]} and ${R[j]}`
            });

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                steps.push({
                    array: [...arr],
                    swapped: [k],
                    message: `Placing smaller element ${L[i]} in position ${k}`
                });
                i++;
            } else {
                arr[k] = R[j];
                steps.push({
                    array: [...arr],
                    swapped: [k],
                    message: `Placing smaller element ${R[j]} in position ${k}`
                });
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            steps.push({
                array: [...arr],
                swapped: [k],
                message: `Copying remaining element ${L[i]} from left subarray`
            });
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            steps.push({
                array: [...arr],
                swapped: [k],
                message: `Copying remaining element ${R[j]} from right subarray`
            });
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
        steps.push({
            array: [...arr],
            comparing: [i],
            message: `Heapifying subtree rooted at index ${i}`
        });

        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            steps.push({
                array: [...arr],
                comparing: [largest, left],
                message: `Comparing root ${arr[largest]} with left child ${arr[left]}`
            });
        }

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
            steps.push({
                array: [...arr],
                comparing: [largest],
                message: `Left child ${arr[largest]} is larger than root`
            });
        }

        if (right < n) {
            steps.push({
                array: [...arr],
                comparing: [largest, right],
                message: `Comparing largest ${arr[largest]} with right child ${arr[right]}`
            });
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
            steps.push({
                array: [...arr],
                comparing: [largest],
                message: `Right child ${arr[largest]} is the largest`
            });
        }
        
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({
                array: [...arr],
                swapped: [i, largest],
                message: `Swapped ${arr[i]} with ${arr[largest]} to maintain heap property`
            });
            heapify(arr, n, largest);
        }
    };

    const heapSort = (arr) => {
        steps.push({
            array: [...arr],
            message: "Building max heap..."
        });

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        steps.push({
            array: [...arr],
            message: "Max heap built. Starting to extract elements..."
        });

        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            steps.push({
                array: [...arr],
                swapped: [0, i],
                message: `Moved largest element ${arr[i]} to end of array`
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
                {selectedAlgorithm ? (
                    {
                    bubble: "Bubble Sort",
                    selection: "Selection Sort",
                    insertion: "Insertion Sort",
                    quick: "QuickSort",
                    merge: "MergeSort",
                    heap: "HeapSort"
                    }[selectedAlgorithm]
                ) : (
                    'Choose sorting method'
                )}
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="quick">QuickSort</SelectItem>
                <SelectItem value="merge">MergeSort</SelectItem>
                <SelectItem value="heap">HeapSort</SelectItem>
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