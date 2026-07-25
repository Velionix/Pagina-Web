import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className = '', once = true }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
  align = 'center',
}: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-glass-gold px-3 py-1 text-xs font-500 uppercase tracking-[0.2em] text-gold-300">
        <span className="h-1 w-1 rounded-full bg-gold-400" />
        {eyebrow}
      </span>
      <h2 className="font-display text-4xl font-600 leading-[1.05] tracking-tightest text-white sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-[1.6] text-white/55">
          {description}
        </p>
      )}
    </Reveal>
  );
}
