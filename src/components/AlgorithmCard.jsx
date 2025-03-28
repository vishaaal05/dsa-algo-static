import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState } from "react";
import ArrayVisual from "./ArrayVisual";

const AlgorithmCard = ({ algo, hoveredAlgo, setHoveredAlgo, index }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [solvedData, setSolvedData] = useState(null); // Store solved result
  const controls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Merge Sort implementation
  const mergeSort = async (arr, start, end) => {
    if (end - start <= 1) return arr.slice(start, end);
    const mid = Math.floor((start + end) / 2);

    // Highlight left half
    await controls.start((i) => ({
      scale: i >= start && i < mid ? 1.2 : 1,
      backgroundColor: i >= start && i < mid ? "#10B981" : "#4F46E5",
    }));
    await sleep(500);

    // Highlight right half
    await controls.start((i) => ({
      scale: i >= mid && i < end ? 1.2 : 1,
      backgroundColor: i >= mid && i < end ? "#10B981" : "#4F46E5",
    }));
    await sleep(500);

    const left = await mergeSort(arr, start, mid);
    const right = await mergeSort(arr, mid, end);
    return merge(left, right);
  };

  const merge = (left, right) => {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  // Kadane's Algorithm implementation
  const kadanesAlgorithm = async (arr) => {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {
      maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
      if (maxEndingHere === arr[i]) tempStart = i;
      if (maxEndingHere > maxSoFar) {
        maxSoFar = maxEndingHere;
        start = tempStart;
        end = i;
      }

      await controls.start((idx) => ({
        scale: idx <= i ? 1.2 : 1,
        backgroundColor: idx <= i ? "#10B981" : "#4F46E5",
      }));
      await sleep(500);
    }
    return { maxSum: maxSoFar, subarray: arr.slice(start, end + 1) };
  };

  // Binary Search implementation
  const binarySearch = async (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      await controls.start((i) => ({
        scale: i === mid ? 1.2 : i >= left && i <= right ? 1.1 : 1,
        backgroundColor: i === mid ? "#10B981" : i >= left && i <= right ? "#4F46E5" : "#4F46E5",
      }));
      await sleep(500);

      if (arr[mid] === target) return mid;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setSolvedData(null); // Reset solved data

    if (algo.name === "Merge Sort") {
      const sortedArray = await mergeSort([...algo.visualData], 0, algo.visualData.length);
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
      await sleep(500);

      // Animate solved array
      setSolvedData(sortedArray);
      await controls.start((i) => ({
        scale: 1.2,
        backgroundColor: "#10B981",
      }));
      await sleep(1000);
      await controls.start((i) => ({ scale: 1 }));
    } else if (algo.name === "Kadane's Algorithm") {
      const { maxSum, subarray } = await kadanesAlgorithm([...algo.visualData]);
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
      await sleep(500);

      // Animate solved subarray
      setSolvedData(subarray);
      await controls.start((i) => ({
        scale: i < subarray.length ? 1.2 : 1,
        backgroundColor: i < subarray.length ? "#10B981" : "#4F46E5",
      }));
      await sleep(1000);
      await controls.start((i) => ({ scale: 1 }));
    } else if (algo.name === "Binary Search") {
      const targetIndex = await binarySearch([...algo.visualData], algo.target);
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
      await sleep(500);

      // Animate solved index
      setSolvedData([algo.visualData[targetIndex]]);
      await controls.start((i) => ({
        scale: i === targetIndex ? 1.2 : 1,
        backgroundColor: i === targetIndex ? "#10B981" : "#4F46E5",
      }));
      await sleep(1000);
      await controls.start((i) => ({ scale: 1 }));
    }

    setIsSimulating(false);
  };

  return (
    <motion.div
      className="relative bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setHoveredAlgo(index)}
      onMouseLeave={() => setHoveredAlgo(null)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-3 text-cyan-300">{algo.name}</h2>
      <p className="text-gray-300 mb-4">{algo.desc}</p>

      <div className="mb-4">
        <span className="text-sm text-gray-400">Time Complexity: </span>
        <span className="text-lg font-semibold text-yellow-400">{algo.time}</span>
      </div>

      <ArrayVisual
        data={solvedData || algo.visualData} // Show solved data if available
        highlightIndices={
          hoveredAlgo === index && !isSimulating && !solvedData
            ? algo.name === "Binary Search"
              ? [3]
              : algo.name === "Kadane's Algorithm"
              ? [3, 4, 5, 6]
              : [0, 1]
            : []
        }
        controls={controls}
      />

      <button
        onClick={runSimulation}
        disabled={isSimulating}
        className={`mt-4 px-4 py-2 ${
          isSimulating ? "bg-gray-500" : "bg-cyan-500 hover:bg-cyan-600"
        } text-white rounded-md transition-colors`}
      >
        {isSimulating ? "Simulating..." : "Run Simulation"}
      </button>

      {solvedData && (
        <p className="mt-2 text-green-400">
          {algo.name === "Merge Sort"
            ? "Sorted Array"
            : algo.name === "Kadane's Algorithm"
            ? "Max Subarray"
            : "Target Found"}
        </p>
      )}

      <AnimatePresence>
        {hoveredAlgo === index && (
          <motion.pre
            className="bg-gray-900/80 p-4 mt-4 rounded-md text-sm text-green-400 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {algo.pseudo}
          </motion.pre>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hoveredAlgo === index && (
          <motion.div
            className="absolute -z-10 inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlgorithmCard;