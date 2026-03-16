import { experiences as localExperiences } from '@/data/experience';
import { projects as localProjects } from '@/data/project';
import type { CmsExperience, CmsProject } from '@/types/cms';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '');
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN as string | undefined;

interface StrapiCollectionResponse {
  data: unknown[];
}

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        return item;
      }

      if (item && typeof item === 'object') {
        const named = (item as Record<string, unknown>).name;
        return typeof named === 'string' ? named : '';
      }

      return '';
    })
    .filter(Boolean);
};

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' ? (value as Record<string, unknown>) : {};

const normalizeStrapiEntry = (entry: unknown): Record<string, unknown> => {
  const record = asRecord(entry);
  const attributes = asRecord(record.attributes);
  const merged = Object.keys(attributes).length > 0 ? { ...attributes, ...record } : record;
  return merged;
};

const resolveMediaUrl = (value: unknown): string | undefined => {
  const media = asRecord(value);

  const directUrl = asString(media.url);
  if (directUrl) {
    return directUrl.startsWith('http') || !STRAPI_URL ? directUrl : `${STRAPI_URL}${directUrl}`;
  }

  const data = asRecord(media.data);
  const dataUrl = asString(asRecord(data.attributes).url) || asString(data.url);
  if (!dataUrl) {
    return undefined;
  }

  return dataUrl.startsWith('http') || !STRAPI_URL ? dataUrl : `${STRAPI_URL}${dataUrl}`;
};

const createFallbackProjects = (): CmsProject[] =>
  localProjects.map((project) => ({
    id: String(project.id),
    title: project.title,
    description: project.description,
    tagline: project.description,
    category: 'Web',
    thumbnailUrl: project.thumbnail,
    technologies: project.tech,
    liveUrl: project.link,
    status: 'production',
    isFeatured: true,
  }));

const createFallbackExperiences = (): CmsExperience[] =>
  localExperiences.map((experience, index) => ({
    id: `${experience.company}-${experience.role}-${index}`,
    company: experience.company,
    role: experience.role,
    duration: experience.duration,
    summary: experience.summary,
    type: experience.type,
    location: experience.location,
    teamSize: experience.teamSize,
    technologies: experience.technologies.flatMap((group) => group.items),
    highlights: experience.achievements.map((item) => item.metric || item.description),
    githubUrl: experience.links?.github,
    demoUrl: experience.links?.demo,
  }));

export const isStrapiConfigured = (): boolean => Boolean(STRAPI_URL);

const fetchCollection = async (collection: string): Promise<unknown[]> => {
  if (!STRAPI_URL) {
    throw new Error('Strapi URL is missing. Set VITE_STRAPI_URL.');
  }

  const response = await fetch(`${STRAPI_URL}/api/${collection}?populate=*`, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collection}: ${response.status}`);
  }

  const payload = (await response.json()) as StrapiCollectionResponse;
  return asArray(payload.data);
};

export const fetchProjects = async (): Promise<CmsProject[]> => {
  try {
    const entries = await fetchCollection('projects');

    return entries.map((entry, index) => {
      const item = normalizeStrapiEntry(entry);

      return {
        id: asString(item.documentId) || asString(item.id) || `project-${index}`,
        title: asString(item.title, 'Untitled Project'),
        description: asString(item.description, 'No description provided.'),
        tagline: asString(item.tagline),
        category: asString(item.category),
        thumbnailUrl: resolveMediaUrl(item.thumbnail),
        technologies: asStringArray(item.technologies),
        liveUrl: asString(item.liveUrl),
        githubUrl: asString(item.githubUrl),
        status: (asString(item.projectStatus) || asString(item.status)) as CmsProject['status'],
        isFeatured: Boolean(item.isFeatured),
      };
    });
  } catch {
    return createFallbackProjects();
  }
};

export const fetchExperiences = async (): Promise<CmsExperience[]> => {
  try {
    const entries = await fetchCollection('experiences');

    return entries.map((entry, index) => {
      const item = normalizeStrapiEntry(entry);

      const technologyGroups = asArray(item.technologies);
      const flattenedTech =
        technologyGroups.length > 0
          ? technologyGroups
              .flatMap((group) => asStringArray(asRecord(group).items).length > 0 ? asStringArray(asRecord(group).items) : asStringArray(group))
              .filter(Boolean)
          : asStringArray(item.technologies);

      const highlights = asArray(item.highlights).map((highlight) => asString(highlight)).filter(Boolean);
      const achievements = asArray(item.achievements)
        .map((achievement) => asString(asRecord(achievement).description) || asString(achievement))
        .filter(Boolean);

      return {
        id: asString(item.documentId) || asString(item.id) || `experience-${index}`,
        company: asString(item.company, 'Unknown Company'),
        role: asString(item.role, 'Role not specified'),
        duration: asString(item.duration, 'N/A'),
        summary: asString(item.summary, 'No summary provided.'),
        type: (asString(item.experienceType) || asString(item.type)) === 'project' ? 'project' : 'featured',
        location: asString(item.location),
        teamSize: asString(item.teamSize),
        technologies: flattenedTech,
        highlights: highlights.length > 0 ? highlights : achievements,
        githubUrl: asString(asRecord(item.links).github) || asString(item.githubUrl),
        demoUrl: asString(asRecord(item.links).demo) || asString(item.demoUrl),
      };
    });
  } catch {
    return createFallbackExperiences();
  }
};
