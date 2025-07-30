"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about me",
    path: "#services",
  },
  {
    name: "resume",
    path: "#resume",
  },
  {
    name: "skills",
    path: "#skills",
  },
  {
    name: "work",
    path: "#work",
  },
  {
    name: "contact",
    path: "#contact",
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    const section = document.querySelector(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <div className="xl:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-white hover:text-accent transition-colors"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-50 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {links.map((link, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={link.path}
                          onClick={(e) => scrollToSection(e, link.path)}
                          className="block py-3 px-4 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 font-medium"
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700">
                  <div className="text-center text-gray-400 text-sm">
                    <p>Raghav Singh</p>
                    <p className="mt-1">Software Engineer & AI Enthusiast</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav; 