import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Database, Cpu, TrendingUp } from 'lucide-react';
import ParticleField from '../ParticleField';
import MagneticButton from '../MagneticButton';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,55,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(212,175,55,0.06),transparent_60%)]" />

      {/* Moving aurora light */}
      <motion.div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold-400/[0.07] blur-[140px]"
        animate={{ x: [-60, 60, -60], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particle network */}
      <div className="absolute inset-0 mask-fade-b opacity-70">
        <ParticleField />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)',
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb className="left-[12%] top-[28%]" color="bg-gold-300/80" size={8} delay={0} dur={7} range={22} />
      <FloatingOrb className="right-[16%] top-[36%]" color="bg-white/70" size={6} delay={1} dur={9} range={18} />
      <FloatingOrb className="left-[22%] bottom-[26%]" color="bg-gold-200/70" size={6} delay={2} dur={8} range={16} />
      <FloatingOrb className="right-[24%] bottom-[30%]" color="bg-gold-400/60" size={8} delay={0.5} dur={10} range={20} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-28 text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full bg-glass px-4 py-1.5 text-xs font-500 tracking-wide text-white/70">
              <Sparkles size={13} className="text-gold-300" />
              AI Automation Systems
              <span className="mx-1 h-3 w-px bg-white/15" />
              <span className="text-gold-300">Engineering growth</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 max-w-4xl font-display text-5xl font-600 leading-[1.02] tracking-tightest text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            Intelligent Automation
            <br />
            Systems That{' '}
            <span className="relative whitespace-nowrap text-gradient-gold">
              Grow Businesses
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease, delay: 1.4 }}
                style={{ width: '100%', transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-base leading-[1.6] text-white/55 sm:text-lg">
            Velionix builds AI-powered systems that discover opportunities, automate workflows
            and help companies scale.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton href="#services" variant="primary">
              Explore Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="#discovery" variant="ghost">
              Start Your Automation Project
            </MagneticButton>
          </motion.div>

          {/* Intelligent automation engine visual */}
          <motion.div variants={item} className="mt-16 w-full max-w-3xl">
            <AutomationEngine />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function FloatingOrb({
  className,
  color,
  size,
  delay,
  dur,
  range,
}: {
  className: string;
  color: string;
  size: number;
  delay: number;
  dur: number;
  range: number;
}) {
  return (
    <motion.div
      className={`absolute ${className} ${color} rounded-full blur-[1px]`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -range, 0], opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/**
 * Minimal visual of an intelligent automation engine:
 * Data enters → AI processes → Business results appear.
 */
function AutomationEngine() {
  const stages = [
    { icon: Database, label: 'Data In', sub: 'Sources & signals' },
    { icon: Cpu, label: 'AI Process', sub: 'Reasoning & routing' },
    { icon: TrendingUp, label: 'Results', sub: 'Qualified output' },
  ];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-glass px-6 py-5 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

        <div className="flex items-center justify-between gap-3">
          {stages.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-3">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-400/5 text-gold-300">
                  <s.icon size={18} />
                </div>
                <div className="text-left">
                  <div className="font-display text-xs font-600 text-white">{s.label}</div>
                  <div className="text-[10px] text-white/40">{s.sub}</div>
                </div>
              </motion.div>

              {i < stages.length - 1 && (
                <div className="relative mx-1 h-px flex-1 bg-white/10">
                  <motion.div
                    className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-gold-200 shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-white/30">
        Intelligent automation engine
      </div>
    </div>
  );
}
