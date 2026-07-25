import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Building2, UserCheck, Cpu, Clock, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '../Reveal';

const stats: {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  span?: boolean;
}[] = [
  { icon: Building2, value: 188, suffix: '+', label: 'Businesses discovered', sub: 'found autonomously' },
  { icon: UserCheck, value: 164, suffix: '+', label: 'Qualified opportunities', sub: 'enriched & verified' },
  { icon: Cpu, value: 100, suffix: '%', label: 'Automated workflow', sub: 'zero manual steps' },
  { icon: Clock, value: 0, suffix: '', label: 'Hours → Minutes', sub: 'process optimization', span: true, isTime: true } as never,
];

export default function Results() {
  return (
    <section id="results" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,175,55,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Results"
          title={<>Measured in <span className="text-gradient-gold">outcomes</span></>}
          description="Not vanity metrics — these are the live outputs of the systems we shipped, running unattended."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { icon: LucideIcon; value: number; suffix: string; label: string; sub: string; span?: boolean; isTime?: boolean };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(stat.value);
  }, [inView, mv, stat.value]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  const Icon = stat.icon;
  const isTime = (stat as { isTime?: boolean }).isTime;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center transition-all duration-500 hover:border-gold-400/30 ${
        stat.span ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/20 bg-gold-400/5 text-gold-300">
        <Icon size={26} />
      </div>

      {isTime ? (
        <div className="flex items-center justify-center gap-3 font-display text-5xl font-700 tracking-tightest text-gradient-gold sm:text-6xl">
          <span>Hours</span>
          <ArrowRight size={32} className="text-gold-400/70" />
          <span>Minutes</span>
        </div>
      ) : (
        <div className="font-display text-6xl font-700 tracking-tightest text-gradient-gold sm:text-7xl">
          {display}
          {stat.suffix}
        </div>
      )}

      <div className="mt-4 font-display text-lg font-600 text-white">{stat.label}</div>
      <div className="mt-1 text-sm text-white/45">{stat.sub}</div>
    </motion.div>
  );
}
