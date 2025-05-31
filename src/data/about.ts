import { 
    Code, Cloud,
    BookOpen, Mountain, Palette,
    Leaf, SearchCode
} from 'lucide-react';
import {
  FaWeight
} from 'react-icons/fa';


export const timeline = [
    {
      year: '2020',
      title: 'First Lines of Code',
      description: 'Discovered programming through high school computer classes',
      icon: Code,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      year: '2022',
      title: 'Joined My first bootcamp : Modcom Institute of Technology',
      description: 'Started Writing Python, Did basic webdevelopment using flask SQL and Django',
      icon: Leaf,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      year: '2022',
      title: 'Computer Science Degree',
      description: 'Started formal CS education at university',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      year: '2024',
      title: 'Enrolled for ALX software Engineering Program',
      description: 'Took the Softwaare engineering program at ALX africa where i did C, and got introduced to deep software design',
      icon: Code,
      color: 'bg-green-100 text-green-600'
    },
    {
      year: '2025',
      title: 'Cloud Computing Goal',
      description: 'Expanding skills to include Cloud skills and DevOps practices. Doing AWS and Kubernetes',
      icon: Cloud,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      year: 'Present',
      title: 'Continuous Growth',
      description: 'Building complex systems and mentoring others, Currently doing Kubernetes by Linux cloud foundation and working on code optimization',
      icon: SearchCode,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

// Personal interests
export const interests = [
    { icon: BookOpen, name: 'Reading', description: 'Philosophy, psychology, and Art' },
    { icon: Mountain, name: 'Hiking', description: 'Exploring nature and new trails' },
    { icon: FaWeight, name: 'Gym', description: 'Gym Rat, though more of calisthenics' },
];