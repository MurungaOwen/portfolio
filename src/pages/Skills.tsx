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
      className="flex items-center space-x-2 bg-[#090b09] rounded-lg px-3 py-2 hover:bg-lime-400/10 transition-colors duration-200 border border-zinc-800 hover:border-zinc-700 shadow-xs"
    >
      <div className="w-5 h-5 text-zinc-300 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium text-zinc-300">{name}</span>
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
      className="bg-[#090b09] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-zinc-800 group"
    >
      <div className="p-6">
        <div className="flex items-center mb-5">
          <div className="p-3 bg-lime-400/15 rounded-lg mr-4 transition-colors">
            <div className="text-lime-300">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
            <p className="text-zinc-500 text-sm mt-1">{description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(skills).map(([subcategory, skills]) => (
            <div key={subcategory}>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{subcategory}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, skillIndex) => (
                  <SkillItem 
                    key={skillIndex} 
                    name={skill} 
                    icon={techIcons[skill] || <FaCode className="text-zinc-500" />} 
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
  "TypeScript": <SiTypescript className="text-lime-300" />,
  "C": <SiC className='' />,
  "JSX": <FaReact className="text-blue-500" />,
  
  // Backend Frameworks
  "Django": <SiDjango className="text-green-700" />,
  "FastAPI": <SiFastapi className="text-teal-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "NestJS": <SiNestjs className="text-red-500" />,
  "Express": <SiExpress className="text-zinc-300" />,
  
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
  "MySQL": <SiMysql className="text-lime-300" />,
  "MongoDB": <SiMongodb className="text-green-600" />,
  "Redis": <SiRedis className="text-red-600" />,
  
  // ORMs
  "Drizzle ORM": <FaDatabase className="text-blue-500" />,
  "Sequelize": <SiSequelize className="text-blue-400" />,
  "Django ORM": <SiDjango className="text-green-700" />,
  "SQLAlchemy": <FaDatabase className="text-lime-300" />,
  
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
  "Agile/Scrum": <FaCogs className="text-zinc-400" />,
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
    <div className="relative overflow-hidden bg-[#050706]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-lime-400/15 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16 sm:py-20">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center space-x-2 text-lime-300 mb-4"
          >
            <FaCode className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wider">TECHNICAL MASTERY</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6"
          >
            My <span className="text-stone-900 underline decoration-blue-600 decoration-2 underline-offset-4">Technical Arsenal</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto"
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
              className="flex items-center px-6 py-3 bg-lime-400 hover:bg-lime-300 text-zinc-950 font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
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
            className="text-2xl font-bold text-zinc-100 mb-8 text-center"
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
            className="bg-[#090b09] rounded-xl p-8 shadow-sm border border-zinc-800"
          >
            <h2 className="text-2xl font-bold text-center text-zinc-100 mb-8">
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
                  className="p-5 rounded-lg bg-zinc-900/60 hover:bg-[#090b09] transition-colors duration-300 text-center border border-zinc-800 hover:border-zinc-700"
                >
                  <div className="w-12 h-12 bg-lime-400/15 rounded-full flex items-center justify-center mb-4 mx-auto text-lime-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{skill.title}</h3>
                  <p className="text-zinc-400 text-sm">{skill.description}</p>
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
            className="bg-[#090b09] rounded-xl p-8 shadow-sm border border-zinc-800"
          >
            <div className="flex items-center justify-center mb-8">
              <FaCertificate className="w-6 h-6 text-lime-300 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-100">
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
            className="bg-[#090b09] rounded-xl p-8 shadow-sm border border-zinc-800"
          >
            <h2 className="text-2xl font-bold text-center text-zinc-100 mb-8">
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
                  className="p-5 rounded-lg bg-zinc-900/60 hover:bg-[#090b09] transition-colors duration-300 border border-zinc-800 hover:border-zinc-700"
                >
                  <div className="w-10 h-10 bg-lime-400/15 rounded-full flex items-center justify-center mb-4">
                    {principle.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">{principle.title}</h3>
                  <p className="text-zinc-400 text-sm">{principle.description}</p>
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
