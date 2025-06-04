import { Briefcase, Code, Layers } from 'lucide-react';
import goodlyThumbnail from '@/assets/goodly.png';


export const stats = [
    { id: 1, icon: Briefcase, value: 3, suffix: '+', label: 'years experience' },
    { id: 2, icon: Code, value: 50, suffix: '+', label: 'completed projects' },
    { id: 3, icon: Layers, value: 10, suffix: '+', label: 'technologies mastered' },
];

// Featured projects data (remains the same)
export const projects = [
  {
    id: 1,
    title: 'Corruption Report USSD',
    description: 'USSD-based system for anonymous corruption reporting, built during ALX Final Project to demonstrate social impact through technology.',
    tech: ['Python', 'Flask', 'Africa\'s Talking USSD API', 'SQLite'],
    link: 'https://github.com/MurungaOwen/corruption_report_ussd',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*bzkSjugKawFjon1vCHqKFg.png'
  },
  {
    id: 2,
    title: 'Goodly Portfolio Project',
    description: 'Full-stack web app for donations to street children/orphans, creating awareness and  featuring a clean UI and fast backend.',
    tech: ['React', 'TypeScript', 'Fast Api', 'Daraja API'],
    link: 'https://goodly.vercel.app',
    thumbnail: goodlyThumbnail
  }
];


