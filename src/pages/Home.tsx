import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '@/assets/owenmurunga.png';
import links from '@/data/links';
import { useProjects } from '@/hooks/useProjects';

const HomePage: React.FC = () => {
  const { projects, loading, usingFallback } = useProjects();
  const featured = projects.filter((project) => project.isFeatured).slice(0, 3);
  const visibleProjects = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <section className="relative overflow-hidden border border-stone-300 bg-stone-50 p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#57534e_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-4 inline-flex items-center border border-stone-900 px-3 py-1 text-xs uppercase tracking-[0.2em]">
              Backend Engineer · Nairobi
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              I build reliable systems and interfaces with personality.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Portfolio content now supports a CMS workflow, so projects and experience can be updated from Strapi instead
              of editing source files every time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center border border-stone-900 bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={links.cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-stone-400 bg-stone-50 px-5 py-3 text-sm font-semibold transition hover:border-stone-900"
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-stone-300 bg-stone-200 p-3">
              <img src={profileImg} alt="Owen Murunga" className="aspect-[4/5] w-full object-cover grayscale" />
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-700">
                <span>Software Engineer</span>
                <span>Open to Work</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a href={links.github.url} target="_blank" rel="noopener noreferrer" className="border border-stone-300 p-2 hover:bg-stone-200">
                <Github className="h-4 w-4" />
              </a>
              <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer" className="border border-stone-300 p-2 hover:bg-stone-200">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={links.email.url} className="border border-stone-300 p-2 hover:bg-stone-200">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 border border-stone-300 bg-stone-50 p-8 md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-bold">Featured Work</h2>
          {usingFallback && (
            <span className="border border-amber-600 px-2 py-1 text-xs uppercase tracking-wider text-amber-700">
              Local fallback data
            </span>
          )}
        </div>

        {loading ? (
          <p className="text-stone-600">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className="border border-stone-300 bg-white p-4"
              >
                <div className="mb-3 aspect-video overflow-hidden border border-stone-200 bg-stone-100">
                  {project.thumbnailUrl ? (
                    <img src={project.thumbnailUrl} alt={project.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-stone-500">No image</div>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={`${project.id}-${tech}`} className="border border-stone-300 px-2 py-1 text-xs uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
