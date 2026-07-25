import { motion } from 'framer-motion';
import { Search, Layers, Rocket } from 'lucide-react';
import { SectionHeading, staggerParent, staggerChild } from '../Reveal';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We analyze your business and identify automation opportunities.',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Architecture',
    desc: 'We design the intelligent system architecture.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Implementation',
    desc: 'We build, integrate and optimize your solution.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How we work"
          title={<>From idea to <span className="text-gradient-gold">intelligent system</span></>}
          description="A focused three-step engagement. No bloated proposals — just a clear path from discovery to a running system."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-8 transition-all duration-500 hover:border-gold-400/30"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-400/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-1.25rem] top-12 hidden h-px w-10 bg-gradient-to-r from-gold-400/40 to-transparent md:block" />
              )}

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-all duration-500 group-hover:border-gold-400/40 group-hover:bg-gold-400/10 group-hover:gold-glow">
                  <s.icon size={22} />
                </div>
                <span className="font-display text-5xl font-700 leading-none text-white/5 transition-colors duration-500 group-hover:text-gold-400/15">
                  {s.num}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-600 tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.6] text-white/50">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
