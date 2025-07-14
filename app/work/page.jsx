"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink, FiCode, FiMonitor } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    num: "01",
    title: "CPU GenAI Analytics (Nutanix Inc)",
    description:
      "We built a CPU-focused benchmarking tool that captures detailed metrics across diverse LLMs and hardware configurations, giving Nutanix the data it needs to choose the right model for each workload.",
    stack: ["Python", "FastAPI", "Docker", "vLLM", "Prometheus", "Grafana", "Streamlit", "SQLite"],
    image: "/assets/cpu.png",
    link: "https://csspp.engineering.ucsc.edu/capstone/gen-al-cpu-analytics-nutanix-inc/",
    color: "from-indigo-500 to-purple-500",
  },
  {
    num: "02",
    title: "CircleRush",
    description:
      "Launched CircleRush, boosting task management productivity by 25% with social and competitive features. Enhanced user engagement through registration, group formation, and real-time leaderboard updates.",
    stack: ["ReactNative", "Expo", "Firebase", "Node.js", "TypeScript"],
    image: "/assets/work/thumb1.png",
    github: "https://github.com/RaghavSingh1212/CircleRush",
    color: "from-blue-500 to-cyan-500",
  },
  {
    num: "03",
    title: "AI-Slide Generator",
    description:
      "Developed AI-Slide Generator, an app utilizing React, Python, and the ChatGPT API to automate custom PowerPoint presentations from user prompts. Boosted productivity and connectivity by streamlining the presentation creation process.",
    stack: ["Angular", "Node.js", "OPEN AI GPT 4"],
    image: "/assets/work/thumb2.png",
    github: "https://github.com/RaghavSingh1212/AI-Slide-Generator",
    color: "from-purple-500 to-pink-500",
  },
  {
    num: "04",
    title: "E-Commerce Platform",
    description:
      "Developed a replica of a shopping platform with modern UI/UX design, responsive layout, and seamless user experience.",
    stack: ["React", "Node.js"],
    image: "/assets/work/thumb3.png",
    github: "https://github.com/RaghavSingh1212/E-CommerceSite",
    color: "from-green-500 to-emerald-500",
  },
  {
    num: "05",
    title: "Skyland Game",
    description: "The games challenge players to navigate through a fantasy world, avoiding obstacles and collecting trophies to score points.",
    stack: ["Python", "Pygame", "GUI's"],
    video: "/assets/skyland.mp4",
    github: "https://github.com/RaghavSingh1212/Skyland-Game",
    color: "from-orange-500 to-red-500",
  },
];

const Work = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      <div className="container mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-4">
            My <span className="text-gradient-orange">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300 ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              {index === 0 ? (
                // Special layout for first project: text left, image right
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left side - Text content */}
                  <div className="flex-1">
                    {/* Project Info */}
                    <div className="mb-6">
                      <span className="text-accent text-sm font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-100 mt-2 mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Enhanced Tech Stack */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              y: -2,
                              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-200 text-sm font-medium rounded-xl border border-gray-600/50 hover:border-accent/50 hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/10 transition-all duration-300 backdrop-blur-sm shadow-lg"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={project.link}>
                          <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl transition-all duration-300 border border-indigo-400 hover:border-purple-400 shadow-lg hover:shadow-xl backdrop-blur-sm font-bold">
                            <FiExternalLink className="text-xl" />
                            <span>View Project</span>
                          </button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="flex-1">
                    <div className="relative h-96 rounded-xl overflow-hidden p-8 bg-gradient-to-br from-gray-800/40 to-gray-700/40">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt={project.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular layout for other projects
                <>
                  {/* Project Info */}
                  <div className="mb-4">
                    <span className="text-accent text-sm font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-100 mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Enhanced Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-200 text-sm font-medium rounded-xl border border-gray-600/50 hover:border-accent/50 hover:bg-gradient-to-r hover:from-accent/20 hover:to-accent/10 transition-all duration-300 backdrop-blur-sm shadow-lg"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                    {project.video ? (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        loop
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={project.image}
                        fill
                        className="object-cover"
                        alt={project.title}
                      />
                    )}
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={project.github}>
                        <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl transition-all duration-300 border border-orange-400 hover:border-red-400 shadow-lg hover:shadow-xl backdrop-blur-sm font-bold">
                          <BsGithub className="text-xl" />
                          <span>View Code</span>
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
