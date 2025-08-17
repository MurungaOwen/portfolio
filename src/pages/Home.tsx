import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Download, 
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '@/assets/owenmurunga.png';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import {projects, stats} from '@/data/project';
import links from '@/data/links';
import CredlyBadge from '@/components/ui/CredlyBadge';


const HomePage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section (remains the same) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-blue-600 mb-4"
            >
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium"> Software Engineer</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Hi, I'm <span className="text-blue-600">Owen Murunga</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
            >
              I design and build scalable systems, User Interface, APIs, and microservices with Python, TypeScript, Javascript, Docker, and Kubernetes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/projects" 
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <button className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-full transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md">
                <a href={links.cv.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Download CV <Download className="ml-2 w-4 h-4" />
                </a>
              </button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                  src={profileImg} 
                  alt="Owen Murunga - Backend Engineer"
                  className="w-full h-auto object-cover"
                />

              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section - UPDATED */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // This animates the container
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => ( // Added index for staggered delay
              <div 
                key={stat.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-end">
                      <AnimatedNumber 
                        targetValue={stat.value} 
                        duration={1.5 + index * 0.2} // Stagger animation start
                        className="text-3xl font-bold text-gray-900" 
                      />
                      <span className="text-xl text-blue-600">{stat.suffix}</span>
                    </div>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <Link 
              to="/about" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              See more about me <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* Value Proposition (remains the same) */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Work With Me?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Performance-first Architecture",
                  description: "I focus on building backend systems optimized for speed and scalability."
                },
                {
                  title: "Complex Problem Solver",
                  description: "I turn technical challenges into elegant, real-world solutions."
                },
                {
                  title: "Clean & Maintainable Code",
                  description: "I write well-documented, scalable code that stands the test of time."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Professional Certifications
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continuously learning and validating my skills through industry-recognized certifications
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <CredlyBadge badgeId="277ee05a-a443-4013-8bc0-70c2b73465f2" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <CredlyBadge badgeId="649829b1-8a7d-49f0-bb64-547fb373c2be" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <CredlyBadge badgeId="cd1f88d8-b22d-426d-a84c-45ddacd2f24b" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <CredlyBadge badgeId="5eb67c34-65e0-4096-bc8b-474995d64f5d" />
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Featured <span className="text-blue-600">Projects</span>
                </h2>
                <p className="mt-2 text-gray-600 max-w-lg">
                  Selected works showcasing my problem-solving approach and technical expertise
                </p>
              </div>
              <Link 
                to="/projects" 
                className="flex items-center group text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Explore all projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  {/* Project Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50">
                    <img
                      src={project.thumbnail || "https://source.unsplash.com/random/800x450/?tech,code"}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Project Link */}
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors mt-auto"
                      >
                        View project details
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA (remains the same) */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to build something together?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              I'm currently available for freelance work and full-time positions. Let's discuss how I can help bring your ideas to life.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                to="/contact" 
                className="flex items-center px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </Link>
              
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/MurungaOwen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/owen-murunga-5b4b69319/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:owenhood80@gmail.com" 
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;