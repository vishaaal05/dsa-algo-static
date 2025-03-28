import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState } from "react";
import ArrayVisual from "./ArrayVisual";

const AlgorithmCard = ({ algo, hoveredAlgo, setHoveredAlgo, index, isDark }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [solvedData, setSolvedData] = useState(null);
  const [searchTarget, setSearchTarget] = useState(algo.target || "");
  const controls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const mergeSort = async (arr, start, end) => {
    console.log(`mergeSort called with start: ${start}, end: ${end}`);
    if (end - start <= 1) {
      console.log(`Base case reached: ${arr.slice(start, end)}`);
      return arr.slice(start, end);
    }
    const mid = Math.floor((start + end) / 2);

    const left = await mergeSort(arr, start, mid);
    const right = await mergeSort(arr, mid, end);

    const merged = merge(left, right);
    console.log(`Merged result for ${start}-${end}: ${merged}`);
    for (let i = 0; i < merged.length; i++) {
      arr[start + i] = merged[i];
    }

    console.log(`Animating merged section ${start}-${end}`);
    await controls.start((i) => ({
      scale: i >= start && i < end ? 1.2 : 1,
      backgroundColor: i >= start && i < end ? (isDark ? "#10B981" : "#F9A8D4") : (isDark ? "#4F46E5" : "#C4B5FD"),
    }));
    console.log(`Animation for ${start}-${end} completed`);
    await sleep(800);

    return arr.slice(start, end);
  };

  const merge = (left, right) => {
    console.log(`Merging left: ${left}, right: ${right}`);
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      result.push(left[i] < right[j] ? left[i++] : right[j++]);
    }
    const merged = [...result, ...left.slice(i), ...right.slice(j)];
    console.log(`Merge result: ${merged}`);
    return merged;
  };

  const kadanesAlgorithm = async (arr) => {
    console.log("Starting Kadane's Algorithm");
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

      console.log(`Animating Kadane's step ${i}`);
      await controls.start((idx) => ({
        scale: idx <= i ? 1.2 : 1,
        backgroundColor: idx <= i ? (isDark ? "#10B981" : "#F9A8D4") : (isDark ? "#4F46E5" : "#C4B5FD"),
      }));
      console.log(`Animation for Kadane's step ${i} completed`);
      await sleep(500);
    }
    console.log(`Kadane's result: maxSum=${maxSoFar}, subarray=${arr.slice(start, end + 1)}`);
    return { maxSum: maxSoFar, subarray: arr.slice(start, end + 1) };
  };

  const binarySearch = async (arr, target) => {
    console.log(`Starting Binary Search for target: ${target}`);
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      console.log(`Animating Binary Search step: mid=${mid}`);
      await controls.start((i) => ({
        scale: i === mid ? 1.2 : i >= left && i <= right ? 1.1 : 1,
        backgroundColor: i === mid ? (isDark ? "#10B981" : "#F9A8D4") : i >= left && i <= right ? (isDark ? "#4F46E5" : "#C4B5FD") : (isDark ? "#4F46E5" : "#C4B5FD"),
      }));
      console.log(`Animation for Binary Search step mid=${mid} completed`);
      await sleep(500);

      if (arr[mid] === target) {
        console.log(`Target ${target} found at index: ${mid}`);
        return mid;
      }
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    console.log(`Target ${target} not found`);
    return -1;
  };

  const runSimulation = async () => {
    if (isSimulating) {
      console.log("Simulation already in progress, exiting");
      return;
    }
    console.log(`Starting simulation for ${algo.name}`);
    setIsSimulating(true);
    setSolvedData(null);

    try {
      console.log("Resetting elements");
      await new Promise((resolve) => {
        controls.start({
          scale: 1,
          backgroundColor: isDark ? "#4F46E5" : "#C4B5FD",
          transition: { duration: 0.5 },
        }).then(resolve).catch((err) => {
          console.error("Reset animation error:", err);
          resolve();
        });
      });
      console.log("Reset animation started");
      await sleep(200);
      console.log("Reset complete");

      if (algo.name === "Merge Sort") {
        console.log("Running Merge Sort");
        const sortedArray = await mergeSort([...algo.visualData], 0, algo.visualData.length);
        console.log("Merge Sort completed, sorted array:", sortedArray);
        await controls.start({
          scale: 1,
          backgroundColor: isDark ? "#4F46E5" : "#C4B5FD",
        });
        await sleep(500);

        setSolvedData(sortedArray);
        console.log("Animating solved array");
        await controls.start({
          scale: 1.2,
          backgroundColor: isDark ? "#10B981" : "#F9A8D4",
        });
        await sleep(1500);
        await controls.start({ scale: 1 });
        console.log("Solved array animation completed");
      } else if (algo.name === "Kadane's Algorithm") {
        console.log("Running Kadane's Algorithm");
        const { maxSum, subarray } = await kadanesAlgorithm([...algo.visualData]);
        console.log("Kadane's Algorithm completed");
        await controls.start({
          scale: 1,
          backgroundColor: isDark ? "#4F46E5" : "#C4B5FD",
        });
        await sleep(500);

        setSolvedData(subarray);
        console.log("Animating solved array");
        await controls.start((i) => ({
          scale: i < subarray.length ? 1.2 : 1,
          backgroundColor: i < subarray.length ? (isDark ? "#10B981" : "#F9A8D4") : (isDark ? "#4F46E5" : "#C4B5FD"),
        }));
        await sleep(1000);
        await controls.start({ scale: 1 });
        console.log("Solved array animation completed");
      } else if (algo.name === "Binary Search") {
        console.log("Running Binary Search");
        const targetNum = parseInt(searchTarget, 10) || algo.target;
        const targetIndex = await binarySearch([...algo.visualData], targetNum);
        console.log("Binary Search completed");
        await controls.start({
          scale: 1,
          backgroundColor: isDark ? "#4F46E5" : "#C4B5FD",
        });
        await sleep(500);

        setSolvedData(targetIndex !== -1 ? [algo.visualData[targetIndex]] : ["Not Found"]);
        console.log("Animating solved array");
        await controls.start((i) => ({
          scale: targetIndex === i ? 1.2 : 1,
          backgroundColor: targetIndex === i ? (isDark ? "#10B981" : "#F9A8D4") : targetIndex === -1 ? (isDark ? "#EF4444" : "#FCA5A5") : (isDark ? "#4F46E5" : "#C4B5FD"),
        }));
        await sleep(1000);
        await controls.start({ scale: 1 });
        console.log("Solved array animation completed");
      }
      console.log("Simulation completed successfully");
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      console.log("Setting isSimulating to false");
      setIsSimulating(false);
    }
  };

  return (
    <motion.div
      className={`relative ${isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-blue-100/80 border-blue-500"} backdrop-blur-md p-6 rounded-xl shadow-xl border hover:shadow-2xl transition-all duration-300 w-full`}
      onMouseEnter={() => setHoveredAlgo(index)}
      onMouseLeave={() => setHoveredAlgo(null)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <h2 className={`text-3xl font-bold mb-3 ${isDark ? "text-cyan-300" : "text-blue-600"}`}>{algo.name}</h2>
      <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{algo.desc}</p>

      <div className="mb-4">
        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Time Complexity: </span>
        <span className={`text-lg font-semibold ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>{algo.time}</span>
      </div>

      <div>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Question Array:</p>
        <ArrayVisual
          data={algo.visualData}
          highlightIndices={
            hoveredAlgo === index && !isSimulating && !solvedData
              ? algo.name === "Binary Search"
                ? [5]
                : algo.name === "Kadane's Algorithm"
                ? [3, 4, 5, 6]
                : [0, 1]
              : []
          }
          controls={controls}
          isDark={isDark}
        />
      </div>

      {solvedData && (
        <div className="mt-4">
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>
            {algo.name === "Merge Sort"
              ? "Sorted Array:"
              : algo.name === "Kadane's Algorithm"
              ? "Max Subarray:"
              : solvedData[0] === "Not Found"
              ? "Result:"
              : "Target Found:"}
          </p>
          <ArrayVisual
            data={solvedData}
            highlightIndices={[]}
            controls={controls}
            isDark={isDark}
          />
        </div>
      )}

      {algo.name === "Binary Search" && (
        <div className="mt-4 flex space-x-2">
          <input
            type="number"
            value={searchTarget}
            onChange={(e) => setSearchTarget(e.target.value)}
            placeholder="Enter number to search"
            className={`p-2 rounded-md ${isDark ? "text-black" : "text-gray-800 bg-gray-100"} w-32`}
          />
          <button
            onClick={() => {
              console.log("Run Simulation button clicked");
              runSimulation();
            }}
            disabled={isSimulating}
            className={`px-4 py-2 ${
              isSimulating
                ? "bg-gray-500"
                : isDark
                ? "bg-cyan-500 hover:bg-cyan-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors`}
          >
            {isSimulating ? "Simulating..." : "Run Simulation"}
          </button>
        </div>
      )}

      {algo.name !== "Binary Search" && (
        <button
          onClick={() => {
            console.log("Run Simulation button clicked");
            runSimulation();
          }}
          disabled={isSimulating}
          className={`mt-4 px-4 py-2 ${
            isSimulating
              ? "bg-gray-500"
              : isDark
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md transition-colors`}
        >
          {isSimulating ? "Simulating..." : "Run Simulation"}
        </button>
      )}

      <AnimatePresence>
        {hoveredAlgo === index && (
          <motion.pre
            className={`p-4 mt-4 rounded-md text-sm ${isDark ? "bg-gray-900/80 text-green-400" : "bg-gray-100/80 text-green-600"} overflow-hidden`}
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
            className={`absolute -z-10 inset-0 rounded-xl ${isDark ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20" : "bg-gradient-to-r from-blue-200/20 to-pink-200/20"} blur-2xl`}
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