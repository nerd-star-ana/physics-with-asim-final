"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { useMemo, useState } from "react";

export function useParallax() {
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  const transform = useMemo(
    () => ({ rotateX, rotateY, isHovered, setIsHovered }),
    [isHovered, rotateX, rotateY],
  );

  return transform;
}
