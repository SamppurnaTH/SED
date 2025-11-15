import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  startAnimation: boolean;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000, startAnimation, suffix = '' }) => {
  const [count, setCount] = useState(0);
  // FIX: Initialize useRef with null and update the type to allow for null.
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startAnimation) {
      return;
    }

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressFraction = Math.min(progress / duration, 1);
      const currentCount = Math.floor(progressFraction * end);
      
      setCount(currentCount);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
         setCount(end); // Ensure it ends exactly on the target number
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [startAnimation, end, duration]);

  return (
    <p className="font-poppins font-bold text-4xl text-primary">
      {/* FIX: Explicitly provide a locale to toLocaleString to prevent potential environment-specific errors. */}
      {count.toLocaleString('en-US')}{suffix}
    </p>
  );
};

export default AnimatedCounter;
