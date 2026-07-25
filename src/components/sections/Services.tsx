import { motion } from 'framer-motion';
import { Bot, Target, Boxes, ArrowUpRight } from 'lucide-react';
import { SectionHeading, staggerParent, staggerChild } from '../Reveal';

const services = [
  {
    icon: Bot,
    title: 'AI Automation Systems',
    desc: 'We design intelligent workflows that eliminate repetitive tasks and improve operational efficiency.',
    points: ['Always-on execution', 'Self-healing pipelines', 'Zero manual handoffs'],
  },
  {
    icon: Target,
    title: 'Lead Generation Engines',
    desc: 'We build systems that discover, analyze and qualify business opportunities automatically.',
    points: ['Geospatial discovery', 'Real-time enrichment', 'Auto-qualified leads'],
  },
  {
    icon: Boxes,
    title: 'Custom AI Solutions',
    desc: 'We create personalized automation systems adapted to each company\u2019s needs.',
    points: ['LLM-powered reasoning', 'Visual orchestration', 'End-to-end visibility'],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Services"
          title={<>What we <span className="text-gradient-gold">engineer</span></>}
          description="Three core systems, each built to replace a team of operators with a resilient, observable, always-on pipeline."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-7 transition-all duration-500 hover:border-gold-400/30 hover:bg-white/[0.04]"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-all duration-500 group-hover:border-gold-400/40 group-hover:bg-gold-400/10 group-hover:gold-glow">
                  <s.icon size={22} />
                </div>

                <div className="mb-1 text-xs font-500 tracking-[0.2em] text-white/30">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-600 tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.6] text-white/50">{s.desc}</p>

                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-white/65">
                      <span className="h-1 w-1 rounded-full bg-gold-400" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-1.5 text-sm font-500 text-gold-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
