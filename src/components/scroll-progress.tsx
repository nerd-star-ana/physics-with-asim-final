"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 18,
    mass: 0.2,
  });

  return (
    <motion.div
      className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,#1d4ed8,#38bdf8)]"
      style={{ scaleX }}
    />
  );
}
