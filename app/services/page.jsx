"use client";

import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";


const companyData = [
  {
    name: "UC Santa Cruz",
    logo: "/assets/ucsc.png",
    description: "Computer Science Student",
    date: "Sep 2022 - Dec 2025",
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
    name: "UCSC Blueprint",
    logo: "/assets/blue.png",
    description: "Web Developer",
    date: "Mar 2024 - May 2024",
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
    date: "Jun 2025 - Present",
    type: "experience"
  },
  {
    name: "Keywords Studios",
    logo: "/assets/key.png",
    description: "AI Researcher",
    date: "Jan 2026 - Present",
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
        className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-full"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 border-2 border-blue-400/40 rotate-45"
        animate={{
          y: [0, 20, 0],
          rotate: [45, 405],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg"
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
        className="absolute bottom-20 right-10 w-24 h-24 border border-cyan-300/25 rounded-full"
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
      
      {/* Additional dynamic shapes */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-8 h-8 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/3 w-6 h-6 border border-purple-400/40 rotate-12"
        animate={{
          x: [0, -40, 0],
          y: [0, 25, 0],
          rotate: [12, 372],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-10 h-10 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-lg"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 90, 180, 270, 360],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400/60 rounded-full"
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-400/50 rounded-full"
        animate={{
          y: [0, -80, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/2 w-1 h-1 bg-emerald-400/70 rounded-full"
        animate={{
          y: [0, -60, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3E3B3A 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Enhanced gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-500/15 to-blue-600/15 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-600/15 to-purple-700/15 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-full blur-lg"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Animated lines */}
      <motion.div
        className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{
          x: [-100, 100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-l from-transparent via-blue-400/25 to-transparent"
        animate={{
          x: [100, -100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Pulsing circles */}
      <motion.div
        className="absolute top-1/6 right-1/6 w-16 h-16 border border-cyan-400/20 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/6 left-1/6 w-20 h-20 border border-blue-400/15 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
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
      className="pt-32 pb-16 relative min-h-screen flex items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Parallax overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5"
        style={{ y }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Section: About Me */}
          <motion.div 
            className="flex-1 w-full lg:max-w-[50%]"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5"
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
                className="text-justify text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-gray-300 whitespace-pre-wrap overflow-hidden min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]"
              >
                {isVisible && (
                  <Typewriter
                    options={{
                      strings: [
                        'I am a Computer Science student at the University of California, Santa Cruz, graduated in December 2025. Over the past couple of years, I’ve had the chance to work across both infrastructure and applied AI at Scale AI, I focused on advancing large language models by fine-tuning and evaluating them on complex reasoning tasks. I contributed to improving model safety through red-teaming efforts, identified vulnerabilities, and designed benchmarks to assess edge-case performance. These efforts provided daily insights that refined research outcomes and optimized training pipelines. At Nutanix, I developed a containerized benchmarking platform to evaluate LLM inference on CPUs. I combined Docker Compose, FastAPI, and Prometheus for real-time monitoring and built a Streamlit frontend backed by SQLite for streamlined analytics. This platform enabled performance comparisons across hardware, guided deployment decisions, and delivered significant cost savings through better resource allocation. Together, these experiences have strengthened my foundation in scalable AI systems, benchmarking, and the practical application of containerization tools.'
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
            className="flex-1 w-full lg:max-w-[50%]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Timeline Section */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative hidden lg:block">
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

            {/* Mobile Timeline */}
            <div className="lg:hidden w-full">
              <div className="space-y-4">
                {companyData.map((company, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-emerald-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.img
                          src={company.logo}
                          alt={`${company.name} Logo`}
                          className="w-8 h-8 object-contain rounded-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-white">{company.name}</h4>
                          <p className="text-xs text-emerald-400">{company.date}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{company.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
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
