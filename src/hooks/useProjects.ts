import { useEffect, useState } from 'react';
import { fetchProjects, isStrapiConfigured } from '@/services/cms';
import type { CmsProject } from '@/types/cms';

interface UseProjectsResult {
  projects: CmsProject[];
  loading: boolean;
  usingFallback: boolean;
}

export const useProjects = (): UseProjectsResult => {
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      const items = await fetchProjects();
      if (!active) {
        return;
      }

      setProjects(items);
      setLoading(false);
    };

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  return {
    projects,
    loading,
    usingFallback: !isStrapiConfigured(),
  };
};
