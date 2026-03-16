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
    <div className="min-h-screen border border-zinc-900 bg-[#050706] text-zinc-100">
      <section className="border-b border-zinc-900 px-6 py-10 md:px-12 md:py-14">
        <p className="text-xs uppercase tracking-[0.28em] text-lime-400">// 003 - Projects</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-100 md:text-7xl">Projects</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-400">
          A curated index of shipped systems, experiments, and production builds with the architecture choices, stack,
          and delivery context behind each one.
        </p>
      </section>

      <section className="border-b border-zinc-900 px-6 py-6 md:px-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                activeCategory === category
                  ? 'border-lime-400 bg-lime-400 text-zinc-950'
                  : 'border-zinc-800 bg-[#0a0d0b] text-zinc-500 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              {category}
            </button>
          ))}
          {usingFallback && (
            <span className="border border-amber-500/50 bg-amber-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              fallback
            </span>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-0 px-6 py-8 md:grid-cols-2 md:px-12 xl:grid-cols-3">
        {loading && <p className="text-zinc-400">Loading projects...</p>}

        {!loading && filteredProjects.length === 0 && (
          <div className="border border-zinc-800 bg-[#0a0d0b] p-6 text-zinc-400">No projects found in this category.</div>
        )}

        {!loading &&
          filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="group cursor-pointer border border-zinc-900 bg-[#090b09] p-0"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative m-6 mb-0 aspect-video overflow-hidden border border-zinc-800 bg-[#0b1020]">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.12),transparent_32%),linear-gradient(180deg,#0f1528,#0a0f1f)]" />
                )}
                <div className="absolute left-3 top-3 flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-lime-400" />
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-black text-zinc-100">{project.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-zinc-400">{project.tagline || project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="border border-zinc-800 bg-[#0a0d0b] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-zinc-700 bg-[#090b09]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-[#090b09] px-5 py-4">
                <h3 className="text-lg font-bold text-zinc-100">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border border-zinc-700 p-1 text-zinc-400 hover:bg-zinc-900"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5">
                {selectedProject.thumbnailUrl && (
                  <div className="mb-5 overflow-hidden border border-zinc-800">
                    <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} className="w-full object-cover" />
                  </div>
                )}

                <p className="text-zinc-300">{selectedProject.description}</p>

                <div className="mt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Tech stack</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={`${selectedProject.id}-detail-${tech}`}
                        className="border border-zinc-800 px-2 py-1 text-xs uppercase text-zinc-400"
                      >
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
                      className="inline-flex items-center border border-lime-400 bg-lime-400 px-4 py-2 text-sm font-semibold text-zinc-950"
                    >
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
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
