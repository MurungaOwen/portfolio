import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaCode, FaArrowRight,
  FaFilter, FaSearch, FaTimes, FaStar, FaServer,
  FaMobileAlt, FaDatabase, FaChartLine, FaRocket,
  FaLightbulb, FaExpand, FaUsers
} from 'react-icons/fa';
import {
  SiTypescript, SiReact, SiNextdotjs,
  SiPython, SiDjango, SiDocker, SiPostgresql, SiAmazon,
  SiMongodb, SiRedis, SiTailwindcss, SiExpress,
  SiCss3,
  SiJavascript,
  SiHtml5,
  SiAstro,
  SiSanity,
  SiNodedotjs,
  SiGoogleappsscript,
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import type{Project} from '@/types';
import generousCircleThumbnail from '@/assets/generous_circle.png';
import aiHubThumbnail from '@/assets/ai_hub.png';
import charchomaThumbnail from '@/assets/charchoma_system.png';
import coffeeConfessionsThumbnail from '@/assets/coffee.png';


const projectsData: Project[] = [
  {
    id: '1',
    title: 'Generous Circle Donation Platform',
    tagline: 'Scalable and secure Donation Platform',
    description: 'Full stack Donation and Crowd funding platform',
    longDescription: 'Built a comprehensive Crowdfunding platform with real time payment processing and user management.',
    category: 'Full-Stack',
    thumbnail: generousCircleThumbnail,
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-gray-800' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-gray-700' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-700' },
      { name: 'Docker', icon: <SiDocker />, color: 'text-blue-400' },
      { name: 'AWS', icon: <SiAmazon />, color: 'text-amber-600' },
    ],
    features: [
      'Secure Payments',
      'Real-time payment updates',
      'paystack payment integration',
      'Admin analytics dashboard'
    ],
    challenges: [
      'Handling different currency formats',
    ],
    outcomes: [
      'Reduced checkout latency by 40%',
      'Scaled to 1k+ daily users',
      'Achieved 99.9% uptime'
    ],
    metrics: [
      { value: '1K+', label: 'Daily Users' },
      { value: '40%', label: 'Faster Checkout' },
      { value: '99.9%', label: 'Uptime' }
    ],
    liveUrl: 'https://app.generouscircle.com',
    status: 'production',
    isFeatured: true,
    type: 'fullstack'
  },
  {
    id: '2',
    title: 'Sanitorium Management System',
    tagline: 'Real-time patient tracking system and EHR management',
    description: 'Healthcare dashboard for medical professionals',
    longDescription: 'Developed a HIPAA-compliant healthcare dashboard for monitoring patient vitals in real-time. Integrated with hospital EHR systems with custom alerting for critical values.',
    category: 'Full-Stack',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: [
      { name: 'React', icon: <SiReact />, color: 'text-blue-500' },
      { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-gray-700' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-700' },
      { name: 'Redis', icon: <SiRedis />, color: 'text-red-600' },
    ],
    features: [
      'WebSocket real-time updates',
      'HIPAA compliant',
      'EHR integration',
      'Custom alert thresholds'
    ],
    challenges: [
      'Handling large time-series data',
      'Meeting compliance requirements'
    ],
    outcomes: [
      'Reduced detection time by 65%',
      'Integrated with The school sanitorium',
      '24/7 monitoring'
    ],
    metrics: [
      { value: '65%', label: 'Faster Detection' },
      { value: '1', label: 'Hospital Network' },
      { value: '24/7', label: 'Monitoring' }
    ],
    githubUrl: 'https://github.com/T-droid/unicare',
    status: 'production',
    isFeatured: true,
    type: 'web'
  },
  {
    id: '3',
    title: 'Ai Hub Backend',
    tagline: 'An Ai learning Site',
    description: 'Ai learning platform with threaded discussions, News and Modules',
    longDescription: 'Developed a comprehensive AI learning platform with threaded discussions, assignments, and news modules. Features include user authentication, real-time chat, and a rich text editor for discussions. Included payment integration for premium content access using Stripe checkout.',
    category: 'Backend',
    thumbnail: aiHubThumbnail,
    technologies: [
      { name: 'Django', icon: <SiDjango />, color: 'text-green-700' },
      { name: 'python', icon: <SiPython />, color: 'text-yellow-500' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-700' },
      { name: 'Redis', icon: <SiRedis />, color: 'text-red-600' },
    ],
    features: [
      'Payment checkout on stripe',
      'JWT authentication',
      'Rate limiting',
      'Swagger documentation'
    ],
    challenges: [
      'Implementing efficient pagination',
      'Optimizing complex queries'
    ],
    outcomes: [
      'Response time <200ms',
      '100% test coverage',
      'Serves 3 client apps'
    ],
    metrics: [
      { value: '<200ms', label: 'Response Time' },
      { value: '100%', label: 'Test Coverage' },
      { value: '3', label: 'Client Apps' }
    ],
    githubUrl: 'https://github.com/MurungaOwen/ai-hub-backend',
    status: 'production',
    type: 'api'
  },
  {
    id: '4',
    title: 'Google Apps Scripting Charchoma Inventory And Order Tracking',
    tagline: 'Google Apps Dashboard for Easy entry of Orders and Data analysis',
    description: 'A dashboard for managing inventory and orders at Charchoma hotel and giving Visualised data on trends of Orders and Inventory',
    longDescription: 'Created a comprehensive inventory and order tracking system Using Google apps Script for Charchoma hotel. Features include real-time inventory updates, order management, and data visualization for trends analysis. Built with a focus on user experience and performance.',
    category: 'Full-Stack',
    thumbnail: charchomaThumbnail,
    technologies: [
      { name: 'google Apps Script', icon: <SiGoogleappsscript/>, color: ''},
      { name: 'html', icon: <SiHtml5 />, color: '' },
      // add html, css, js and google apps script
      { name: 'css', icon: <SiCss3 />, color: '' },
      { name: 'js', icon: <SiJavascript />, color: '' },
    ],
    features: [
      'Order tracking And Inventory management',
      'Trends analysis',
      'Real-time analytics'
    ],
    challenges: [
      'Handling large datasets',
    ],
    outcomes: [
      '85% prediction accuracy',
      '50% time saved in order entry',
    ],
    metrics: [
      { value: '85%', label: 'Accuracy' },
      { value: '50%', label: 'Time Saved' },
    ],
    status: 'production',
    type: 'fullstack'
  },
  {
    id: '5',
    title: 'Coffee Over Confessions',
    tagline: 'Modern, performant and Astro based Blog site With CMS',
    description: 'Personal blog for a friend featuring Astro SSR and Sanity CMS',
    longDescription: 'Built a blazing-fast Blog Post with An admin CMS using Sanity For a Friend. The Project Focused on Sharing One\'s thoughts with fear of discrimination',
    category: 'Frontend',
    thumbnail: coffeeConfessionsThumbnail,
    technologies: [
      { name: 'Astro', icon: <SiAstro />, color: 'text-gray-800' },
      { name: 'Sanity', icon: <SiSanity />, color: 'text-gray-600' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-cyan-500' },
    ],
    features: [
      'Perfect Lighthouse scores',
      'Sanity Based CMS',
      'MDX blog support',
      'SEO optimized'
    ],
    challenges: [
      'Image optimization'
    ],
    outcomes: [
      '100 performance score',
      '40% smaller bundle',
      'Instant page loads'
    ],
    metrics: [
      { value: '100', label: 'Performance' },
      { value: '40%', label: 'Smaller Bundle' },
      { value: '<1s', label: 'Load Time' }
    ],
    githubUrl: 'https://github.com/MurungaOwen/lvy-blog/',
    liveUrl: 'https://coffee-confessions.vercel.app/',
    status: 'production',
    type: 'web'
  },
];

// Type inference should make 'icon' JSX.Element here
const technologyFilters = [
  { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600' },
  { name: 'React', icon: <SiReact />, color: 'text-blue-500' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-gray-800' },
  { name: 'Node.js', icon: <SiExpress />, color: 'text-gray-700' },
  { name: 'Python', icon: <SiPython />, color: 'text-yellow-400' },
  { name: 'Django', icon: <SiDjango />, color: 'text-green-700' },
  { name: 'Docker', icon: <SiDocker />, color: 'text-blue-400' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-700' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
  { name: 'AWS', icon: <SiAmazon />, color: 'text-amber-600' },
];

// Type filters
const typeFilters = [
  { name: 'All', value: 'all' },
  { name: 'Web', value: 'web' },
  { name: 'Mobile', value: 'mobile' },
  { name: 'API', value: 'api' },
  { name: 'Full Stack', value: 'fullstack' },
];

// Category filters
const categoryFilters = [
  { name: 'All', value: 'all' },
  { name: 'Full-Stack', value: 'Full-Stack' },
  { name: 'Frontend', value: 'Frontend' },
  { name: 'Backend', value: 'Backend' },
  { name: 'API', value: 'API' },
  // { name: 'Mobile', value: 'Mobile' }, // Add if you have mobile projects
];

// Project Card Component
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    production: 'bg-green-100 text-green-700',
    development: 'bg-yellow-100 text-yellow-700',
    archived: 'bg-gray-100 text-gray-700'
  };

  const typeIcons = {
    web: <FaCode className="w-4 h-4" />,
    mobile: <FaMobileAlt className="w-4 h-4" />,
    api: <FaServer className="w-4 h-4" />,
    fullstack: <FaDatabase className="w-4 h-4" />
  };

  return (
    <motion.div
      layout // Added for smooth re-ordering by AnimatePresence
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Featured badge */}
      {project.isFeatured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-sm">
          <FaStar className="w-3 h-3 mr-1" /> Featured
        </div>
      )}

      {/* Thumbnail Section */}
      <div className="h-48 relative overflow-hidden">
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Quick Actions Overlay */}
        <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end justify-between p-4"
          >
            <div className="flex space-x-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:bg-white"
                  title="View on GitHub"
                >
                  <FaGithub className="w-4 h-4 text-gray-800" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:bg-white"
                  title="View Live Demo"
                >
                  <FaExternalLinkAlt className="w-4 h-4 text-blue-600" />
                </a>
              )}
            </div>
             <FaExpand className="w-5 h-5 text-white/80" />
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <div className="p-5"> {/* Reduced padding slightly */}
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">{project.description}</p> {/* Fixed height for description */}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            {typeIcons[project.type]}
            <span className="ml-1.5">{project.type.charAt(0).toUpperCase() + project.type.slice(1).replace('fullstack', 'Full Stack')}</span>
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4 items-center h-10"> {/* Fixed height for tech stack */}
          {project.technologies.slice(0, 5).map((tech, index) => ( // Show up to 5
            <div
              key={index}
              className={`p-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors ${tech.color}`}
              title={tech.name}
            >
              {/* MODIFIED: More specific cast for tech.icon */}
              {React.cloneElement(tech.icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}
            </div>
          ))}
          {project.technologies.length > 5 && (
            <div className="p-1.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center h-7 w-7">
              +{project.technologies.length - 5}
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
          {project.metrics.slice(0,3).map((metric, index) => (
            <div key={index} className="text-center p-1.5 bg-gray-50 rounded-md">
              <div className="text-base font-bold text-gray-800">{metric.value}</div>
              <div className="text-xs text-gray-500 line-clamp-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


// Project Modal Component
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y:20 }}
        animate={{ scale: 1, opacity: 1, y:0 }}
        exit={{ scale: 0.95, opacity: 0, y:20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 p-5 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            <p className="text-gray-600 text-sm">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6"> {/* Use space-y for consistent spacing */}
          {/* Thumbnail */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-auto max-h-80 object-cover" // Adjusted max height
            />
          </div>

          {/* Description & Meta */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" /> Project Overview
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">{project.longDescription}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <h4 className="text-xs font-semibold text-blue-600 mb-1">Category</h4>
                <p className="text-sm text-gray-800">{project.category}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <h4 className="text-xs font-semibold text-purple-600 mb-1">Status</h4>
                <p className="text-sm text-gray-800 capitalize">{project.status}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <h4 className="text-xs font-semibold text-green-600 mb-1">Type</h4>
                <p className="text-sm text-gray-800">{project.type === 'fullstack' ? 'Full Stack' : project.type.charAt(0).toUpperCase() + project.type.slice(1)}</p>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FaCode className="mr-2 text-blue-600" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                >
                  {/* MODIFIED: More specific cast for tech.icon */}
                  <span className={`mr-2 ${tech.color} group-hover:scale-110 transition-transform`}>{React.cloneElement(tech.icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' })}</span>
                  <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FaStar className="mr-2 text-yellow-500" /> Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <FaArrowRight className="w-3.5 h-3.5 text-blue-500 mt-1 mr-2.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges & Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <FaServer className="mr-2 text-red-500" /> Challenges Faced
              </h3>
              <ul className="space-y-1.5">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                     <span className="text-red-400 mr-2 mt-0.5 font-bold">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <FaRocket className="mr-2 text-green-500" /> Outcomes & Learnings
              </h3>
              <ul className="space-y-1.5">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-400 mr-2 mt-0.5 font-bold">•</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Impact Metrics */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FaChartLine className="mr-2 text-indigo-500" /> Impact & Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.metrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                  <div className="text-xl font-bold text-indigo-700">{metric.value}</div>
                  <div className="text-xs text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Modal Footer / Action Buttons */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-5 mt-auto">
            <div className="flex flex-wrap gap-3 justify-end">
                {project.githubUrl && (
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                    <FaGithub className="mr-2 w-4 h-4" /> View on GitHub
                </a>
                )}
                {project.liveUrl && (
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <FaExternalLinkAlt className="mr-2 w-4 h-4" /> View Live Demo
                </a>
                )}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false); // Start with filters hidden or shown
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true); // Ensure animations only run after initial mount
  }, []);

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // project.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) || // Optional: search long desc
      project.technologies.some(tech =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTech = selectedTech.length === 0 ||
      selectedTech.every(selTech => // project must have ALL selected techs
        project.technologies.some(projTech => projTech.name === selTech)
      );

    const matchesType = selectedType === 'all' ||
      project.type === selectedType;

    const matchesCategory = selectedCategory === 'all' ||
      project.category === selectedCategory;

    return matchesSearch && matchesTech && matchesType && matchesCategory;
  });

  const toggleTechFilter = (techName: string) => {
    setSelectedTech(prev =>
      prev.includes(techName)
        ? prev.filter(t => t !== techName)
        : [...prev, techName]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
    setSelectedType('all');
    setSelectedCategory('all');
  };


  return (
    <div className="relative overflow-x-hidden bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-200/30 rounded-full opacity-50 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-200/30 rounded-full opacity-50 blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section */}
        <section className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center items-center space-x-2 text-blue-600 mb-3"
          >
            <FaRocket className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Project Showcase</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5"
          >
            My Digital <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Creations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            A curated collection of projects where innovation meets execution. Explore real-world applications demonstrating my technical skills and creative problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/skills" // Assuming you have a skills section with this ID elsewhere
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Explore My Skills <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaFilter className="mr-2 w-4 h-4 text-gray-500" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </motion.div>
        </section>

        {/* Filters Section */}
        <AnimatePresence>
        {showFilters && (
          <motion.section
            key="filters-section"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: mounted ? '2rem' : '0rem' }} // 2rem = mb-8
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-4 items-end">
              {/* Search Input */}
              <div className="md:col-span-2 lg:col-span-12"> {/* Full width */}
                <label htmlFor="search" className="block text-xs font-medium text-gray-600 mb-1">
                  Search Projects
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="E.g., E-commerce, React, API..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Technology Filters */}
              <div className="lg:col-span-5">
                <h4 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
                  <FaCode className="mr-1.5 text-blue-500" /> By Technology
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {technologyFilters.map((tech) => {
                    const isSelected = selectedTech.includes(tech.name);
                    return (
                      <button
                        key={tech.name}
                        onClick={() => toggleTechFilter(tech.name)}
                        title={`Filter by ${tech.name}`}
                        className={`flex items-center px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1
                          ${isSelected
                            ? `bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700 focus:ring-blue-500`
                            : `bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-blue-400`
                          }`
                        }
                      >
                        {/* MODIFIED: More specific cast for tech.icon */}
                        <span className={`mr-1 ${isSelected ? 'text-blue-200' : tech.color}`}>{React.cloneElement(tech.icon as React.ReactElement<{ className?: string }>, { className: 'w-3.5 h-3.5' })}</span>
                        {tech.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Type Filters */}
              <div className="lg:col-span-3">
                <h4 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
                  <FaFilter className="mr-1.5 text-purple-500" /> By Type
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {typeFilters.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1
                        ${selectedType === type.value
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm hover:bg-purple-700 focus:ring-purple-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-purple-400'
                        }`
                      }
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div className="lg:col-span-3">
                <h4 className="text-xs font-medium text-gray-600 mb-1.5 flex items-center">
                  <FaUsers className="mr-1.5 text-green-500" /> By Category
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categoryFilters.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-1
                        ${selectedCategory === category.value
                          ? 'bg-green-600 text-white border-green-600 shadow-sm hover:bg-green-700 focus:ring-green-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-green-400'
                        }`
                      }
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              {(searchTerm || selectedTech.length > 0 || selectedType !== 'all' || selectedCategory !== 'all') && (
                  <div className="lg:col-span-1 flex items-end justify-end">
                     <button
                        onClick={clearFilters}
                        className="mt-2 lg:mt-0 w-full lg:w-auto text-xs px-3 py-2 text-red-600 hover:bg-red-50 rounded-md border border-red-200 hover:border-red-400 transition-colors"
                        title="Clear all filters"
                      >
                        Clear Filters
                      </button>
                  </div>
              )}
            </div>
          </motion.section>
        )}
        </AnimatePresence>


        {/* Projects Grid Section */}
        <section className="mt-0"> {/* Adjusted margin top if filters are shown */}
          <motion.div
            layout // Animates layout changes for the grid itself
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="sync"> {/* Use mode="sync" or "popLayout" if needed for card reordering */}
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          <AnimatePresence>
            {mounted && filteredProjects.length === 0 && (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="col-span-full text-center py-12 sm:py-16 bg-white rounded-xl shadow-lg border border-gray-200 mt-8"
              >
                <FaSearch className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                  It seems we couldn't find any projects matching your current filters. Try adjusting your search criteria or clearing the filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Modal Display */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

      </div> {/* Closing relative z-10 max-w-7xl mx-auto ... div */}
    </div> // Closing the main "relative overflow-hidden..." div
  );
};

export default ProjectsPage;