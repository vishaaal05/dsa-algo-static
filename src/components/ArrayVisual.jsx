import { motion } from "framer-motion";

const ArrayVisual = ({ data, highlightIndices = [], controls, isDark }) => {
  return (
    <div className="flex space-x-2 mt-4">
      {data.map((num, idx) => (
        <motion.div
          key={idx}
          custom={idx}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${isDark ? "text-white" : "text-gray-800"} font-bold ${
            highlightIndices.includes(idx) ? (isDark ? "bg-green-500" : "bg-pink-300") : (isDark ? "bg-indigo-600" : "bg-purple-200")
          }`}
          animate={controls}
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.div>
      ))}
    </div>
  );
};

export default ArrayVisual;