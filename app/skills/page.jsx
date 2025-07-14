"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiCode, FiDatabase, FiGlobe, FiTrendingUp, FiLayers, FiMonitor, FiSmartphone, FiServer, FiCloud, FiBox, FiTerminal, FiSettings } from "react-icons/fi";
import Image from "next/image";
import styles from './page.module.css';

const skillsData = [
  {
    category: "Programming Languages",
    icon: <FiCode className="text-xl" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "C/C++" },
      { name: "TypeScript" },
      { name: "RISC-V" },
      { name: "HTML/CSS" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: <FiLayers className="text-xl" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React" },
      { name: "Angular" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Next.js" },
      { name: "Expo" },
      { name: "Flask" },
      { name: "Django" },
    ],
  },
  {
    category: "Data Science & ML",
    icon: <FiTrendingUp className="text-xl" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "Matplotlib" },
      { name: "Apache Spark" },
    ],
  },
  {
    category: "Developer Tools & Cloud",
    icon: <FiCloud className="text-xl" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "Linux/Unix" },
      { name: "Figma" },
    ],
  },
  {
    category: "Programming Concepts",
    icon: <FiSettings className="text-xl" />,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "OOP" },
      { name: "APIs & REST" },
      { name: "JSON" },
      { name: "Embedded Systems" },
    ],
  },
];

// Animated background particles component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-2 border-accent/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 border-2 border-accent/30 rotate-45"
        animate={{
          y: [0, 20, 0],
          rotate: [45, 405],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-accent/10 to-accent/20 rounded-lg"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border border-accent/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3E3B3A 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Compact skill item component
const SkillItem = ({ skill, index }) => (
  <motion.div
    className="flex items-center justify-center border border-white/20 rounded-md px-2 py-1 m-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03, duration: 0.3 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
    }}
    viewport={{ once: true }}
  >
    <span className="text-gray-100 font-medium text-base">{skill.name}</span>
  </motion.div>
);

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="py-20 relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Parallax overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5"
        style={{ y }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl font-bold mb-4"
          >
            My <span className="text-gradient-purple">Skills</span>
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise
          </p>
        </motion.div>

        {/* Skills Grid - Horizontal Layout */}
        <div className="grid grid-cols-5 gap-6">
          {skillsData.map((skillCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="p-6 rounded-xl backdrop-blur-sm border border-white/10"
                style={{ background: 'rgba(255,255,255,0.10)' }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                  borderColor: "rgba(255,255,255,0.3)",
                  background: 'rgba(255,255,255,0.10)'
                }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className={`p-2 rounded-lg bg-gradient-to-r ${skillCategory.color} text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {skillCategory.icon}
                  </motion.div>
                  <h2 className="text-base font-bold text-gray-100">{skillCategory.category}</h2>
                </div>

                {/* Skills List - Compact */}
                <div className="space-y-2">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <SkillItem 
                      key={skillIndex} 
                      skill={skill} 
                      index={skillIndex} 
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
