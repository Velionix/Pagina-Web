import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Search,
  Webhook,
  Workflow,
  Sparkles,
  Send,
  TrendingUp,
  ArrowDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '../Reveal';

const stages: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Globe, label: 'External Data', sub: 'Open data · APIs · maps' },
  { icon: Search, label: 'Scraper Engine', sub: 'Python · Playwright' },
  { icon: Webhook, label: 'Webhook Layer', sub: 'Event relay' },
  { icon: Workflow, label: 'n8n Automation', sub: 'Orchestration' },
  { icon: Sparkles, label: 'AI Intelligence', sub: 'Gemini reasoning' },
  { icon: Send, label: 'Communication Layer', sub: 'Gmail · outreach' },
  { icon: TrendingUp, label: 'Business Results', sub: 'Qualified pipeline' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="architecture" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Architecture"
          title={<>The <span className="text-gradient-gold">system diagram</span></>}
          description="One autonomous loop. Raw data enters at the top, intelligence compounds through each stage, and qualified business results leave at the bottom."
        />

        <div ref={ref} className="relative mt-16">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            {inView && (
              <motion.div
                className="absolute left-0 top-0 w-full bg-gradient-to-b from-gold-300 via-gold-400 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 2.6, ease }}
              />
            )}
          </div>

          {/* Multiple traveling pulses (particle flow) */}
          {inView &&
            [0, 1.1, 2.2].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-200 shadow-[0_0_14px_rgba(212,175,55,0.9)]"
                initial={{ top: '0%', opacity: 0 }}
                animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 2.6 + delay,
                }}
              />
            ))}

          <div className="relative space-y-4">
            {stages.map((s, i) => (
              <FlowNode key={s.label} step={s} index={i} active={inView} last={i === stages.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowNode({
  step,
  index,
  active,
  last,
}: {
  step: { icon: LucideIcon; label: string; sub: string };
  index: number;
  active: boolean;
  last: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.24, ease }}
    >
      <div className="group relative z-10 flex w-full max-w-md items-center gap-4 rounded-2xl border border-white/8 bg-glass px-6 py-5 backdrop-blur-xl transition-all duration-500 hover:border-gold-400/40 hover:gold-glow">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300">
          <Icon size={22} />
        </div>
        <div className="flex-1">
          <div className="font-display text-base font-600 text-white">{step.label}</div>
          <div className="text-xs text-white/45">{step.sub}</div>
        </div>
        <span className="font-display text-xs font-600 text-white/25">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Arrow between nodes */}
      {!last && (
        <motion.div
          className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-gold-400/70"
          initial={{ opacity: 0, y: -6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.24 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      )}
    </motion.div>
  );
}
