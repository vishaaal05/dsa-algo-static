import { motion } from "framer-motion";

const ArrayVisual = ({ data, highlightIndices = [], controls }) => {
  return (
    <div className="flex space-x-2 mt-4">
      {data.map((num, idx) => (
        <motion.div
          key={idx}
          custom={idx} // Pass index for custom animation
          className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-bold ${
            highlightIndices.includes(idx) ? "bg-green-500" : "bg-indigo-600"
          }`}
          animate={controls} // Apply animation controls
          transition={{ duration: 0.3 }}
        >
          {num}
        </motion.div>
      ))}
    </div>
  );
};

export default ArrayVisual;