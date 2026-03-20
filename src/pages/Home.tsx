import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import profileImg from '@/assets/owenmurunga.png';
import links from '@/data/links';
import { useProjects } from '@/hooks/useProjects';
import Hero3D from '@/components/ui/Hero3D';

const HomePage: React.FC = () => {
  const { projects, loading, usingFallback } = useProjects();
  const featured = projects.filter((project) => project.isFeatured).slice(0, 3);
  const visibleProjects = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050706] text-zinc-100">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border border-zinc-900 bg-[#090b09] p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:18px_18px]" />
        
        {/* 3D Background Feature */}
        <Hero3D />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 z-10">

          {/* LEFT — copy */}
          <div className="lg:col-span-8 flex flex-col justify-center">

            {/* eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex w-fit items-center border border-lime-400/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-lime-300"
            >
              Software & Infra Engineer · Nairobi, Kenya
            </motion.p>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl"
            >
              Engineering{' '}
              <span className="text-lime-400">resilient systems</span>
              {' '}— where clean code meets{' '}
              <em className="not-italic text-zinc-400">robust infrastructure.</em>
            </motion.h1>

            {/* sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 max-w-xl text-[15px] leading-[1.75] text-zinc-400"
            >
              Software engineer with a strong grip on backend architecture,
              cloud infrastructure, and payment integrations. I build
              complete, production-ready software — clean APIs, reliable
              services, and interfaces people actually want to use.
            </motion.p>

            {/* proof points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2"
            >
              {[
                '4+ years shipping production code',
                'Software & Infra · Payments · Cloud',
                'Kenya · Remote-ready',
              ].map((point) => (
                <span key={point} className="flex items-center gap-2 text-[13px] text-zinc-500">
                  <span className="h-1 w-1 rounded-full bg-lime-400 flex-shrink-0" />
                  {point}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="inline-flex items-center border border-lime-400 bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                See My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href={links.cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-zinc-700 bg-transparent px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
              >
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="border border-zinc-800 bg-zinc-950 p-3">
              <img
                src={profileImg}
                alt="Owen Murunga"
                className="aspect-[4/5] w-full object-cover grayscale"
              />
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>Software & Infra Engineer</span>
                <span className="text-lime-300">Open to Work</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a href={links.github.url} target="_blank" rel="noopener noreferrer"
                className="border border-zinc-800 p-2 text-zinc-300 hover:bg-zinc-900 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer"
                className="border border-zinc-800 p-2 text-zinc-300 hover:bg-zinc-900 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={links.email.url}
                className="border border-zinc-800 p-2 text-zinc-300 hover:bg-zinc-900 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* mini value prop */}
            <p className="mt-5 text-[11px] leading-relaxed text-zinc-600 uppercase tracking-[0.14em]">
              "Readable code. Reliable systems. Real outcomes."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="mt-8 border border-zinc-900 bg-[#090b09] p-8 md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-lime-400">// selected projects</p>
            <h2 className="text-3xl font-black tracking-tight">Featured Work</h2>
          </div>
          <div className="flex items-center gap-3">
            {usingFallback && (
              <span className="border border-amber-500/60 px-2 py-1 text-xs uppercase tracking-wider text-amber-300">
                Local fallback data
              </span>
            )}
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-zinc-500 hover:text-lime-400 transition-colors"
            >
              All projects <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-zinc-500 text-sm">Loading projects…</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className="group border border-zinc-800 bg-[#050706] p-4 transition-colors hover:border-zinc-700"
              >
                <div className="mb-4 aspect-video overflow-hidden border border-zinc-800 bg-zinc-950">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-zinc-700">
                      No preview
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-lime-400 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="border border-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-600"
                    >
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