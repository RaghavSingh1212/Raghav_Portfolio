"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const educationData = [
  {
    year: "2022 - 2026",
    title: "Computer Science - University of California Santa Cruz",
    description:
      "GPA: 3.80/4.0 ; \n\n Relevant Coursework: Data Structures & Algorithms, Operating Systems, Computer Architecture, Distributed Systems, Artificial Intelligence, Machine Learning, Software Design, System Design, Cloud Computing, Abstraction, Python, Assembly Language.",
    logo: "/assets/ucsc.png",
    color: "from-blue-500 to-cyan-500",
  },
];

const experienceData = [
  {
    year: "Jun 2025 - Present",
    title: "GenAI Intern - Scale AI",
    description:
      "Working on cutting-edge AI development projects, focusing on machine learning model optimization and data processing pipelines for large-scale AI applications.",
    logo: "/assets/sc.png",
    color: "from-blue-600 to-indigo-600",
  },
  {
    year: "Jan 2025 - Jun 2025",
    title: "Software Engineer Co-Op Intern - Nutanix",
    description:
      "Optimizing GenAI inferencing with SIMD instructions and enhancing performance with Prometheus/Grafana dashboards. Exploring Retrieval-Augmented Generation to improve AI pipelines.",
    logo: "/assets/nut.png",
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "Jan 2024 - Apr 2025",
    title: "Software Developer - Tech4Good",
    description:
      "Developed UI components for a goal-setting app using Angular and optimized performance with NgRx and RxJS. Created responsive UI components to improve cross-platform compatibility.",
    logo: "/assets/t4.png",
    color: "from-orange-500 to-red-500",
  },
  {
    year: "Sep 2024 - Mar 2025",
    title: "Undergraduate Researcher - AIEA Lab",
    description:
      "Improved Transformer models by reducing hallucination errors and integrated OpenAI's API with SwiProlog for efficient translation of natural language to executable Prolog facts.",
    logo: "/assets/aiea.png",
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "Sep 2023 - Mar 2025",
    title: "Group Tutor - Baskin School of Engineering",
    description:
      "Tutored Intro Python, Abstract Python, Assembly Language, Discrete Math, Data Structure & Algorithm",
    logo: "/assets/jack.png",
    color: "from-indigo-500 to-blue-500",
  },
  {
    year: "Mar 2024 - Jun 2024",
    title: "Web Developer - UCSC Blueprint",
    description:
      "Developed a career matching platform using React and Firebase, aligning 500+ student assessments with job opportunities for personalized career pathways.",
    logo: "/assets/blue.png",
    color: "from-teal-500 to-cyan-500",
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

// Floating tech badges component
const TechBadge = ({ tech, delay }) => (
  <motion.span
    className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.10)] backdrop-blur-sm border border-[rgba(255,255,255,0.20)] rounded-full text-xs font-medium text-gray-200 mr-2 mb-2"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
  >
    {tech}
  </motion.span>
);

const EducationExperience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section 
      ref={containerRef}
      id="education" 
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
            My <span className="text-gradient-blue">Journey</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Education Section */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-8 text-center lg:text-left"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Education
              </span>
            </motion.h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
              
              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <motion.div 
                      className="absolute left-4 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-white shadow-lg"
                      whileHover={{ scale: 1.5 }}
                    />
                    
                    <motion.div
                      className="p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.10)] transition-all duration-300"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        borderColor: "rgba(255,255,255,0.3)"
                      }}
                    >
                      {/* Year badge */}
                      <motion.div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent/80 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {edu.year}
                      </motion.div>
                      
                      {/* Logo and title */}
                      <div className="flex items-center space-x-4 mt-6 mb-4">
                        <img
                          src={edu.logo}
                          alt={`${edu.title} Logo`}
                          className="w-8 h-8 object-contain rounded-lg"
                        />
                        <h3 className="text-xl font-bold text-gray-100">{edu.title}</h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {edu.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-3xl font-bold mb-8 text-center lg:text-left"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
              
              <div className="space-y-8 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-white/10 pr-4">
                {experienceData.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-16"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <motion.div 
                      className="absolute left-4 top-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg"
                      whileHover={{ scale: 1.5 }}
                    />
                    
                    <motion.div
                      className="p-8 rounded-2xl backdrop-blur-sm border border-white/10 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.10)] transition-all duration-300"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        borderColor: "rgba(255,255,255,0.3)"
                      }}
                    >
                      {/* Year badge */}
                      <motion.div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent/80 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {exp.year}
                      </motion.div>
                      
                      {/* Logo and title */}
                      <div className="flex items-center space-x-4 mt-6 mb-4">
                        <img
                          src={exp.logo}
                          alt={`${exp.title} Logo`}
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                        <h3 className="text-xl font-bold text-gray-100">{exp.title}</h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>
                      

                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationExperience;
