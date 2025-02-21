import { motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="hidden md:inline-block text-gray-800 hover:text-gray-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden md:inline-block text-gray-800 hover:text-gray-600"
          >
            About
          </Link>
        </div>

        <div className="text-2xl font-bold text-gray-800">Logo</div>

        <div className="flex items-center space-x-4">
          <a href="#cart" className="text-gray-800 hover:text-gray-600">
            <ShoppingCart className="w-6 h-6" />
          </a>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <ul className="flex flex-col p-4">
          <li>
            <a
              href="#home"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block py-2 text-gray-800 hover:text-gray-600"
            >
              About
            </a>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
