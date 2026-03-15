import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ExternalLink, Github, MapPin, School, Users, X } from 'lucide-react';
import { education } from '@/data/experience';
import { useExperiences } from '@/hooks/useExperiences';
import type { CmsExperience } from '@/types/cms';

const ExperiencePage: React.FC = () => {
  const { experiences, loading, usingFallback } = useExperiences();
  const [activeItem, setActiveItem] = useState<CmsExperience | null>(null);

  const featured = experiences.filter((item) => item.type === 'featured');
  const projects = experiences.filter((item) => item.type === 'project');

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <section className="border border-stone-300 bg-stone-50 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-600">Career Timeline</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Experience</h1>
        <p className="mt-4 max-w-3xl text-stone-700">
          Experience cards are now driven by Strapi (`experiences` collection), so updates happen in your CMS and reflect
          in the site instantly.
        </p>
        {usingFallback && (
          <span className="mt-4 inline-flex border border-amber-700 px-2 py-1 text-xs uppercase tracking-wider text-amber-700">
            Local fallback data
          </span>
        )}
      </section>

      <section className="mt-8 space-y-10">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Professional Roles</h2>
          {loading && <p className="text-stone-700">Loading experience...</p>}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {!loading &&
              featured.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  className="cursor-pointer border border-stone-300 bg-white p-5"
                  onClick={() => setActiveItem(item)}
                >
                  <h3 className="text-xl font-bold">{item.company}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-stone-600">{item.role}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-wide text-stone-600">
                    <span className="inline-flex items-center"><Calendar className="mr-1 h-3 w-3" /> {item.duration}</span>
                    {item.location && <span className="inline-flex items-center"><MapPin className="mr-1 h-3 w-3" /> {item.location}</span>}
                    {item.teamSize && <span className="inline-flex items-center"><Users className="mr-1 h-3 w-3" /> {item.teamSize}</span>}
                  </div>
                  <p className="mt-4 text-sm text-stone-700">{item.summary}</p>
                </motion.article>
              ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Notable Projects</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {!loading &&
              projects.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  className="cursor-pointer border border-stone-300 bg-white p-5"
                  onClick={() => setActiveItem(item)}
                >
                  <h3 className="text-xl font-bold">{item.company}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-stone-600">{item.role}</p>
                  <p className="mt-4 text-sm text-stone-700">{item.summary}</p>
                </motion.article>
              ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 inline-flex items-center text-2xl font-bold">
            <School className="mr-2 h-5 w-5" /> Education
          </h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {education.map((item) => (
              <article key={`${item.institution}-${item.degree}`} className="border border-stone-300 bg-white p-5">
                <h3 className="text-xl font-bold">{item.institution}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-stone-600">{item.degree}</p>
                <p className="mt-2 text-sm text-stone-600">{item.duration}</p>
                {item.location && <p className="mt-1 text-sm text-stone-600">{item.location}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-stone-300 bg-stone-50"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-300 bg-stone-50 px-5 py-4">
                <h3 className="text-lg font-bold">{activeItem.company}</h3>
                <button
                  onClick={() => setActiveItem(null)}
                  className="border border-stone-300 p-1 hover:bg-stone-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6 p-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-600">{activeItem.role}</p>
                  <p className="mt-2 text-stone-700">{activeItem.summary}</p>
                </div>

                {activeItem.highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-600">Highlights</h4>
                    <ul className="mt-2 space-y-2 text-sm text-stone-700">
                      {activeItem.highlights.map((item, index) => (
                        <li key={`${activeItem.id}-highlight-${index}`} className="border border-stone-300 bg-white px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeItem.technologies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-stone-600">Technologies</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeItem.technologies.map((tech) => (
                        <span key={`${activeItem.id}-${tech}`} className="border border-stone-300 px-2 py-1 text-xs uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {activeItem.githubUrl && (
                    <a
                      href={activeItem.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Source Code <Github className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  {activeItem.demoUrl && (
                    <a
                      href={activeItem.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border border-stone-300 px-4 py-2 text-sm font-semibold hover:bg-stone-100"
                    >
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
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

export default ExperiencePage;
