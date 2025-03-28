import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState } from "react";
import ArrayVisual from "./ArrayVisual";

const AlgorithmCard = ({ algo, hoveredAlgo, setHoveredAlgo, index }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const controls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runSimulation = async () => {
    setIsSimulating(true);

    if (algo.name === "Merge Sort") {
      let arr = [...algo.visualData];
      for (let size = 1; size < arr.length; size *= 2) {
        for (let left = 0; left < arr.length; left += size * 2) {
          const mid = Math.min(left + size, arr.length);
          const right = Math.min(left + size * 2, arr.length);

          // Highlight left half
          await controls.start((i) => ({
            scale: i >= left && i < mid ? 1.2 : 1,
            backgroundColor: i >= left && i < mid ? "#10B981" : "#4F46E5",
          }));
          await sleep(500);

          // Highlight right half
          await controls.start((i) => ({
            scale: i >= mid && i < right ? 1.2 : 1,
            backgroundColor: i >= mid && i < right ? "#10B981" : "#4F46E5",
          }));
          await sleep(500);
        }
      }
      // Reset
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
    } else if (algo.name === "Kadane's Algorithm") {
      let maxSoFar = algo.visualData[0];
      let maxEndingHere = algo.visualData[0];
      for (let i = 1; i < algo.visualData.length; i++) {
        maxEndingHere = Math.max(algo.visualData[i], maxEndingHere + algo.visualData[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);

        // Highlight current subarray
        await controls.start((idx) => ({
          scale: idx <= i ? 1.2 : 1,
          backgroundColor: idx <= i ? "#10B981" : "#4F46E5",
        }));
        await sleep(500);
      }
      // Reset
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
    } else if (algo.name === "Binary Search") {
      let left = 0;
      let right = algo.visualData.length - 1;
      const target = algo.target;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Highlight current range and mid
        await controls.start((i) => ({
          scale: i === mid ? 1.2 : i >= left && i <= right ? 1.1 : 1,
          backgroundColor:
            i === mid ? "#10B981" : i >= left && i <= right ? "#4F46E5" : "#4F46E5",
        }));
        await sleep(500);

        if (algo.visualData[mid] === target) break;
        else if (algo.visualData[mid] < target) left = mid + 1;
        else right = mid - 1;
      }
      // Reset
      await controls.start((i) => ({
        scale: 1,
        backgroundColor: "#4F46E5",
      }));
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
        data={algo.visualData}
        highlightIndices={
          hoveredAlgo === index && !isSimulating
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