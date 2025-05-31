import { Briefcase, Code, Layers } from 'lucide-react';
export const stats = [
    { id: 1, icon: Briefcase, value: 3, suffix: '+', label: 'years experience' },
    { id: 2, icon: Code, value: 50, suffix: '+', label: 'completed projects' },
    { id: 3, icon: Layers, value: 10, suffix: '+', label: 'technologies mastered' },
];

// Featured projects data (remains the same)
export const projects = [
    {
      id: 1,
      title: 'Ai Learning Hub',
      description: 'AI-powered learning platform with threaded discussions, assignments, news and modules on AI',
      tech: ['Django', 'Django Rest Framework', 'PostgreSQL', 'Docker'],
      link: 'https://github.com/MurungaOwen/ai-hub-backend'
    },
    {
      id: 2,
      title: 'Goodly',
      description: 'A site for creating awareness on street children and providing a platform for donations',
      tech: ['Python', 'FastAPI', 'React', 'axios', 'Tailwind CSS'],
      link: 'https://goodly.vercel.app/'
    }
  ];

