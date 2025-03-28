const Footer = ({ isDark }) => {
    return (
      <footer className={`mt-16 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <p> Made with ❤️ | © 2025</p>
      </footer>
    );
  };
  
  export default Footer;

import { motion } from "framer-motion";
