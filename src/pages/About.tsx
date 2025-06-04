import React from 'react';
import { 
  MapPin,
  Calendar,
  Heart,
  Linkedin,
  Github,
  Mail,
  Quote
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import profileImg from '@/assets/owenmurunga.png';
import { Link } from 'react-router-dom';
import {timeline, interests} from '@/data/about';
import links from '@/data/links';

const AboutPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Personal Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  The Person <span className="text-blue-600">Behind</span> the Code
                </h1>
                <p className="text-lg text-gray-600">
                  More than just a developer - a curious mind, creative thinker, and problem solver 
                  with a passion for building meaningful solutions.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Nairobi, Kenya</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>3+ years experience</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex space-x-4"
              >
                <a 
                  href={links.linkedin.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={links.email.url}
                  className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                  src={profileImg} 
                  alt="Owen Murunga"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center text-white"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    <span>Currently open to new opportunities</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* My Journey Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Development Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From first lines of code to building complex systems - the path that shaped me as a developer.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className={`w-1/2 p-6 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="inline-block">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="mt-2 text-sm font-medium text-gray-500">{item.year}</div>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 mx-6 flex-shrink-0 flex items-center justify-center rounded-full border-4 border-white shadow-lg z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Development Philosophy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Approach to Code</h3>
                  <ul className="space-y-4">
                    {[
                      "Readability over cleverness",
                      "Maintainability is non-negotiable",
                      "Documentation as part of the process",
                      "Continuous refactoring"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Values</h3>
                  <ul className="space-y-4">
                    {[
                      "Clear communication",
                      "Empathy in code reviews",
                      "Knowledge sharing",
                      "Celebrating small wins"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond the Keyboard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The hobbies and interests that keep me inspired and balanced.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <interest.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{interest.name}</h3>
                <p className="text-gray-600">{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing Thoughts */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-8 h-8 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                "Building software is not just about writing code,
                it's about creating experiences that resonate with people." 
              </h2>
              <p className="text-gray-600 mb-8">
                Whether it's through elegant code, thoughtful architecture, or mentoring others, 
                I strive to make a positive impact in everything I build.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Let's Connect
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;