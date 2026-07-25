import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
