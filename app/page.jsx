"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import { motion } from "framer-motion";

// Import the page components
import Services from "@/app/services/page";
import Resume from "@/app/resume/page";
import Work from "@/app/work/page";
import Contact from "@/app/contact/page";
import Skills from "@/app/skills/page";

const Home = () => {
  return (
    <div className="relative">
      {/* Home Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
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

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col xl:flex-row items-center gap-x-8 h-full pt-40 pb-10">
            {/* text */}
            <div className="flex-1 text-center xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl xl:text-6xl font-bold mb-6 text-gray-100">
                  Hello I&apos;m <br /> <span className="text-gradient-cyan">Raghav Singh</span>
                </h1>
                <p className="max-w-[500px] mb-9 text-gray-300 text-xl">
                  I&apos;m a driven problem-solver with a passion for AI and software engineering, always seeking to innovate and deliver impactful, scalable solutions.
                </p>
                <div className="flex flex-col xl:flex-row items-center gap-8">
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center xl:justify-start">
                    <a
                      href="https://drive.google.com/file/d/1Gy2msCuiYsZ7_9BntdhHQw_DEw4ZL8B7/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 text-lg tracking-wide group"
                    >
                      <svg className="text-2xl group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em"><path d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                      Resume
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raghavsingh1212"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-emerald-400 transition-all duration-300 text-lg tracking-wide group"
                    >
                      <svg className="text-2xl group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/RaghavSingh1212"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold shadow-lg hover:from-gray-900 hover:to-gray-700 transition-all duration-300 text-lg tracking-wide group"
                    >
                      <svg className="text-2xl group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.589 8.199-6.085 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* image */}
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Photo />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Resume Section */}
      <section id="resume">
        <Resume />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Work Section */}
      <section id="work">
        <Work />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
      
    </div>
  );
};

export default Home;
