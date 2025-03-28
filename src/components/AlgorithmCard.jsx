import { motion, AnimatePresence } from "framer-motion";
import ArrayVisual from "./ArrayVisual";

const AlgorithmCard = ({ algo, hoveredAlgo, setHoveredAlgo, index }) => {
  const handleSimulation = () => {
    console.log(`Simulating ${algo.name}`); // Placeholder for simulation logic
    // You can add step-by-step animation logic here using useAnimation if desired
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
          hoveredAlgo === index
            ? algo.name === "Binary Search"
              ? [3] // Highlight target (10)
              : algo.name === "Kadane's Algorithm"
              ? [3, 4, 5, 6] // Highlight max subarray [4, -1, 2, 1]
              : [0, 1] // Highlight merging in Merge Sort
            : []
        }
      />

      <button
        onClick={handleSimulation}
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
      >
        Run Simulation
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