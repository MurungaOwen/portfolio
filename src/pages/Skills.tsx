import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  FaPython, FaJs, FaNodeJs, FaReact, FaAws, FaDocker, 
  FaGithub, FaDatabase, FaServer, FaCloud, FaLayerGroup,
  FaBolt, FaUsers, FaArrowRight, FaCode, FaKey, FaCogs,
  FaRocket, FaLightbulb, FaComments, FaPuzzlePiece, FaCertificate
} from 'react-icons/fa';
import { 
  SiTypescript, SiDjango, SiFastapi, SiNestjs, SiPostgresql, 
  SiMongodb, SiRedis, SiNextdotjs, SiTailwindcss, SiKubernetes,
  SiGraphql, SiExpress, SiMysql, SiSequelize, SiSwagger,
  SiJest, SiPytest, SiWebpack, SiVite, SiCss3,
  SiC
} from 'react-icons/si';
import CredlyBadge from '@/components/ui/CredlyBadge';

// Improved SkillItem with consistent icon styling
const SkillItem = ({ name, icon }: { name: string; icon: React.ReactNode }) => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: hovered ? 1.05 : 1,
      transition: { duration: hovered ? 0.2 : 0.1 }
    });
  }, [hovered, controls]);

  return (
    <motion.div
      animate={controls}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors duration-200 border border-gray-200 hover:border-blue-200 shadow-xs"
    >
      <div className="w-5 h-5 text-gray-700 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </motion.div>
  );
};

// Enhanced SkillCategoryCard with better visual hierarchy
const SkillCategoryCard = ({ 
  title, 
  description, 
  icon, 
  skills 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: { [key: string]: string[] };
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
    >
      <div className="p-6">
        <div className="flex items-center mb-5">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mr-4 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
            <div className="text-blue-600">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(skills).map(([subcategory, skills]) => (
            <div key={subcategory}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{subcategory}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, skillIndex) => (
                  <SkillItem 
                    key={skillIndex} 
                    name={skill} 
                    icon={techIcons[skill] || <FaCode className="text-gray-500" />} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Tech icons mapping with consistent styling
const techIcons: Record<string, React.ReactNode> = {
  // Languages
  "Python": <FaPython className="text-blue-500" />,
  "JavaScript": <FaJs className="text-yellow-500" />,
  "TypeScript": <SiTypescript className="text-blue-600" />,
  "C": <SiC className='' />,
  "JSX": <FaReact className="text-blue-500" />,
  
  // Backend Frameworks
  "Django": <SiDjango className="text-green-700" />,
  "FastAPI": <SiFastapi className="text-teal-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "NestJS": <SiNestjs className="text-red-500" />,
  "Express": <SiExpress className="text-gray-700" />,
  
  // API & Auth
  "REST": <FaServer className="text-blue-500" />,
  "GraphQL": <SiGraphql className="text-pink-600" />,
  "JWT": <FaKey className="text-amber-500" />,
  "OAuth2": <FaKey className="text-blue-500" />,
  
  // DevOps
  "Docker": <FaDocker className="text-blue-400" />,
  "Kubernetes": <SiKubernetes className="text-blue-500" />,
  "Minikube": <SiKubernetes className="text-blue-400" />,
  "GitHub Actions": <FaGithub className="text-gray-800" />,
  
  // Databases
  "PostgreSQL": <SiPostgresql className="text-blue-700" />,
  "MySQL": <SiMysql className="text-blue-600" />,
  "MongoDB": <SiMongodb className="text-green-600" />,
  "Redis": <SiRedis className="text-red-600" />,
  
  // ORMs
  "Drizzle ORM": <FaDatabase className="text-blue-500" />,
  "Sequelize": <SiSequelize className="text-blue-400" />,
  "Django ORM": <SiDjango className="text-green-700" />,
  "SQLAlchemy": <FaDatabase className="text-blue-600" />,
  
  // Cloud
  "AWS (EC2, S3, Lambda)": <FaAws className="text-amber-600" />,
  "AWS Lambda": <FaAws className="text-amber-500" />,
  
  // Frontend
  "React": <FaReact className="text-blue-500" />,
  "Next.js": <SiNextdotjs className="text-gray-800" />,
  "TailwindCSS": <SiTailwindcss className="text-cyan-400" />,
  "CSS Modules": <SiCss3 className="text-blue-500" />,
  "Vite": <SiVite className="text-purple-500" />,
  "Webpack": <SiWebpack className="text-blue-400" />,
  
  // Testing & Docs
  "Pytest": <SiPytest className="text-amber-500" />,
  "Jest": <SiJest className="text-red-500" />,
  "Swagger/OpenAPI": <SiSwagger className="text-green-600" />,
  
  // Other
  "Git & GitHub": <FaGithub className="text-gray-800" />,
  "Agile/Scrum": <FaCogs className="text-gray-600" />,
};

const SkillsPage: React.FC = () => {
  // Skill categories with updated structure
  const skillCategories: {
    title: string;
    icon: React.ReactNode;
    description: string;
    skills: { [key: string]: string[] };
  }[] = [
    {
      title: "Core Backend Skills",
      icon: <FaServer className="w-5 h-5" />,
      description: "Building robust server-side applications",
      skills: {
        "Languages": ["Python", "JavaScript", "TypeScript"],
        "Frameworks": ["Django", "FastAPI", "Node.js", "NestJS", "Express"],
        "API Design": ["REST", "GraphQL"],
        "Authentication": ["JWT", "OAuth2"]
      }
    },
    {
      title: "DevOps & Deployment",
      icon: <FaRocket className="w-5 h-5" />,
      description: "Streamlining development and deployment pipelines",
      skills: {
        "Containerization": ["Docker"],
        "Orchestration": ["Kubernetes", "Minikube"],
        "CI/CD": ["GitHub Actions"]
      }
    },
    {
      title: "Databases",
      icon: <FaDatabase className="w-5 h-5" />,
      description: "Data storage and optimization expertise",
      skills: {
        "Relational": ["PostgreSQL", "MySQL"],
        "NoSQL": ["MongoDB", "Redis"],
        "ORMs": ["Drizzle ORM", "Sequelize", "Django ORM", "SQLAlchemy"]
      }
    },
    {
      title: "Cloud & Infrastructure",
      icon: <FaCloud className="w-5 h-5" />,
      description: "Scalable cloud solutions and infrastructure",
      skills: {
        "Cloud Platforms": ["AWS (EC2, S3, Lambda)"],
        "Serverless": ["AWS Lambda"]
      }
    },
    {
      title: "Frontend Development",
      icon: <FaLayerGroup className="w-5 h-5" />,
      description: "Modern UI development skills",
      skills: {
        "Frameworks": ["React", "Next.js"],
        "Languages": ["TypeScript", "JSX"],
        "Styling": ["TailwindCSS", "CSS Modules"],
        "Tooling": ["Vite", "Webpack"]
      }
    },
    {
      title: "Other Skills",
      icon: <FaCogs className="w-5 h-5" />,
      description: "Additional technical proficiencies",
      skills: {
        "Version Control": ["Git & GitHub"],
        "Methodologies": ["Agile/Scrum"],
        "Testing": ["Pytest", "Jest"],
        "Documentation": ["Swagger/OpenAPI"]
      }
    }
  ];

  const softSkills = [
    { icon: <FaUsers className="w-5 h-5" />, title: "Collaborative Team Player", description: "Work effectively in diverse teams" },
    { icon: <FaComments className="w-5 h-5" />, title: "Clear Communicator", description: "Articulate complex ideas simply" },
    { icon: <FaPuzzlePiece className="w-5 h-5" />, title: "Problem-Solving Mindset", description: "Tackle challenges systematically" },
    { icon: <FaLightbulb className="w-5 h-5" />, title: "Quick Learner", description: "Adapt to new technologies rapidly" }
  ];

  const principles = [
    { 
      icon: <FaBolt className="w-5 h-5 text-blue-500" />, 
      title: "Clean Code", 
      description: "Readable, maintainable, and well-documented" 
    },
    { 
      icon: <FaBolt className="w-5 h-5 text-blue-500" />, 
      title: "Performance", 
      description: "Optimized algorithms and efficient queries" 
    },
    { 
      icon: <FaBolt className="w-5 h-5 text-blue-500" />, 
      title: "Scalability", 
      description: "Designed for growth from day one" 
    },
    { 
      icon: <FaBolt className="w-5 h-5 text-blue-500" />, 
      title: "Security", 
      description: "Built with best practices in mind" 
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 sm:py-20">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center space-x-2 text-blue-600 mb-4"
          >
            <FaCode className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider">TECHNICAL MASTERY</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technical Arsenal</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Carefully curated technologies I use to build performant, scalable systems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <Link 
              to="/projects" 
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              View My Projects <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* Skills Grid */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Technical Skills Breakdown
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={index}
                title={category.title}
                description={category.description}
                icon={category.icon}
                skills={category.skills}
              />
            ))}
          </div>
        </section>

        {/* Soft Skills Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Soft Skills & Approach
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-5 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-300 text-center border border-gray-100 hover:border-blue-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto text-blue-600">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
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
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-center mb-8">
              <FaCertificate className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                Professional Certifications
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
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
          </motion.div>
        </section>

        {/* Methodology Section */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Engineering Philosophy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-5 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-300 border border-gray-100 hover:border-blue-100"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    {principle.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                  <p className="text-gray-600 text-sm">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default SkillsPage;