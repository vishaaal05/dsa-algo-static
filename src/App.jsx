import { motion } from "framer-motion";
import { useState } from "react";

function App() {
  const [hoveredAlgo, setHoveredAlgo] = useState(null);

  const algorithms = [
    {
      name: "Merge Sort",
      desc: "A divide-and-conquer algorithm that splits the array into halves, sorts them, and merges them back.",
      pseudo: `mergeSort(arr):
  if arr.length <= 1:
    return arr
  mid = arr.length / 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`,
    },
    {
      name: "Kadane's Algorithm",
      desc: "Finds the maximum sum subarray in a given array by keeping track of the maximum sum ending at each position.",
      pseudo: `kadane(arr):
  maxSoFar = arr[0]
  maxEndingHere = arr[0]
  for i from 1 to arr.length-1:
    maxEndingHere = max(arr[i], maxEndingHere + arr[i])
    maxSoFar = max(maxSoFar, maxEndingHere)
  return maxSoFar`,
    },
    {
      name: "Binary Search",
      desc: "Efficiently finds an element in a sorted array by repeatedly dividing the search range in half.",
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
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-12"
      >
        Algorithm Showcase
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {algorithms.map((algo, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            onHoverStart={() => setHoveredAlgo(index)}
            onHoverEnd={() => setHoveredAlgo(null)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{algo.name}</h2>
            <p className="text-gray-300 mb-4">{algo.desc}</p>
            <motion.pre
              className="bg-gray-900 p-4 rounded-md text-sm text-green-400"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: hoveredAlgo === index ? "auto" : 0,
                opacity: hoveredAlgo === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {algo.pseudo}
            </motion.pre>
          </motion.div>
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-gray-400"
      >
        Built with Vite, Tailwind CSS, and Framer Motion
      </motion.footer>
    </div>
  );
}

export default App;