import { motion } from "framer-motion";

const Header = ({ isDark, toggleTheme }) => {
  return (
    <header className="relative flex justify-center items-center w-full max-w-6xl mb-16">
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className={`text-7xl font-extrabold bg-clip-text text-transparent ${isDark ? "bg-gradient-to-r from-cyan-400 to-pink-500" : "bg-gradient-to-r from-blue-500 to-pink-500"}`}
      >
        Algorithm Showcase
      </motion.h1>
      <button
        onClick={toggleTheme}
        className={`absolute right-0 p-2 ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-200 hover:bg-blue-300"} rounded-full ${isDark ? "text-white" : "text-gray-800"} transition-colors`}
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
};

export default Header;