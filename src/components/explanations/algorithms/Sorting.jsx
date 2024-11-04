import React from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import SortingVisualizer from './SortingVisualizer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

const Sorting = () => {
  const sortingContent = {
    topic: "Sorting Algorithms",
    description: "Sorting algorithms are methods for organizing elements of a list in a certain sequence. Different algorithms have different trade-offs in terms of time complexity, space complexity, and stability.",
    sections: [
      {
        title: "Comparison of Sorting Algorithms",
        content: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Algorithm</TableHead>
                <TableHead>Time Complexity (Best)</TableHead>
                <TableHead>Time Complexity (Average)</TableHead>
                <TableHead>Time Complexity (Worst)</TableHead>
                <TableHead>Space Complexity</TableHead>
                <TableHead>Stable</TableHead>
                <TableHead>Use Cases</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Bubble Sort</TableCell>
                <TableCell>O(n) - Already sorted</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(1)</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Small datasets, educational purposes, nearly sorted data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Selection Sort</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(1)</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Small datasets, minimal memory usage required</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Insertion Sort</TableCell>
                <TableCell>O(n) - Nearly sorted</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(n²)</TableCell>
                <TableCell>O(1)</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Small datasets, online sorting (sorting as data arrives)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">QuickSort</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n²) - Poor pivot</TableCell>
                <TableCell>O(log n)</TableCell>
                <TableCell>No</TableCell>
                <TableCell>General purpose, large datasets, good cache performance</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MergeSort</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n)</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>Large datasets, external sorting, stable sorting needed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HeapSort</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(n log n)</TableCell>
                <TableCell>O(1)</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Large datasets, memory constraints, guaranteed performance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
      },
      {
        title: "Algorithm Details",
        content: (
          <div>
            <h3 className="subsection-title">Bubble Sort</h3>
            <p className="content-paragraph">
              Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
              The pass through the list is repeated until no swaps are needed.
              Best case occurs when the list is already sorted, worst case when reverse sorted.
            </p>
            
            <h3 className="subsection-title">Selection Sort</h3>
            <p className="content-paragraph">
              Divides the input list into a sorted and an unsorted region.
              Repeatedly finds the minimum element from the unsorted region and adds it to the sorted region.
              Time complexity is always quadratic as it must scan the entire unsorted region for each position.
            </p>
            
            <h3 className="subsection-title">Insertion Sort</h3>
            <p className="content-paragraph">
              Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.
              Very efficient for small data sets and nearly sorted arrays.
              Adaptive: runtime depends on the initial order of elements.
            </p>
            
            <h3 className="subsection-title">QuickSort</h3>
            <p className="content-paragraph">
              Uses divide-and-conquer strategy. Selects a 'pivot' element and partitions the array around it.
              Performance heavily depends on pivot selection.
              Despite worst-case O(n²), usually outperforms other O(n log n) algorithms in practice due to good cache performance.
            </p>
            
            <h3 className="subsection-title">MergeSort</h3>
            <p className="content-paragraph">
              Divide-and-conquer algorithm that recursively splits array into two halves, sorts them, and merges them.
              Guaranteed O(n log n) performance but requires extra space.
              Stable sort makes it ideal for sorting linked lists and when maintaining relative order is important.
            </p>
            
            <h3 className="subsection-title">HeapSort</h3>
            <p className="content-paragraph">
              Builds a heap from the data and repeatedly extracts the maximum element.
              Combines the best features of selection sort and merge sort.
              In-place algorithm but not stable. Good when memory is tight and guaranteed performance is needed.
            </p>
          </div>
        )
      }
    ],
    visualizations: [
      {
        instructions: "Enter comma-separated numbers and select a sorting algorithm:",
        content: <SortingVisualizer />
      }
    ],
    quizQuestions: [
      {
        question: "Which sorting algorithm has the best worst-case time complexity?",
        options: ["QuickSort", "MergeSort", "Selection Sort", "Bubble Sort"],
        correctAnswer: "MergeSort",
        explanation: "MergeSort guarantees O(n log n) time complexity in all cases, while others can degrade to O(n²) in worst case."
      },
      {
        question: "Which sorting algorithms are stable?",
        options: [
          "Bubble Sort, Insertion Sort, and MergeSort", 
          "QuickSort, HeapSort, and Selection Sort",
          "MergeSort, QuickSort, and Bubble Sort"
        ],
        correctAnswer: "Bubble Sort, Insertion Sort, and MergeSort",
        explanation: "Bubble Sort, Insertion Sort, and MergeSort maintain the relative order of equal elements, making them stable sorts."
      },
      {
        question: "Which sorting algorithm does not sort in-place?",
        options: ["Selection Sort", "MergeSort", "Insertion Sort", "Selection Sort"],
        correctAnswer: "MergeSort",
        explanation: "Selection Sort uses O(n) extra space for temporarily storing the merged array."
      }
    ]
  };

  return <ExplanationTemplate {...sortingContent} />;
};

export default Sorting;