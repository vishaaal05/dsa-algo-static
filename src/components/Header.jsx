import { motion } from "framer-motion";

const Header = ({ isDark, toggleTheme }) => {
  return (
    <header className="relative flex justify-between items-center w-full max-w-6xl mb-16">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Algorithm Odyssey
      </motion.h1>
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
};

export default Header;