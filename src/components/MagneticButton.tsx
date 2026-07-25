import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  strength?: number;
}

/**
 * Button that subtly follows the cursor — a premium magnetic hover effect.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    variant === 'primary'
      ? 'bg-gradient-to-b from-gold-200 to-gold-400 text-black gold-glow'
      : 'border border-white/12 bg-white/[0.02] text-white/80 backdrop-blur-md hover:border-white/25 hover:text-white';

  const cls = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-600 transition-colors ${base} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );

  const motionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 18, mass: 0.5 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={cls}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cls}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
