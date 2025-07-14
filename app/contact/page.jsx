"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(510) 738-8851",
    link: "tel:+15107388851",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "rsingh77@ucsc.edu",
    link: "mailto:rsingh77@ucsc.edu",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Fremont, CA",
    link: "#",
    color: "from-green-500 to-emerald-500",
  },
];

const socialLinks = [
  {
    icon: <FaLinkedin />,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/raghavsingh1212",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: <FaGithub />,
    title: "GitHub",
    link: "https://github.com/RaghavSingh1212",
    color: "from-gray-700 to-gray-800",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    link: "mailto:rsingh77@ucsc.edu",
    color: "from-red-500 to-red-600",
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

// Contact card component
const ContactCard = ({ contact, index }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.a
      href={contact.link}
      className="block p-6 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.3)"
      }}
    >
      <div className="flex items-center space-x-4">
        <motion.div 
          className={`p-4 rounded-xl bg-gradient-to-r ${contact.color} text-white shadow-lg`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl">{contact.icon}</div>
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-100 mb-1">{contact.title}</h3>
          <p className="text-gray-300">{contact.description}</p>
        </div>
      </div>
    </motion.a>
  </motion.div>
);

// Social link component
const SocialLink = ({ social, index }) => (
  <motion.a
    href={social.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-4 rounded-xl bg-gradient-to-r ${social.color} text-white shadow-lg group`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ 
      scale: 1.1,
      rotate: 360,
    }}
    viewport={{ once: true }}
  >
    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
      {social.icon}
    </div>
  </motion.a>
);

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section
      ref={containerRef}
      id="contact"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
      }}
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
            Let's <span className="text-gradient-pink">Connect</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
          </motion.p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => (
            <ContactCard key={index} contact={contact} index={index} />
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-100 mb-8">Connect With Me</h3>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <SocialLink key={index} social={social} index={index} />
            ))}
                  </div>
        </motion.div>



      {/* Footer */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          viewport={{ once: true }}
        >
        <p className="text-gray-400">
          Copyright © 2025 Raghav Singh. All Rights Reserved.
        </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
