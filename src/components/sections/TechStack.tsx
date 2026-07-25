import { motion } from 'framer-motion';
import { SectionHeading, staggerParent, staggerChild } from '../Reveal';

const tech = [
  { name: 'Python', glyph: 'Py', color: 'from-blue-400/20 to-blue-500/5', ring: 'group-hover:border-blue-400/40' },
  { name: 'FastAPI', glyph: '⚡', color: 'from-emerald-400/20 to-emerald-500/5', ring: 'group-hover:border-emerald-400/40' },
  { name: 'Docker', glyph: '🐳', color: 'from-sky-400/20 to-sky-500/5', ring: 'group-hover:border-sky-400/40' },
  { name: 'GitHub', glyph: '⌥', color: 'from-white/15 to-white/5', ring: 'group-hover:border-white/40' },
  { name: 'n8n', glyph: 'n8', color: 'from-rose-400/20 to-rose-500/5', ring: 'group-hover:border-rose-400/40' },
  { name: 'Gemini AI', glyph: '✦', color: 'from-amber-400/20 to-amber-500/5', ring: 'group-hover:border-amber-400/40' },
  { name: 'Supabase', glyph: '_sb', color: 'from-emerald-400/20 to-teal-500/5', ring: 'group-hover:border-emerald-400/40' },
  { name: 'PostgreSQL', glyph: 'PG', color: 'from-indigo-400/20 to-indigo-500/5', ring: 'group-hover:border-indigo-400/40' },
  { name: 'Playwright', glyph: '🎭', color: 'from-zinc-400/20 to-zinc-500/5', ring: 'group-hover:border-zinc-300/40' },
  { name: 'APIs', glyph: '{}', color: 'from-fuchsia-400/20 to-fuchsia-500/5', ring: 'group-hover:border-fuchsia-400/40' },
];

const floatDelays = [0, 0.6, 1.2, 0.3, 0.9, 1.5, 0.2, 1.1, 0.5, 1.3];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Technology Ecosystem"
          title={<>The <span className="text-gradient-gold">stack</span> we build on</>}
          description="A focused, battle-tested toolchain. Each piece chosen for reliability, observability, and the ability to run unattended for months."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {tech.map((t, i) => (
            <motion.div
              key={t.name}
              variants={staggerChild}
              className="group relative"
            >
              <motion.div
                className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b ${t.color} p-6 transition-all duration-500 hover:scale-[1.04] ${t.ring}`}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: floatDelays[i] ?? 0,
                }}
              >
                <div className="font-display text-3xl font-700 text-white/90 transition-transform duration-500 group-hover:scale-110">
                  {t.glyph}
                </div>
                <div className="text-sm font-500 text-white/70">{t.name}</div>
                <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
