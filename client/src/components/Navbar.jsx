import { motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, cartItemCount } = useCart();

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
          {/* Use the cart button directly in Navbar */}
          <button
            onClick={toggleCart}
            className="relative text-gray-800 hover:text-gray-600 focus:outline-none"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

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
            <Link
              to="/"
              className="block py-2 text-gray-800 hover:text-gray-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 text-gray-800 hover:text-gray-600"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
