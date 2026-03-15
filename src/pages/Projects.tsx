import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import type { CmsProject } from '@/types/cms';

const ProjectsPage: React.FC = () => {
  const { projects, loading, usingFallback } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<CmsProject | null>(null);

  const categories = useMemo(() => {
    const found = new Set(projects.map((project) => (project.category || 'uncategorized').toLowerCase()));
    return ['all', ...Array.from(found)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }

    return projects.filter(
      (project) => (project.category || 'uncategorized').toLowerCase() === activeCategory,
    );
  }, [activeCategory, projects]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <section className="border border-stone-300 bg-stone-50 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-600">Portfolio CMS</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Projects</h1>
        <p className="mt-4 max-w-3xl text-stone-700">
          Project cards are now fed by Strapi (`projects` collection). You can add, edit, and reorder entries in your CMS
          without touching code.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border px-3 py-1 text-sm uppercase transition ${
                activeCategory === category
                  ? 'border-stone-900 bg-stone-900 text-stone-50'
                  : 'border-stone-300 bg-stone-100 text-stone-700 hover:border-stone-900'
              }`}
            >
              {category}
            </button>
          ))}
          {usingFallback && <span className="border border-amber-700 px-2 py-1 text-xs text-amber-700">Fallback data</span>}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading && <p className="text-stone-700">Loading projects...</p>}

        {!loading && filteredProjects.length === 0 && (
          <div className="border border-stone-300 bg-stone-50 p-6 text-stone-700">No projects found in this category.</div>
        )}

        {!loading &&
          filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="group cursor-pointer border border-stone-300 bg-white p-4"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden border border-stone-200 bg-stone-100">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-stone-500">No image</div>
                )}
              </div>

              <h2 className="mt-4 text-xl font-bold">{project.title}</h2>
              <p className="mt-2 text-sm text-stone-700">{project.tagline || project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span key={`${project.id}-${tech}`} className="border border-stone-300 px-2 py-1 text-xs uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-stone-300 bg-stone-50"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-300 bg-stone-50 px-5 py-4">
                <h3 className="text-lg font-bold">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border border-stone-300 p-1 text-stone-700 hover:bg-stone-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5">
                {selectedProject.thumbnailUrl && (
                  <div className="mb-5 overflow-hidden border border-stone-200">
                    <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} className="w-full object-cover" />
                  </div>
                )}

                <p className="text-stone-700">{selectedProject.description}</p>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-600">Tech stack</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={`${selectedProject.id}-detail-${tech}`} className="border border-stone-300 px-2 py-1 text-xs uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-100"
                    >
                      Source Code <Github className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
