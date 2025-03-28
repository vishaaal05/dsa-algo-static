import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="mt-36 text-gray-400 text-sm flex sticky bottom-0"
    >
      Made with ❤️ | © 2025
    </motion.footer>
  );
};

export default Footer;