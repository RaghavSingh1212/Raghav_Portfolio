"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCode, FaFolder, FaGraduationCap, FaEnvelope } from "react-icons/fa";
import MobileNav from "./MobileNav";

  const Header = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
            {
          name: "Home",
          path: "/",
          section: "home",
          icon: <FaHome size={16} />
        },
        {
          name: "About Me",
          path: "#services",
          section: "services",
          icon: <FaUser size={16} />
        },
        {
          name: "Journey",
          path: "#resume",
          section: "resume",
          icon: <FaGraduationCap size={16} />
        },
        {
          name: "Skills",
          path: "#skills",
          section: "skills",
          icon: <FaCode size={16} />
        },
        {
          name: "Projects",
          path: "#work",
          section: "work",
          icon: <FaFolder size={16} />
        },
        {
          name: "Contact",
          path: "#contact",
          section: "contact",
          icon: <FaEnvelope size={16} />
        }
  ];

  const scrollToSection = (event, id, sectionName) => {
    event.preventDefault();
    setActiveSection(sectionName);
    const section = document.querySelector(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", selector: "section:first-of-type" },
        { id: "services", selector: "#services" },
        { id: "resume", selector: "#resume" },
        { id: "skills", selector: "#skills" },
        { id: "work", selector: "#work" },
        { id: "contact", selector: "#contact" }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i].selector);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 py-3 px-8 backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl shadow-2xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-center items-center gap-4">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.section;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={item.path}
                  onClick={(e) => item.path !== "/" ? scrollToSection(e, item.path, item.section) : setActiveSection("home")}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium transition-all duration-300 relative group text-sm ${
                    isActive 
                      ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Tablet Navigation - Icons Only */}
        <nav className="hidden md:flex lg:hidden items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.section;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={item.path}
                  onClick={(e) => item.path !== "/" ? scrollToSection(e, item.path, item.section) : setActiveSection("home")}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 relative group ${
                    isActive 
                      ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/20" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  title={item.name}
                >
                  {item.icon}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </motion.header>
  );
};

export default Header;
