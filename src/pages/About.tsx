import React, { useRef } from 'react';
import {
  MapPin,
  Calendar,
  Heart,
  Linkedin,
  Github,
  Mail,
  Quote,
  Code2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import profileImg from '@/assets/owenmurunga.png';
import { Link } from 'react-router-dom';
import { timeline, interests } from '@/data/about';
import links from '@/data/links';

/* ─────────────────────────────────────────────
   Tiny reusable components
───────────────────────────────────────────── */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-400 mb-3">
    {children}
  </p>
);

const Divider = () => (
  <div className="h-px w-full bg-zinc-800/60 my-0" />
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  /* hero image parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(heroScroll, [0, 1], ['0%', '12%']);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  });

  const inView = (i = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, margin: '-80px' },
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050706] text-zinc-100 relative overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── scroll progress ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-lime-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ── ambient glow ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 70% 10%, rgba(163,230,53,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section ref={heroRef} className="pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <motion.div {...stagger(0)}>
                <Eyebrow>// About</Eyebrow>
                <h1
                  className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-zinc-100 mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  The person{' '}
                  <em className="not-italic text-lime-400">behind</em>
                  <br />the code.
                </h1>
              </motion.div>

              <motion.p
                {...stagger(1)}
                className="text-[15px] leading-relaxed text-zinc-400 mb-8 max-w-md"
              >
                More than just a developer — a curious mind, creative thinker,
                and problem solver with a passion for building meaningful
                solutions.
              </motion.p>

              {/* meta pills */}
              <motion.div {...stagger(2)} className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon: MapPin, label: 'Nairobi, Kenya' },
                  { icon: Calendar, label: '3+ years experience' },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 text-[13px]"
                  >
                    <Icon className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* social links */}
              <motion.div {...stagger(3)} className="flex gap-3">
                {[
                  { href: links.linkedin.url, icon: Linkedin, label: 'LinkedIn', style: 'bg-lime-400/10 text-lime-300 border-lime-400/20 hover:bg-lime-400/20' },
                  { href: links.github.url,   icon: Github,   label: 'GitHub',   style: 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800' },
                  { href: links.email.url,    icon: Mail,     label: 'Email',    style: 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800' },
                ].map(({ href, icon: Icon, label, style }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 border rounded-sm transition-colors ${style}`}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — profile image */}
            <motion.div
              {...stagger(2)}
              className="relative flex justify-center lg:justify-end"
            >
              {/* decorative frame */}
              <div
                aria-hidden
                className="absolute -inset-3 border border-lime-400/8 rounded-sm pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -inset-6 border border-zinc-800/40 rounded-sm pointer-events-none"
              />

              <div className="relative w-full max-w-sm overflow-hidden rounded-sm border border-zinc-800 shadow-2xl bg-zinc-950">
                <motion.img
                  src={profileImg}
                  alt="Owen Murunga"
                  className="w-full h-auto object-cover"
                  style={{ y: imgY }}
                />
                {/* overlay badge */}
                <div className="absolute bottom-0 inset-x-0 px-5 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <Heart className="w-4 h-4 text-lime-400 flex-shrink-0" />
                    <span>Currently open to new opportunities</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════
            JOURNEY TIMELINE
        ══════════════════════════════════════ */}
        <section className="py-24">
          <motion.div {...inView()} className="mb-16 text-center">
            <Eyebrow>// journey</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black tracking-tight text-zinc-100 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              My Development Journey
            </h2>
            <p className="text-zinc-500 text-[14px] max-w-md mx-auto leading-relaxed">
              From first lines of code to building complex systems — the path that shaped me as a developer.
            </p>
          </motion.div>

          <div className="relative">
            {/* centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />

            <div className="space-y-0">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    {...inView(index * 0.5)}
                    className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* content side */}
                    <div className={`w-[calc(50%-40px)] py-8 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                      <motion.div
                        whileHover={{ x: isLeft ? -4 : 4 }}
                        className="inline-block group"
                      >
                        <div
                          className={`inline-flex items-center gap-2 mb-2 text-[10px] font-mono tracking-[0.14em] uppercase text-zinc-600 ${
                            isLeft ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <span>{item.year}</span>
                        </div>
                        <h3 className="text-lg font-bold text-zinc-100 mb-1 group-hover:text-lime-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-zinc-500 leading-relaxed">{item.description}</p>
                      </motion.div>
                    </div>

                    {/* dot */}
                    <div className="w-20 flex-shrink-0 flex items-center justify-center relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full border-2 border-zinc-800 flex items-center justify-center shadow-lg ${item.color}`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* empty side */}
                    <div className="w-[calc(50%-40px)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════
            PHILOSOPHY
        ══════════════════════════════════════ */}
        <section className="py-24">
          <motion.div {...inView()} className="mb-16">
            <Eyebrow>// philosophy</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black tracking-tight text-zinc-100"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              My Development Philosophy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800/50">
            {/* Approach to Code */}
            <motion.div
              {...inView(0)}
              className="bg-[#070908] p-10 lg:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-lime-400">
                  <Code2 className="h-4 w-4" />
                </span>
                <h3 className="text-2xl font-black tracking-tight text-zinc-100"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Approach to Code
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Readability over cleverness',
                  'Maintainability is non-negotiable',
                  'Documentation as part of the process',
                  'Continuous refactoring',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    {...inView(i * 0.5)}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 text-[17px] text-zinc-400 cursor-default"
                  >
                    <span className="h-2 w-2 rounded-full bg-lime-400 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Team Values */}
            <motion.div
              {...inView(0.1)}
              className="bg-[#070908] p-10 lg:p-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-900 text-violet-400">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h3 className="text-2xl font-black tracking-tight text-zinc-100"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Team Values
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Clear communication',
                  'Empathy in code reviews',
                  'Knowledge sharing',
                  'Celebrating small wins',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    {...inView(i * 0.5)}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 text-[17px] text-zinc-400 cursor-default"
                  >
                    <span className="h-2 w-2 rounded-full bg-violet-400 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════
            BEYOND THE KEYBOARD
        ══════════════════════════════════════ */}
        <section className="py-24">
          <motion.div {...inView()} className="mb-16 text-center">
            <Eyebrow>// beyond the keyboard</Eyebrow>
            <h2
              className="text-3xl md:text-4xl font-black tracking-tight text-zinc-100 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What Keeps Me Inspired
            </h2>
            <p className="text-zinc-500 text-[14px] max-w-md mx-auto leading-relaxed">
              The hobbies and interests that keep me balanced and curious.
            </p>
          </motion.div>

          {/* Always render exactly 4 slots — pad with a fallback card if data has < 4 items */}
          {(() => {
            const fallback = {
              name: 'Open Source',
              description: 'Contributing to dev tools and Kenyan tech community repos. Building in public.',
              icon: Github,
            };
            const slots = interests.length < 4
              ? [...interests, ...Array(4 - interests.length).fill(null).map((_, i) =>
                  i === 0 ? fallback : null
                )]
              : interests.slice(0, 4);

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/50">
                {slots.map((item, index) => {
                  if (!item) return null;
                  const Icon = (item as typeof fallback).icon ?? (interests[index] as typeof interests[0]).icon;
                  return (
                    <motion.div
                      key={index}
                      {...inView(index * 0.5)}
                      whileHover={{ y: -6 }}
                      className="bg-[#070908] p-8 group cursor-default transition-colors hover:bg-[#0b0f0b]"
                    >
                      <div className="w-11 h-11 bg-lime-400/8 border border-lime-400/15 rounded-sm flex items-center justify-center mb-6 group-hover:bg-lime-400/15 transition-colors">
                        <Icon className="w-5 h-5 text-lime-400" />
                      </div>
                      <h3 className="text-[16px] font-bold text-zinc-100 mb-2 tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-[13px] text-zinc-500 leading-relaxed">{item.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}
        </section>

        <Divider />

        {/* ══════════════════════════════════════
            CLOSING QUOTE
        ══════════════════════════════════════ */}
        <section className="py-24">
          <motion.div
            {...inView()}
            className="relative border border-zinc-800 bg-[#070908] p-10 md:p-16 overflow-hidden"
          >
            {/* decorative quote mark */}
            <span
              aria-hidden
              className="absolute top-6 right-8 text-[120px] leading-none font-black text-zinc-800/40 select-none pointer-events-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              "
            </span>

            <div className="relative max-w-2xl mx-auto text-center">
              <Quote className="w-7 h-7 text-lime-400/50 mx-auto mb-8" />

              <blockquote
                className="text-xl md:text-2xl font-bold text-zinc-100 leading-snug mb-6 tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "Building software is not just about writing code — it's about
                creating{' '}
                <em className="not-italic text-lime-400">
                  experiences that resonate with people.
                </em>
                "
              </blockquote>

              <p className="text-[14px] text-zinc-500 mb-10 leading-relaxed max-w-lg mx-auto">
                Whether through elegant code, thoughtful architecture, or
                mentoring others, I strive to make a positive impact in
                everything I build.
              </p>

              <motion.div whileHover={{ x: 4 }} className="inline-block">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-lime-400 hover:bg-lime-300 text-zinc-950 text-sm font-bold tracking-wide rounded-sm transition-colors"
                >
                  Let's Connect
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* bottom breathing room */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default AboutPage;