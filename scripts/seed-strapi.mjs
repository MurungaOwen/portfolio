#!/usr/bin/env node

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.VITE_STRAPI_URL || ""
).replace(/\/$/, '');
const STRAPI_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  process.env.VITE_STRAPI_API_TOKEN ||
  '';
const DRY_RUN = process.argv.includes('--dry-run');

if (!STRAPI_URL) {
  console.error('Missing STRAPI_URL (or VITE_STRAPI_URL).');
  process.exit(1);
}

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_API_TOKEN (or VITE_STRAPI_API_TOKEN).');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  'Content-Type': 'application/json',
};

const projects = [
  {
    title: 'IoT Waste Manager',
    description: 'IoT-enabled waste tracking MVP for transparency and accountability in waste management.',
    tagline: 'IoT waste tracking MVP',
    category: 'Web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'IoT'],
    liveUrl: 'https://murungaowen.github.io/waste_manager',
    projectStatus: 'production',
    isFeatured: true,
  },
  {
    title: 'Goodly Portfolio Project',
    description:
      'Full-stack web app for donations to street children/orphans, creating awareness and featuring a clean UI and fast backend.',
    tagline: 'Donation platform for social impact',
    category: 'Full-Stack',
    technologies: ['React', 'TypeScript', 'Fast Api', 'Daraja API'],
    liveUrl: 'https://goodly.vercel.app',
    projectStatus: 'production',
    isFeatured: true,
  },
  {
    title: 'Ephemeral chat',
    description:
      'A chat application where messages self-destruct after being read, ensuring privacy and confidentiality in conversations.',
    tagline: 'Privacy-first ephemeral messaging',
    category: 'Backend',
    technologies: ['Html', 'css', 'Node.js', 'websockets'],
    liveUrl: 'https://github.com/MurungaOwen/ephemeral_chat_app',
    githubUrl: 'https://github.com/MurungaOwen/ephemeral_chat_app',
    projectStatus: 'production',
    isFeatured: true,
  },
];

const experiences = [
  {
    company: 'COSEKE - Kenya Branch',
    role: 'Backend and Cloud Engineer',
    duration: 'May 2025 – Present',
    experienceType: 'featured',
    location: 'on site',
    teamSize: '20+',
    summary:
      'Developing and maintaining secure, scalable backend services while managing cloud infrastructure and improving system quality through automation and documentation.',
    highlights: [
      'Optimized PostgreSQL queries and indexing strategies (40% faster response time)',
      'Configured SonarQube and achieved 80% code coverage',
      'Provisioned services with Kubernetes and Docker (3x faster deployments)',
      'Implemented encryption and access controls for media files at rest',
      'Designed RESTful APIs for core platform modules (99.9% uptime)',
    ],
    technologies: [
      'Nest.js',
      'Django',
      'TypeScript',
      'Sequelize',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS ECS',
      'SonarQube',
    ],
  },
  {
    company: 'Generous Circle',
    role: 'Backend Developer',
    duration: 'Aug 2024 – Feb 2025',
    experienceType: 'featured',
    location: 'Remote',
    teamSize: '8 people',
    summary:
      'Led backend development for a fintech fundraiser platform, focusing on scalability, performance, and secure payment integrations.',
    highlights: [
      'Optimized PostgreSQL queries and reduced API latency by 40%',
      'Integrated Paystack gateway for 5,000+ monthly transactions',
      'Designed scalable REST APIs with 99.9% uptime',
      'Implemented scheduled jobs with cron for repetitive tasks',
    ],
    technologies: ['Node.js', 'Typescript', 'Sequelize', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS', 'CI/CD', 'Paystack API'],
  },
  {
    company: 'AI Hub (Remote UK)',
    role: 'Backend Developer',
    duration: 'Nov 2024 – Dec 2024',
    experienceType: 'featured',
    location: 'Remote UK',
    teamSize: '3 people',
    summary:
      'Contributed to an AI-driven educational platform by developing backend features, integrating Stripe, and improving test quality.',
    highlights: [
      'Built AI news feature using NEWS API',
      'Integrated Stripe subscription payments ($50K+ processed)',
      'Delivered 90%+ test coverage for core modules',
    ],
    technologies: ['Python', 'Django', 'Django REST framework', 'Pytest', 'PostgreSQL', 'Stripe API', 'REST APIs'],
  },
  {
    company: 'Corruption Report USSD',
    role: 'Full-Stack Developer',
    duration: '3 Months Project',
    experienceType: 'project',
    location: 'Kenya',
    summary:
      'ALX final project: USSD system for anonymous corruption reporting with admin report management dashboard.',
    highlights: [
      'Designed end-to-end USSD flow (5-step)',
      'Built secure backend with Python and Flask',
      'Implemented admin interface for real-time report management',
    ],
    technologies: ['Python', 'Flask', "Africa's Talking USSD API", 'SQLite'],
    githubUrl: 'https://github.com/MurungaOwen/corruption_report_ussd',
  },
  {
    company: 'Goodly Portfolio Project',
    role: 'Fullstack Developer',
    duration: '2 Months',
    experienceType: 'project',
    summary:
      'Full-stack application to create awareness on street kids and orphans while enabling community donations.',
    highlights: [
      'Built responsive UI with React, TypeScript, and Shadcn UI',
      'Implemented REST APIs with Node.js and Express',
      'Managed PostgreSQL with sub-100ms queries',
    ],
    technologies: ['React', 'TypeScript', 'Shadcn UI', 'Node.js', 'Express.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/MurungaOwen/goodly',
    demoUrl: 'https://goodly.vercel.app',
  },
  {
    company: 'Charchoma',
    role: 'Google Apps Scripting Developer',
    duration: 'Dec 2024 - Jan 2025',
    experienceType: 'featured',
    summary:
      'Built an order and inventory dashboard for Charchoma hotel with real-time trend visualization.',
    highlights: [
      'Built responsive UI with HTML, CSS, and JS',
      'Implemented Google Apps Script backend logic',
      'Created graphs for inventory and performance trends',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'Google Sheets'],
  },
];

const log = (message) => console.log(`[seed] ${message}`);

const toQuery = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    query.set(key, String(value));
  });
  return query.toString();
};

const request = async (path, options = {}) => {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  return response.json();
};

const publishIfNeeded = async (collection, entry) => {
  const identifier = getIdentifier(entry);
  if (!identifier || DRY_RUN) {
    return;
  }

  const normalized = entry.attributes ? { ...entry.attributes, ...entry } : entry;
  const isPublished = Boolean(normalized.publishedAt);

  if (isPublished) {
    return;
  }

  try {
    await request(`/api/${collection}/${identifier}/actions/publish`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    log(`published ${collection}: ${normalized.title || normalized.company || identifier}`);
  } catch (error) {
    log(`publish skipped for ${collection}/${identifier} (${error.message})`);
  }
};

const findByField = async (collection, field, value) => {
  const query = toQuery({
    [`filters[${field}][$eq]`]: value,
    'pagination[page]': 1,
    'pagination[pageSize]': 1,
  });

  const payload = await request(`/api/${collection}?${query}`);
  const items = Array.isArray(payload.data) ? payload.data : [];
  return items[0] || null;
};

const getIdentifier = (entry) => entry.documentId || entry.id;

const upsert = async (collection, uniqueField, entry) => {
  const existing = await findByField(collection, uniqueField, entry[uniqueField]);

  if (existing) {
    const identifier = getIdentifier(existing);
    if (!identifier) {
      throw new Error(`Cannot update ${collection} item without identifier.`);
    }

    if (DRY_RUN) {
      log(`DRY RUN update ${collection}/${identifier} (${entry[uniqueField]})`);
      return;
    }

    const updated = await request(`/api/${collection}/${identifier}`, {
      method: 'PUT',
      body: JSON.stringify({ data: entry }),
    });
    await publishIfNeeded(collection, updated.data || existing);

    log(`updated ${collection}: ${entry[uniqueField]}`);
    return;
  }

  if (DRY_RUN) {
    log(`DRY RUN create ${collection} (${entry[uniqueField]})`);
    return;
  }

  const created = await request(`/api/${collection}`, {
    method: 'POST',
    body: JSON.stringify({ data: entry }),
  });
  await publishIfNeeded(collection, created.data);

  log(`created ${collection}: ${entry[uniqueField]}`);
};

const verifyExperiences = async () => {
  const payload = await request('/api/experiences?pagination[pageSize]=200&sort=company:asc');
  const items = Array.isArray(payload.data) ? payload.data : [];

  const normalized = items.map((item) => (item.attributes ? { ...item.attributes, ...item } : item));
  const featured = normalized.filter((item) => (item.type || item.experienceType) === 'featured');
  const projects = normalized.filter((item) => (item.type || item.experienceType) === 'project');

  log(`verify experiences: total=${normalized.length}, featured=${featured.length}, project=${projects.length}`);
  if (featured.length > 0) {
    log(`featured entries: ${featured.map((item) => item.company).join(', ')}`);
  }
};

const run = async () => {
  log(`Seeding against ${STRAPI_URL}`);
  log(DRY_RUN ? 'Mode: dry-run' : 'Mode: apply');

  for (const project of projects) {
    await upsert('projects', 'title', project);
  }

  for (const experience of experiences) {
    const normalizedExperience = {
      ...experience,
      // Strapi content-type currently uses `type`; keep backward-compat with older seed data.
      type: experience.type || experience.experienceType || 'featured',
    };
    delete normalizedExperience.experienceType;

    await upsert('experiences', 'company', normalizedExperience);
  }

  await verifyExperiences();
  log('Done.');
};

run().catch((error) => {
  console.error('[seed] Failed:', error.message);
  process.exit(1);
});
