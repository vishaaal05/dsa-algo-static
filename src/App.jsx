import { motion } from "framer-motion";
import { useState } from "react";

function App() {
  const [hoveredAlgo, setHoveredAlgo] = useState(null);

  const algorithms = [
    {
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
      visualData: [64, 34, 25, 12, 22, 11, 90], // Sample array for visualization
    },
    {
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
      visualData: [-2, 1, -3, 4, -1, 2, 1, -5, 4], // Sample array for visualization
    },
    {
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
      visualData: [2, 3, 4, 10, 40, 50, 60, 70], // Sorted array for visualization
      target: 10,
    },
  ];

  const ArrayVisual = ({ data, highlightIndices = [] }) => (
    <div className="flex space-x-2 mt-4">
      {data.map((num, idx) => (
        <motion.div
          key={idx}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-bold ${
            highlightIndices.includes(idx) ? "bg-green-500" : "bg-indigo-600"
          }`}
          animate={{ scale: highlightIndices.includes(idx) ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white flex flex-col items-center p-6 overflow-hidden">
      {/* Header with Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Algorithm Odyssey
      </motion.h1>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        {algorithms.map((algo, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-300"
            onHoverStart={() => setHoveredAlgo(index)}
            onHoverEnd={() => setHoveredAlgo(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
          >
            {/* Card Header */}
            <h2 className="text-3xl font-bold mb-3 text-cyan-300">
              {algo.name}
            </h2>
            <p className="text-gray-300 mb-4">{algo.desc}</p>

            {/* Time Complexity */}
            <div className="mb-4">
              <span className="text-sm text-gray-400">Time Complexity: </span>
              <span className="text-lg font-semibold text-yellow-400">
                {algo.time}
              </span>
            </div>

            {/* Visual Array */}
            <ArrayVisual
              data={algo.visualData}
              highlightIndices={
                hoveredAlgo === index
                  ? algo.name === "Binary Search"
                    ? [3] // Highlight target (10) in Binary Search
                    : algo.name === "Kadane's Algorithm"
                    ? [3, 4, 5, 6] // Highlight max subarray [4, -1, 2, 1]
                    : [0, 1] // Highlight merging in Merge Sort
                  : []
              }
            />

            {/* Pseudocode */}
            <motion.pre
              className="bg-gray-900/80 p-4 mt-4 rounded-md text-sm text-green-400 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hoveredAlgo === index ? "auto" : 0,
                opacity: hoveredAlgo === index ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {algo.pseudo}
            </motion.pre>

            {/* Decorative Glow */}
            <motion.div
              className="absolute -z-10 inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredAlgo === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 text-gray-400 text-sm"
      >
        Crafted with Vite, Tailwind CSS, and Framer Motion | © 2025
      </motion.footer>
    </div>
  );
}

export default App;
