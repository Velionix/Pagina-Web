import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export default function Logo({ className = '', showWordmark = true, size = 40 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.img
        src="/favicon.png"
        alt="Velionix"
        width={size}
        height={size}
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          objectFit: 'contain',
          display: 'block'
        }}
      />
      {showWordmark && (
        <motion.span
          className="font-display text-xl font-600 tracking-tightest text-white"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Velionix
        </motion.span>
      )}
    </div>
  );
}
