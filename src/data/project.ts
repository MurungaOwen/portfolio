import { Briefcase, Code, Layers } from 'lucide-react';
import goodlyThumbnail from '@/assets/goodly.png';
import WasteManagerThumbnail from '@/assets/waste_manager.png';
import chatThumbnail from '@/assets/chat.png';

export const stats = [
    { id: 1, icon: Briefcase, value: 5, suffix: '+', label: 'years experience' },
    { id: 2, icon: Code, value: 50, suffix: '+', label: 'completed projects' },
    { id: 3, icon: Layers, value: 10, suffix: '+', label: 'technologies mastered' },
];

// Featured projects data (remains the same)
export const projects = [
  {
    id: 1,
    title: 'IoT Waste Manager',
    description: 'IoT-enabled waste tracking MVP for transparency and accountability in waste management.',
    tech: ['HTML', 'CSS', 'JavaScript', 'IoT'],
    link: 'https://murungaowen.github.io/waste_manager',
    thumbnail: WasteManagerThumbnail
  },
  {
    id: 2,
    title: 'Goodly Portfolio Project',
    description: 'Full-stack web app for donations to street children/orphans, creating awareness and featuring a clean UI and fast backend.',
    tech: ['React', 'TypeScript', 'Fast Api', 'Daraja API'],
    link: 'https://goodly.vercel.app',
    thumbnail: goodlyThumbnail
  },
    {
    id: 3,
    title: 'Ephemeral chat',
    description: 'A chat application where messages self-destruct after being read, ensuring privacy and confidentiality in conversations.',
    tech: ['Html', 'css', 'Node.js', 'websockets'],
    link: 'https://github.com/MurungaOwen/ephemeral_chat_app',
    thumbnail: chatThumbnail
  },

];


