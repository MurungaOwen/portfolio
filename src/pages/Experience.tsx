// Minimal Experience Page with Modal Details
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaExternalLinkAlt, 
  FaGithub,
  FaCheckCircle,
  FaTimes,
  FaServer,
  FaCode,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaStar
} from 'react-icons/fa';
import { experiences, education } from '@/data/experience';
import type{ Experience } from '@/types';


const ExperienceModal: React.FC<{
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
}> = ({ experience, isOpen, onClose }) => {
  if (!isOpen) return null;

  const IconComponent = experience.role.toLowerCase().includes('backend') ? FaServer : FaCode;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${experience.color} p-6 text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{experience.company}</h2>
                <p className="text-lg font-medium opacity-90">{experience.role}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm opacity-80">
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-2" />
                    {experience.duration}
                  </div>
                  {experience.location && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                      {experience.location}
                    </div>
                  )}
                  {experience.teamSize && (
                    <div className="flex items-center">
                      <FaUsers className="w-4 h-4 mr-2" />
                      {experience.teamSize}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{experience.summary}</p>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
              <div className="space-y-4">
                {experience.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">{achievement.description}</p>
                        {achievement.impact && (
                          <p className="text-sm text-gray-600 mt-2 italic">→ {achievement.impact}</p>
                        )}
                        {achievement.metric && (
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {achievement.metric}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h3>
              <div className="space-y-4">
                {experience.technologies.map((group, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {experience.links && (
              <div className="flex flex-wrap gap-3">
                {experience.links.github && (
                  <a
                    href={experience.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <FaGithub className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                )}
                {experience.links.demo && (
                  <a
                    href={experience.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Simple Experience Card
const ExperienceCard: React.FC<{
  experience: Experience;
  index: number;
  onReadMore: () => void;
}> = ({ experience, index, onReadMore }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const IconComponent = experience.role.toLowerCase().includes('backend') ? FaServer : FaCode;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className={`h-1 bg-gradient-to-r ${experience.color}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${experience.color} text-white`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{experience.company}</h3>
              <p className="text-gray-600 font-medium">{experience.role}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaCalendarAlt className="w-4 h-4 mr-1" />
                {experience.duration}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{experience.summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {experience.technologies[0]?.items.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
            {experience.technologies.flatMap(t => t.items).length > 3 && (
              <span className="px-3 py-1 text-gray-500 text-sm">
                +{experience.technologies.flatMap(t => t.items).length - 3} more
              </span>
            )}
          </div>
          
          <button
            onClick={onReadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Read More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const ExperiencePage: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const handleReadMore = (experience: Experience) => {
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-blue-600">Experience</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey through my professional experiences and the projects that have shaped my career.
          </p>
        </motion.section>

        {/* Featured Roles */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <FaStar className="w-6 h-6 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
          </div>
          
          <div className="space-y-6">
            {experiences.filter(exp => exp.type === 'featured').map((experience, index) => (
              <ExperienceCard
                key={`${experience.company}-${experience.role}`}
                experience={experience}
                index={index}
                onReadMore={() => handleReadMore(experience)}
              />
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <FaCode className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Notable Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.filter(exp => exp.type === 'project').map((experience, index) => (
              <ExperienceCard
                key={`${experience.company}-${experience.role}`}
                experience={experience}
                index={index}
                onReadMore={() => handleReadMore(experience)}
              />
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center mb-8">
            <FaGraduationCap className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${edu.color}`} />
                
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${edu.color} text-white`}>
                      <FaGraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                      <p className="text-blue-600 font-medium">{edu.degree}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="w-4 h-4 mr-1" />
                          {edu.duration}
                        </div>
                        {edu.location && (
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                            {edu.location}
                          </div>
                        )}
                      </div>
                      
                      {edu.highlights && (
                        <ul className="space-y-2 mt-4">
                          {edu.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-700">
                              <FaCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            isOpen={!!selectedExperience}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;