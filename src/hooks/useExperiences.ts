import { useQuery } from '@tanstack/react-query';
import { fetchExperiences, isStrapiConfigured } from '@/services/cms';
import type { CmsExperience } from '@/types/cms';

interface UseExperiencesResult {
  experiences: CmsExperience[];
  loading: boolean;
  usingFallback: boolean;
}

export const useExperiences = (): UseExperiencesResult => {
  const { data, isPending } = useQuery<CmsExperience[]>({
    queryKey: ['cms', 'experiences'],
    queryFn: fetchExperiences,
  });

  return {
    experiences: data ?? [],
    loading: isPending && !data,
    usingFallback: !isStrapiConfigured(),
  };
};
