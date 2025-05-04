import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg sticky top-0 z-50"
    style={{
      backgroundImage: 'url("/images/subtle-prism.svg")',
      backgroundSize: "cover",
    }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="../images/SP_Logo.jpg"
              alt="SP Electro Logo"
              className="w-24 h-15 rounded-2xl mr-20"
            />
          </Link>
          {/* <Link to="/" className="flex items-center">
            <img
              src="../images/SP_Logos.jpg"
              alt="SP Electro Logo"
              className="w-24 h-24 rounded-full object-contain"
            />
          </Link> */}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/vehicles"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Vehicles
            </Link>
            <Link
              to="/accessories"
              className="text-gray-700 hover:text-blue-600 transition duration-200"
            >
              Accessories
            </Link>
            <Link
              to="/appointment"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Book Appointment
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-4 pt-4 pb-4 space-y-2 bg-white border-t border-gray-200">
              <Link
                to="/vehicles"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                Vehicles
              </Link>
              <Link
                to="/accessories"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/appointment"
                className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
