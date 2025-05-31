// Types
export interface Experience {
  company: string;
  role: string;
  duration: string;
  summary: string;
  achievements: {
    description: string;
    impact?: string;
    metric?: string;
  }[];
  technologies: {
    category: string;
    items: string[];
  }[];
  links?: {
    github?: string;
    demo?: string;
  };
  type: 'featured' | 'project';
  color?: string;
  location?: string;
  teamSize?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  highlights?: string[];
  location?: string;
  color?: string;
}

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'Full-Stack' | 'Backend' | 'Frontend' | 'API' | 'Mobile';
  thumbnail: string;
  technologies: Array<{
    name: string;
    icon: React.ReactElement; // MODIFIED: Was React.ReactNode
    color: string;
  }>;
  features: string[];
  challenges: string[];
  outcomes: string[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
  githubUrl?: string;
  liveUrl?: string;
  status: 'production' | 'development' | 'archived';
  isFeatured?: boolean;
  type: 'web' | 'mobile' | 'api' | 'fullstack';
};