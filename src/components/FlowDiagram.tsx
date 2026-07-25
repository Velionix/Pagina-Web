import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export interface FlowStep {
  icon: LucideIcon;
  label: string;
  sub?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  /** direction of the connector line */
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Animated node-and-connector flow diagram with a traveling data pulse.
 * Used by case studies and the architecture section.
 */
export default function FlowDiagram({
  steps,
  orientation = 'vertical',
  className = '',
}: FlowDiagramProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const vertical = orientation === 'vertical';

  return (
    <div
      ref={ref}
      className={`relative ${vertical ? 'flex flex-col items-center' : 'flex items-stretch gap-0'} ${className}`}
    >
      {/* Connector track */}
      <div
        className={`absolute ${
          vertical
            ? 'left-1/2 top-0 h-full w-px -translate-x-1/2'
            : 'left-0 top-1/2 h-px w-full -translate-y-1/2'
        }`}
      >
        <div
          className={`h-full w-full bg-gradient-to-${
            vertical ? 'b' : 'r'
          } from-transparent via-white/10 to-transparent`}
        />
        {inView && (
          <motion.div
            className={`absolute bg-gradient-to-${
              vertical ? 'b' : 'r'
            } from-gold-300 via-gold-400 to-transparent`}
            style={vertical ? { left: 0, top: 0, width: '100%' } : { top: 0, left: 0, height: '100%' }}
            initial={vertical ? { height: 0 } : { width: 0 }}
            animate={vertical ? { height: '100%' } : { width: '100%' }}
            transition={{ duration: 1.8, ease }}
          />
        )}
      </div>

      {/* Traveling pulse */}
      {inView && (
        <motion.div
          className="absolute z-20 h-2.5 w-2.5 rounded-full bg-gold-200 shadow-[0_0_14px_rgba(212,175,55,0.9)]"
          style={vertical ? { left: '50%', x: '-50%' } : { top: '50%', y: '-50%' }}
          initial={vertical ? { top: '0%' } : { left: '0%' }}
          animate={vertical ? { top: ['0%', '100%'] } : { left: ['0%', '100%'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: 1.8 }}
        />
      )}

      {/* Nodes */}
      <div
        className={`relative ${
          vertical ? 'flex w-full flex-col items-center gap-4' : 'flex w-full items-center justify-between gap-2'
        }`}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            className={`relative z-10 ${vertical ? 'w-full max-w-sm' : 'flex-1'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease }}
          >
            <div className="group flex items-center gap-3 rounded-xl border border-white/8 bg-glass px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:border-gold-400/40 hover:gold-glow">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold-400/20 bg-gold-400/5 text-gold-300">
                <s.icon size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-display text-sm font-600 text-white">{s.label}</div>
                {s.sub && <div className="truncate text-[11px] text-white/40">{s.sub}</div>}
              </div>
              <span className="font-display text-[10px] font-600 text-white/20">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
