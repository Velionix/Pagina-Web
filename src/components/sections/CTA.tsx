import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../Reveal';
import Logo from '../Logo';

export default function CTA() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-400/20 bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center sm:p-16">
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_70%)]" />
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-glass-gold px-4 py-1.5 text-xs font-500 uppercase tracking-[0.2em] text-gold-300">
                Start a project
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-600 leading-[1.05] tracking-tightest text-white sm:text-5xl">
                Let&apos;s build the system that{' '}
                <span className="text-gradient-gold">runs your growth</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-[1.6] text-white/55">
                Book a discovery call. We&apos;ll map your workflow, identify what should be
                automated, and ship a working pipeline — usually within weeks.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="mailto:hello@velionix.ai"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-gold-200 to-gold-400 px-8 py-4 text-sm font-600 text-black gold-glow"
                >
                  <span className="relative z-10">Book a discovery call</span>
                  <ArrowUpRight size={16} className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-8 py-4 text-sm font-500 text-white/80 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
                >
                  Explore services
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center gap-3 text-xs text-white/35">
                <Logo showWordmark={false} size={18} />
                <span>Velionix — Intelligent automation, engineered.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
