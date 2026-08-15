import { useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — wraps any content with magnetic hover physics.
 * The element subtly follows the cursor when hovered, snapping back on leave.
 */
const MagneticButton = ({ children, className = '', onClick, strength = 0.35, as: Tag = 'button', href, target, rel, to }) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 380, damping: 28, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 380, damping: 28, mass: 0.6 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    // Disable magnetic physics on mobile touch screens for smooth interaction
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  }, [rawX, rawY, strength]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const props = {
    ref,
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    ...(onClick && { onClick }),
    ...(href && { href, target, rel }),
    ...(to && { to }),
  };

  const MotionTag = useMemo(() => {
    if (typeof Tag === 'function' || typeof Tag === 'object') {
      return motion.create(Tag);
    }
    return Tag === 'a' ? motion.a : motion.button;
  }, [Tag]);

  return <MotionTag {...props}>{children}</MotionTag>;
};

export default MagneticButton;
