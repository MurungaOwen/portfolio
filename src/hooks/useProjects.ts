import { useQuery } from '@tanstack/react-query';
import { fetchProjects, isStrapiConfigured } from '@/services/cms';
import type { CmsProject } from '@/types/cms';

interface UseProjectsResult {
  projects: CmsProject[];
  loading: boolean;
  usingFallback: boolean;
}

export const useProjects = (): UseProjectsResult => {
  const { data, isPending } = useQuery<CmsProject[]>({
    queryKey: ['cms', 'projects'],
    queryFn: fetchProjects,
  });

  return {
    projects: data ?? [],
    loading: isPending && !data,
    usingFallback: !isStrapiConfigured(),
  };
};
