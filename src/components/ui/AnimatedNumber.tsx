import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';

interface AnimatedNumberProps {
  targetValue: number;
  duration?: number; // Optional duration for the animation in seconds
  className?: string; // Optional className for styling
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  targetValue, 
  duration = 1.5, 
  className 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { 
    once: true, // Animate only once when it comes into view
    margin: "-50px 0px -50px 0px" // Trigger animation slightly before/after full visibility
  });

  const count = useMotionValue(0);
  // Transform the count to a rounded integer for display
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, targetValue, {
        duration: duration,
        ease: 'easeOut', // You can experiment with different easing functions
      });
      // Optional: Cleanup function to stop animation if component unmounts during animation
      return () => controls.stop();
    }
  }, [isInView, targetValue, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};

export default AnimatedNumber;