"use client";

import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";


const companyData = [
  {
    name: "UC Santa Cruz",
    logo: "/assets/ucsc.png",
    description: "Computer Science Student",
    date: "Sep 2022 - Present",
    type: "education"
  },
  {
    name: "Baskin School of Engineering",
    logo: "/assets/jack.png",
    description: "Group Tutor",
    date: "Sep 2023 - Mar 2025",
    type: "experience"
  },
  {
    name: "Tech4Good",
    logo: "/assets/t4.png",
    description: "Software Developer",
    date: "Jan 2024 - Mar 2025",
    type: "experience"
  },
  {
    name: "UCSC Blueprint",
    logo: "/assets/blue.png",
    description: "Web Developer",
    date: "Mar 2024 - May 2024",
    type: "experience"
  },
  {
    name: "AIEA Lab",
    logo: "/assets/aiea.png",
    description: "Undergraduate Researcher",
    date: "Sep 2024 - Mar 2025",
    type: "experience"
  },
  {
    name: "Nutanix",
    logo: "/assets/nut.png",
    description: "Software Engineer Intern",
    date: "Jan 2025 - Jun 2025",
    type: "experience"
  },
  {
    name: "Scale AI",
    logo: "/assets/sc.png",
    description: "GenAI Intern",
    date: "Jan 2025 - Present",
    type: "experience"
  },
];

// Timeline component with dynamic pointer
const Timeline = ({ timelineData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineData.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [timelineData.length]);

  return (
    <div className="relative">
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent/50 via-accent to-accent/50"></div>
      
      {/* Dynamic moving pointer */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-accent to-accent/80 rounded-full border-2 border-white shadow-lg z-20"
        animate={{
          y: `${(activeIndex * 100) / (timelineData.length - 1)}%`,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute -top-2 -left-2 w-8 h-8 bg-accent/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          className="relative mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Timeline dot */}
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-800 shadow-lg z-10 ${
              index === activeIndex 
                ? 'bg-gradient-to-r from-accent to-accent/80 scale-125' 
                : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
          />
          
          {/* Content container */}
          <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Content card */}
            <motion.div
              className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
            >
              <motion.div
                className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-white/15 border-accent/50 shadow-lg shadow-accent/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  borderColor: "rgba(255,255,255,0.3)"
                }}
              >
                {/* Date */}
                <div className="text-sm font-medium text-accent mb-2">
                  {item.date}
                </div>
                
                {/* Company/University name */}
                <h3 className={`text-lg font-bold mb-2 ${
                  index === activeIndex ? 'text-white' : 'text-gray-100'
                }`}>
                  {item.name}
                </h3>
                
                {/* Role/Description */}
                <p className="text-gray-300 text-sm mb-3">
                  {item.description}
                </p>
                
                {/* Logo */}
                <div className="flex justify-center mb-3">
                  <motion.img
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    className={`h-12 object-contain rounded-sm ${
                      index === activeIndex ? 'brightness-110' : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Type indicator */}
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'education' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {item.type === 'education' ? '🎓 Education' : '💼 Experience'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Spacer for odd items */}
            <div className="w-2/12"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

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

// Company card component
const CompanyCard = ({ company, index }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="p-4 rounded-lg backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 max-w-xs"
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        borderColor: "rgba(255,255,255,0.3)"
      }}
    >
      {/* Company Header */}
      <div className="flex items-center space-x-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-200">{company.name}</h3>
        </div>
      </div>

      {/* Company Logo */}
      <div className="flex justify-center mb-3">
        <motion.img
          src={company.logo}
          alt={`${company.name} Logo`}
          className="h-20 object-contain rounded-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  </motion.div>
);

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const typingSectionRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      if (typingSectionRef.current) {
        const rect = typingSectionRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-16 relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
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
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-6xl font-bold mb-4"
          >
            About <span className="text-gradient-emerald">Me</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Section: About Me */}
          <motion.div 
            className="flex-1 max-w-[50%]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  className="p-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl">👤</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-100">My Story</h3>
              </div>

              {/* Typewriter effect with pre-allocated height */}
              <div
                ref={typingSectionRef}
                className="text-justify text-lg font-medium leading-relaxed text-gray-300 whitespace-pre-wrap overflow-hidden min-h-[360px]"
              >
                {isVisible && (
                  <Typewriter
                    options={{
                      strings: [
                        'I am a Computer Science student at UC Santa Cruz with a strong foundation in software engineering, machine learning, and AI. As a Software Engineer Co-Op Intern at Nutanix, I optimize GenAI inferencing with SIMD instructions and develop performance-monitoring dashboards to enhance efficiency. My research at AIEA Lab focuses on improving Transformer models and integrating AI with logic programming for enhanced inference and decision-making. Previously, as a Software Engineer Intern at Tech4Good, I built responsive UI components and implemented state management for a goal-setting app. Passionate about AI, system design, and full-stack development, I enjoy solving complex problems, optimizing performance, and building scalable applications that drive innovation.'
                      ],
                      autoStart: true,
                      loop: false,
                      deleteSpeed: Infinity,
                      delay: 10,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section: Company Cards */}
          <motion.div 
            className="flex-1 max-w-[50%]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Timeline Section */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative">
                {/* Central Timeline Line - Background */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-600/30"></div>
                
                {/* Progress Trail - Filled portion */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-emerald-400 to-emerald-600 origin-top"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Timeline Entries */}
                <div className="space-y-6">
                  {companyData.map((company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`flex items-center ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Content */}
                      <div className={`w-5/12 ${index % 2 === 0 ? "pr-4" : "pl-4"}`}>
                        <motion.div
                          className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-emerald-400/50 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <motion.img
                              src={company.logo}
                              alt={`${company.name} Logo`}
                              className="w-6 h-6 object-contain rounded-sm"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div>
                              <h4 className="text-xs font-bold text-white">{company.name}</h4>
                              <p className="text-xs text-emerald-400">{company.date}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 mb-1">{company.description}</p>
                          {company.achievements && company.achievements.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {company.achievements.slice(0, 2).map((achievement, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="flex-1 flex justify-center">
                        <motion.div
                          className="w-2 h-2 bg-emerald-400 rounded-full border border-gray-800 shadow-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>

                      {/* Empty space for alternating layout */}
                      <div className="w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional floating elements */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-6xl">🚀</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
