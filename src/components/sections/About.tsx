import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Workflow, Database, Code2, Plug } from 'lucide-react';
import { SectionHeading, staggerParent, staggerChild } from '../Reveal';

const pillars = [
  { icon: Brain, label: 'Artificial Intelligence' },
  { icon: Workflow, label: 'Automation Workflows' },
  { icon: Database, label: 'Data Extraction' },
  { icon: Code2, label: 'Custom Software' },
  { icon: Plug, label: 'Business Integrations' },
];

const paragraph =
  'We design intelligent automation systems that help businesses find opportunities, save time and scale.';

const words = paragraph.split(' ');

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  });

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(212,175,55,0.04),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="About Velionix"
          title={<>Building the future of <span className="text-gradient-gold">business automation</span></>}
          align="center"
        />

        {/* Scroll-reveal paragraph — each word lights up as you scroll */}
        <p
          ref={ref}
          className="mx-auto mt-12 max-w-3xl text-center font-display text-2xl font-500 leading-[1.5] tracking-tight sm:text-3xl md:text-4xl"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Pillars */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.label}
              variants={staggerChild}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-500 text-white/70 transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-400/5 hover:text-white"
            >
              <p.icon size={16} className="text-gold-300 transition-transform duration-300 group-hover:scale-110" />
              {p.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(255,255,255,0.15)', 'rgba(255,255,255,1)']
  );
  return (
    <motion.span className="relative mr-[0.25em] inline-block" style={{ opacity, color }}>
      {children}
    </motion.span>
  );
}
