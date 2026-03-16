import { useEffect, useState } from 'react';
import { fetchExperiences, isStrapiConfigured } from '@/services/cms';
import type { CmsExperience } from '@/types/cms';

interface UseExperiencesResult {
  experiences: CmsExperience[];
  loading: boolean;
  usingFallback: boolean;
}

export const useExperiences = (): UseExperiencesResult => {
  const [experiences, setExperiences] = useState<CmsExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadExperiences = async () => {
      const items = await fetchExperiences();
      if (!active) {
        return;
      }

      setExperiences(items);
      setLoading(false);
    };

    loadExperiences();

    return () => {
      active = false;
    };
  }, []);

  return {
    experiences,
    loading,
    usingFallback: !isStrapiConfigured(),
  };
};
