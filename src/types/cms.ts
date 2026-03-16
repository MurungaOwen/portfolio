export type ExperienceType = 'featured' | 'project';

export interface CmsProject {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  category?: string;
  thumbnailUrl?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: 'production' | 'development' | 'archived';
  isFeatured?: boolean;
}

export interface CmsExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  type: ExperienceType;
  location?: string;
  teamSize?: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
}
