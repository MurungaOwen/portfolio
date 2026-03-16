import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { useExperiences } from '@/hooks/useExperiences';

const ExperiencePage: React.FC = () => {
  const { experiences, loading, usingFallback } = useExperiences();
  const [activeTab, setActiveTab] = useState<'featured' | 'project'>('featured');

  const items = useMemo(
    () => experiences.filter((item) => item.type === activeTab),
    [experiences, activeTab],
  );

  return (
    <div className="min-h-screen bg-[#050706] text-zinc-100">
      <section className="border border-zinc-900 bg-[#090b09] px-8 py-10 md:px-12 md:py-14">
        <p className="text-xs uppercase tracking-[0.25em] text-lime-400">// 005 - Experience</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">Experience</h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-zinc-400">
          A record of team roles and client projects where I delivered backend architecture, API reliability, and operational scale.
        </p>
        {usingFallback && (
          <span className="mt-6 inline-flex border border-amber-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
            local fallback data
          </span>
        )}
      </section>

      <section className="border-b border-zinc-900 px-8 py-5 md:px-12">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('featured')}
            className={`pb-3 text-sm font-semibold uppercase tracking-[0.16em] transition ${
              activeTab === 'featured'
                ? 'border-b-2 border-lime-400 text-lime-300'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Professional Roles
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`pb-3 text-sm font-semibold uppercase tracking-[0.16em] transition ${
              activeTab === 'project'
                ? 'border-b-2 border-lime-400 text-lime-300'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Notable Projects
          </button>
        </div>
      </section>

      <section className="px-8 py-10 md:px-12">
        {loading && <p className="text-zinc-400">Loading experience...</p>}

        {!loading && items.length === 0 && (
          <div className="border border-zinc-800 bg-[#090b09] p-6 text-zinc-400">
            No entries found.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="relative ml-3 space-y-12 border-l border-zinc-900 pl-10 md:ml-8 md:pl-20">
            {items.map((item) => {
              const isCurrent = /present/i.test(item.duration);
              return (
                <article key={item.id} className="relative">
                  <span className="absolute -left-[3.15rem] top-1.5 h-4 w-4 rounded-full border border-lime-500/60 bg-lime-300 shadow-[0_0_12px_rgba(163,230,53,0.45)] md:-left-[5.15rem]" />

                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">{item.duration}</span>
                    {isCurrent && (
                      <span className="border border-lime-500/60 bg-lime-400/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-300">
                        current
                      </span>
                    )}
                    {item.location && (
                      <span className="border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        {item.location}
                      </span>
                    )}
                    {item.teamSize && (
                      <span className="inline-flex items-center border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        <Users className="mr-1 h-3 w-3" /> {item.teamSize}
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl font-black uppercase tracking-wide text-zinc-100">{item.company}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{item.role}</p>

                  <div className="mt-6 max-w-4xl border border-zinc-800 bg-[#0a0d0b] p-6">
                    <p className="text-xl leading-relaxed text-zinc-300">{item.summary}</p>

                    {item.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2 text-lg text-zinc-400">
                        {item.highlights.slice(0, 4).map((highlight, index) => (
                          <li key={`${item.id}-${index}`} className="flex items-start">
                            <span className="mr-3 mt-1 text-lime-400">-</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={`${item.id}-${tech}`}
                            className="border border-zinc-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExperiencePage;
