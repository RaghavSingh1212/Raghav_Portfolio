"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaCode, FaFolder, FaGraduationCap, FaEnvelope, FaTimes } from "react-icons/fa";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    {
      name: "Home",
      path: "/",
      section: "home",
      icon: <FaHome size={20} />
    },
    {
      name: "About Me",
      path: "#services",
      section: "services",
      icon: <FaUser size={20} />
    },
    {
      name: "Journey",
      path: "#resume",
      section: "resume",
      icon: <FaGraduationCap size={20} />
    },
    {
      name: "Skills",
      path: "#skills",
      section: "skills",
      icon: <FaCode size={20} />
    },
    {
      name: "Projects",
      path: "#work",
      section: "work",
      icon: <FaFolder size={20} />
    },
    {
      name: "Contact",
      path: "#contact",
      section: "contact",
      icon: <FaEnvelope size={20} />
    }
  ];

  const scrollToSection = (event, id, sectionName) => {
    event.preventDefault();
    setActiveSection(sectionName);
    const section = document.querySelector(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <>
              {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
                         {/* Menu Content */}
             <motion.div
               className="absolute top-16 right-4 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">Navigation</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
                </div>
                
                <nav className="space-y-2">
                                     {navItems.map((item, index) => {
                     const isActive = activeSection === item.section;
                     
                     return (
                       <motion.a
                         key={index}
                         href={item.path}
                         onClick={(e) => item.path !== "/" ? scrollToSection(e, item.path, item.section) : (setActiveSection("home"), setIsOpen(false))}
                         className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                           isActive 
                             ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20" 
                             : "text-gray-300 hover:text-white hover:bg-white/5"
                         }`}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.3, delay: index * 0.1 }}
                         whileHover={{ x: 5 }}
                       >
                         <div className={`transition-colors ${isActive ? "text-cyan-400" : "text-cyan-400 group-hover:text-cyan-300"}`}>
                           {item.icon}
                         </div>
                         <span className="font-medium">{item.name}</span>
                         
                         {/* Active indicator */}
                         {isActive && (
                           <motion.div
                             className="w-1 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full ml-auto"
                             initial={{ scaleX: 0 }}
                             animate={{ scaleX: 1 }}
                             transition={{ duration: 0.2 }}
                           />
                         )}
                       </motion.a>
                     );
                   })}
                </nav>
                
                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-center text-xs text-gray-400">
                    <p>Raghav Singh</p>
                    <p className="text-cyan-400">Software Engineer & AI Enthusiast</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav; 