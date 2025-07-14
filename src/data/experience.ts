// Data
import type{ Experience, EducationItem } from "@/types";


export const experiences: Experience[] = [
  {
    company: "COSEKE - Kenya Branch",
    role: "Backend and Cloud Engineer",
    duration: "May 2025 – Present",
    type: "featured",
    color: "from-blue-600 to-indigo-600",
    location: "on site",
    teamSize: "20+",
    summary: "Developing and maintaining secure, scalable backend services while managing cloud infrastructure and improving system quality through automation and documentation.",
    achievements: [
      {
        description: "Optimized PostgreSQL queries and indexing strategies",
        impact: "Improved API responsiveness and reduced load times under heavy usage",
        metric: "40% faster response time"
      },
      {
        description: "Configured and integrated SonarQube for code quality and continuous inspection",
        impact: "Enabled team-wide visibility on code issues and improved maintainability",
        metric: "80% code coverage achieved"
      },
      {
        description: "Provisioned and orchestrated containerized services using Kubernetes and Docker",
        impact: "Simplified deployment workflows and ensured scalable infrastructure",
        metric: "3x faster deployment cycles"
      },
      {
        description: "Documented system architecture and API design for internal developer onboarding and compliance",
        impact: "Reduced onboarding time and improved team collaboration",
        metric: "100+ pages of internal documentation"
      },
      {
        description: "Implemented encryption and access controls for media files at rest",
        impact: "Protected sensitive documents and ensured compliance with security standards",
        metric: "100% encryption coverage for media storage"
      },
      {
        description: "Designed RESTful APIs for core platform modules",
        impact: "Enabled modular and reusable backend components",
        metric: "99.9% backend uptime"
      }
    ],
    technologies: [
      { "category": "Backend", "items": ["Nest.js","Django", "TypeScript", "Sequelize", "Express.js"] },
      { "category": "Database", "items": ["PostgreSQL", "Redis"] },
      { "category": "DevOps", "items": ["Docker", "Kubernetes", "CI/CD", "AWS ECS"] },
      { "category": "Quality & Security", "items": ["SonarQube", "File encryption", "Role-based access control"] },
      { "category": "Documentation", "items": ["Markdown", "OpenAPI (Swagger)", "Confluence"] }
    ]
  },
  {
    company: "Generous Circle",
    role: "Backend Developer",
    duration: "Aug 2024 – feb 2025",
    type: "featured",
    color: "from-blue-600 to-indigo-600",
    location: "Remote",
    teamSize: "8 people",
    summary: "Leading backend development for a fintech fundraiser platform, focusing on scalability, performance, and secure payment integrations.",
    achievements: [
      {
        description: "Optimized PostgreSQL queries, significantly reducing API latency",
        impact: "Improved API responsiveness and enabled 2x user load capacity",
        metric: "40% faster"
      },
      {
        description: "Engineered Paystack payment gateway integration",
        impact: "Processed monthly transactions with reduced payment failures",
        metric: "5,000+ transactions"
      },
      {
        description: "Designed scalable RESTful APIs for core platform features",
        impact: "Ensured robust and maintainable backend architecture",
        metric: "99.9% uptime"
      },
      {
        description: "Implemented Scheduling using cron jobs",
        impact: "Running repetitive tasks efficiently",
        metric: "60% faster processing"
      }
    ],
    technologies: [
      { category: "Backend", items: ["Node.js", "Typescript", "Sequelize"] },
      { category: "Database", items: ["PostgreSQL", "Redis"] },
      { category: "DevOps", items: ["Docker", "AWS ECS", "CI/CD"] },
      {category: "payment", items: ["Paystack API"] },
    ]
  },
  {
    company: "AI Hub (Remote UK)",
    role: "Backend Developer", 
    duration: "Nov 2024 – Dec 2024",
    type: "featured",
    color: "from-purple-600 to-pink-600",
    location: "Remote UK",
    teamSize: "3 people",
    summary: "Contributed to an AI-driven Educational platform by developing backend features, integrating Stripe for payments, and ensuring code quality.",
    achievements: [
      {
        description: "Developed news feature using NEWS API",
        impact: "All news on AI was on the platform",
        metric: "15+ features"
      },
      {
        description: "Engineered Stripe payment integration for subscription services",
        impact: "Enabled new revenue streams and improved payment experience",
        metric: "$50K+ processed"
      },
      {
        description: "Achieved comprehensive test coverage for developed modules",
        impact: "Significantly improved code reliability and maintainability",
        metric: "90%+ coverage"
      }
    ],
    technologies: [
      { category: "Backend", items: ["Python", "Django", "Django REST framework"] },
      { category: "Testing", items: ["Pytest"] },
      { category: "Database", items: ["PostgreSQL"] },
      { category: "APIs", items: ["Stripe API", "REST APIs"] }
    ]
  },
  {
    company: "Corruption Report USSD",
    role: "Full-Stack Developer",
    duration: "3 Months Project",
    type: "project",
    color: "from-green-600 to-teal-600",
    location: "Kenya",
    summary: "ALX Final Project: USSD-based system for anonymous corruption reporting demonstrating social impact development.",
    achievements: [
      {
        description: "Designed complete USSD menu flow for intuitive user experience",
        metric: "5-step flow"
      },
      {
        description: "Developed secure backend with Python/Flask",
        impact: "Successfully delivered functional USSD application",
        metric: "100% completion"
      },
      {
        description: "Implemented admin interface for report management",
        metric: "Real-time dashboard"
      }
    ],
    technologies: [
      { category: "Backend", items: ["Python", "Flask"] },
      { category: "APIs", items: ["Africa's Talking USSD API"] },
      { category: "Database", items: ["SQLite"] }
    ],
    links: { github: "https://github.com/MurungaOwen/corruption_report_ussd" }
  },
  {
    company: "Goodly Portfolio Project",
    role: "Fullstack Developer",
    duration: "2 Months",
    type: "project",
    color: "from-orange-600 to-red-600",
    summary: "Full-stack application used to create awareness on street Kids and orphans and also for making donations and supporting the cause",
    achievements: [
      {
        description: "Built responsive UI with React, TypeScript, and Shadcn UI",
        metric: "Mobile-first design"
      },
      {
        description: "Implemented RESTful APIs with Node.js/Express",
        impact: "Delivered fully functional web application",
        metric: "12 API endpoints"
      },
      {
        description: "Managed PostgreSQL database with efficient queries",
        metric: "Sub-100ms queries"
      }
    ],
    technologies: [
      { category: "Frontend", items: ["React", "TypeScript", "Shadcn UI"] },
      { category: "Backend", items: ["Node.js", "Express.js"] },
      { category: "Database", items: ["PostgreSQL"] }
    ],
    links: { github: "https://github.com/MurungaOwen/goodly", demo: "https://goodly.vercel.app" }
  },
  {
    company: "Charchoma",
    role: "Google Apps Scripting Developer",
    duration: "Dec 2024 - jan 2025",
    type: "featured",
    color: "from-orange-600 to-red-600",
    summary: "Created a dashboard to help manage and track Orders and inventory for Charchoma hotel",
    achievements: [
      {
        description: "Built responsive UI using html, css and js",
        metric: "Easy Input of Orders and Inventory"
      },
      {
        description: "Implemented Google Apps Script for backend logic",
        impact: "Handling data processing and storage"
      },
      {
        description: "Created Graphs to visualise the trends and performance of the hotel",
        metric: "Real-time data visualization"
      }
    ],
    technologies: [
      { category: "Frontend", items: ["Html", "css", "Js"] },
      { category: "Backend", items: ["Google Apps Script"] },
      { category: "Storage", items: ["Google sheets"] }
    ]
  }
];

export const education: EducationItem[] = [
  {
    institution: "Egerton University",
    degree: "BSc. Computer Science",
    duration: "2022 - 2026",
    location: "Kenya",
    color: "from-indigo-600 to-blue-600",
    highlights: [
      "Specialized in Database Systems and Software Engineering principles",
    ]
  },
  {
    institution: "ALX Africa",
    degree: "Software Engineering Certification",
    duration: "2024",
    location: "Remote",
    color: "from-yellow-600 to-orange-600",
    highlights: [
      "Intensive 12-month software engineering curriculum with a focus on backend development",
      "Developed multiple hands-on projects including API development and USSD applications"
    ]
  },
 {
    institution: "ALX Africa",
    degree: "Professional Foundation",
    duration: "3 months",
    location: "Remote",
    color: "from-blue-600 to-orange-600",
    highlights: [
      "Intensive 3-month program covering soft skills like Leadership, Communication, and Problem Solving",
      "Working in Team environments and Agile methodologies",
      "Developed a strong foundation in professional skills and teamwork"
    ]
  },
  {
    institution: "ALX africa",
    degree: "Gig At A startup",
    duration: "3 months",
    location: "Kenya",
    color: "from-yellow-400 to-green-500",
    highlights: [
      "Worked for 3 months at a startup to practice what i had learnt and put them to use",
      "Worked on A team of 7 people and learnt how to collaborate with Teams",
      "learnt how to use Git flow and Agile methodologies like scrum"
    ]
  },
    {
    institution: "Kubernetes Cloud Native Foundation",
    degree: "Kubernetes Cloud Native Associate",
    duration: "2025",
    location: "Remote",
    color: "from-yellow-600 to-orange-600",
    highlights: [
      "Introduction to Kubernetes and Cloud Native technologies",
      "Hands-on experience with deploying and managing containerized applications",
      "Understanding of Kubernetes architecture and core concepts",
      "Learned about container orchestration, scaling, and networking in Kubernetes"
    ]
  },
    {
        institution: "Linux Foundation",
        degree: "Kubernetes and Cloud Native Essentials",
        duration: "2025",
        location: "Remote",
        color: "from-green-600 to-teal-600",
        highlights: [
        "Pods, Deployments, and Services",
        "Hands-on experience with Kubernetes architecture and core concepts",
        "Understanding of container orchestration, scaling, and networking in Kubernetes",
        ]
    }
];