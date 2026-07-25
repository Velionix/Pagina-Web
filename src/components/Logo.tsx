import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export default function Logo({ className = '', showWordmark = true, size = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.path
          d="M6 6 L11 26 L16 14 L21 26 L26 6"
          stroke="url(#velionixGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        <motion.circle
          cx="16"
          cy="14"
          r="2"
          fill="#d4af37"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="velionixGold" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#efd98c" />
            <stop offset="0.5" stopColor="#d4af37" />
            <stop offset="1" stopColor="#a8821d" />
          </linearGradient>
        </defs>
      </motion.svg>
      {showWordmark && (
        <span className="font-display text-xl font-600 tracking-tightest text-white">
          Velionix
        </span>
      )}
    </div>
  );
}
