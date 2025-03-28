import { useState } from "react";
import Header from "./components/Header";
import AlgorithmCard from "./components/AlgorithmCard";
import Footer from "./components/Footer";

function App() {
  const [hoveredAlgo, setHoveredAlgo] = useState(null);
  const [isDark, setIsDark] = useState(true);

  const algorithms = [
    {
      index: 1,
      name: "Merge Sort",
      desc: "A divide-and-conquer algorithm that recursively splits an array into halves, sorts them, and merges them back together.",
      time: "O(n log n)",
      pseudo: `mergeSort(arr):
  if arr.length <= 1:
    return arr
  mid = arr.length / 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`,
      visualData: [64, 34, 25, 12, 22, 11, 90],
    },
    {
      index: 2,
      name: "Kadane's Algorithm",
      desc: "Finds the maximum sum subarray by tracking the maximum sum ending at each position, ideal for handling negative numbers.",
      time: "O(n)",
      pseudo: `kadane(arr):
  maxSoFar = arr[0]
  maxEndingHere = arr[0]
  for i from 1 to arr.length-1:
    maxEndingHere = max(arr[i], 
    maxEndingHere + arr[i])
    maxSoFar = max(maxSoFar, 
    maxEndingHere)
  return maxSoFar`,
      visualData: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    },
    {
      index: 3,
      name: "Binary Search",
      desc: "Efficiently locates a target in a sorted array by halving the search space with each step.",
      time: "O(log n)",
      pseudo: `binarySearch(arr, target):
  left = 0
  right = arr.length - 1
  while left <= right:
    mid = (left + right) / 2
    if arr[mid] == target:
      return mid
    else if arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
  return -1`,
      visualData: [2, 3, 4, 10, 40, 50, 60, 70],
      target: 50, // Changed from 10 to 50
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-indigo-100 to-purple-100 text-gray-900"
      } flex flex-col items-center p-6 overflow-hidden`}
    >
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <div className="grid grid-cols-1 gap-10 max-w-3xl w-full">
        {algorithms.map((algo) => (
          <AlgorithmCard
            key={algo.index}
            algo={algo}
            hoveredAlgo={hoveredAlgo}
            setHoveredAlgo={setHoveredAlgo}
            index={algo.index}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;