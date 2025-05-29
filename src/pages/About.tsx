import React, { useRef } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Download,
  Linkedin,
  Github,
  Twitter,
  Mail,
  BookOpen,
  Heart,
  Target,
  Coffee,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';

const AboutPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/owen-murunga-5b4b69319/', color: 'hover:text-blue-600', hoverBg: 'hover:bg-blue-50' },
    { icon: Github, href: 'https://github.com/MurungaOwen', color: 'hover:text-gray-800', hoverBg: 'hover:bg-gray-50' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400', hoverBg: 'hover:bg-blue-50' },
    { icon: Mail, href: 'owenhood80@gmail.com', color: 'hover:text-red-500', hoverBg: 'hover:bg-red-50' }
  ];

  // Floating animation component
  const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  // Parallax text component
  const ParallaxText = ({ children, speed = 0.5 }: { children: React.ReactNode, speed?: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
      <motion.div ref={ref} style={{ y }}>
        {children}
      </motion.div>
    );
  };

  // Scroll-triggered card component
  const ScrollCard = ({ children, index = 0 }: { children: React.ReactNode, index?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.21, 1.11, 0.81, 0.99]
          }
        } : {}}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Availability Status */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="flex items-center space-x-3 text-emerald-600 font-medium"
              >
                <motion.div 
                  className="w-3 h-3 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm uppercase tracking-wide">Available for Work</span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </motion.div>
              </motion.div>
              
              {/* Hero Section */}
              <div className="space-y-4 lg:space-y-6">
                <ParallaxText speed={0.2}>
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{ 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      Hi, I'm Owen,
                    </motion.span>
                    <br />
                    <motion.span 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0"
                      animate={{ 
                        backgroundPosition: ['0%', '100%', '0%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      software
                    </motion.span>
                    <br />
                    <motion.span
                      className="inline-block"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      engineer
                    </motion.span>
                    <motion.span 
                      className="text-blue-600"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      ©
                    </motion.span>
                  </motion.h1>
                </ParallaxText>
                
                {/* Professional Summary */}
                <motion.p 
                  className="pb-2 text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  I'm a passionate full-stack developer who loves building scalable applications 
                  that solve real-world problems. I focus on creating clean, maintainable code and 
                  delivering exceptional user experiences that make a difference.
                </motion.p>
              </div>
              
              {/* Contact Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-200 shadow-lg"
                >
                  <motion.span 
                    className="flex items-center justify-center space-x-2"
                    whileHover={{ x: 2 }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Get in Touch</span>
                  </motion.span>
                </motion.button>
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#374151"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-200 px-8 py-4 rounded-full font-medium transition-all duration-200 hover:shadow-md bg-white"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.div>
                  <span>Download Resume</span>
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Content - Profile Card */}
            <div className="lg:col-span-5">
              <FloatingElement delay={0.5}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotateY: 25 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 backdrop-blur-sm"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 mb-2"
                        whileHover={{ color: "#2563eb" }}
                      >
                        Owen Murunga
                      </motion.h3>
                      <motion.div 
                        className="flex items-center text-gray-600 mb-1"
                        whileHover={{ x: 5 }}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Nairobi, Kenya</span>
                      </motion.div>
                      <div className="flex items-center text-blue-600 font-medium">
                        <span className="text-sm">Full Stack Developer, Backend Major.</span>
                      </div>
                    </div>
                    <motion.div 
                      className="text-right"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-blue-600 font-bold text-lg">Open to Work</div>
                      <div className="text-sm text-gray-500">Remote & Local</div>
                    </motion.div>
                  </div>
                  
                  {/* Profile Image */}
                  <div className="relative mb-6 group">
                    <motion.div 
                      className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden"
                      whileHover={{ 
                        background: "linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.img 
                        src="/owenmurunga.png" 
                        alt="Owen Murunga - Software Engineer"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                    <motion.div 
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 90,
                        backgroundColor: "#f3f4f6"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 ${social.color} ${social.hoverBg}`}
                        whileHover={{ 
                          y: -8, 
                          scale: 1.2,
                          rotate: 5
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </FloatingElement>
            </div>
          </div>
          
          {/* About Cards Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* My Developer Journey */}
            <ScrollCard index={0}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <motion.div 
                  className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="w-6 h-6 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">My Developer Journey</h3>
                <p className="text-gray-600 leading-relaxed">
                  I started coding in high school out of curiosity and quickly fell in love with the problem-solving 
                  aspect of programming. Over the years, I've grown from building simple websites to architecting 
                  complex full-stack applications. Every project teaches me something new, and I'm constantly 
                  amazed by what's possible with code.
                </p>
              </div>
            </ScrollCard>
            
            {/* My Core Values */}
            <ScrollCard index={1}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <motion.div 
                  className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Target className="w-6 h-6 text-orange-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">My Core Values</h3>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  {[
                    "Write clean, readable code that others can understand",
                    "Always put the user experience first",
                    "Embrace continuous learning and growth",
                    "Deliver quality solutions that make an impact"
                  ].map((value, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.span 
                        className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span>{value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollCard>
            
            {/* What I Do */}
            <ScrollCard index={2}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <motion.div 
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What I Do</h3>
                <p className="text-gray-600 leading-relaxed">
                  As a full-stack developer, I bridge the gap between design and functionality. I work closely 
                  with teams to understand requirements, architect scalable solutions, and bring ideas to life 
                  through code. Whether it's a sleek frontend interface or a robust backend API, I focus on 
                  building applications that are both powerful and user-friendly.
                </p>
              </div>
            </ScrollCard>
            
            {/* Beyond Coding */}
            <ScrollCard index={3}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <motion.div 
                  className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-6 h-6 text-purple-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Beyond Coding</h3>
                <p className="text-gray-600 leading-relaxed">
                  When I'm not coding, you'll find me exploring new places, reading about philosophy and psychology, 
                  or working on creative projects like digital art and poetry. I believe these diverse interests 
                  keep me grounded and bring fresh perspectives to my work. I also enjoy gaming and staying active 
                  through hiking and sports.
                </p>
              </div>
            </ScrollCard>
          </div>
          
          {/* Fun Facts Section */}
          <ScrollCard index={4}>
            <div className="mt-12 bg-gradient-to-r from-white to-blue-50 rounded-3xl p-8 shadow-lg border border-gray-100">
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Coffee className="w-6 h-6 text-amber-600 mr-3" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">Quick Facts About Me</h3>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                // add gym emoji

                  { emoji: "🏋️‍♂️", title: "Gym enthusiast", subtitle: "Got to get these gains, Though i'm more of a sleeper build" },
                  { emoji: "🌍", title: "Love traveling", subtitle: "Always planning the next trip," },
                  { emoji: "📚", title: "Constant learner", subtitle: "Always reading something new, i'm interested in greek mythology, Psychology and Poetry." }
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold mb-2"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.5 
                      }}
                    >
                      {fact.emoji}
                    </motion.div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{fact.title}</span><br/>
                      {fact.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollCard>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;