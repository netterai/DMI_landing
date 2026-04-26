"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  className = "",
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xRange = useTransform(mouseX, [-120, 120], [-10, 10]);
  const yRange = useTransform(mouseY, [-60, 60], [-5, 5]);

  const x = useSpring(xRange, { stiffness: 150, damping: 18, mass: 0.6 });
  const y = useSpring(yRange, { stiffness: 150, damping: 18, mass: 0.6 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
