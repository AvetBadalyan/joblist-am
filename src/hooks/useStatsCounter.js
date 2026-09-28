import { useState, useEffect, useRef, useCallback } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Easing function: easeOutExpo
 * Provides a natural deceleration effect — fast start, slow end.
 *
 * @param {number} t - Progress value between 0 and 1
 * @returns {number} Eased progress value between 0 and 1
 */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * useStatsCounter
 *
 * Animates a number from 0 to a target value using requestAnimationFrame.
 * Triggers when the attached element enters the viewport (Intersection Observer).
 * Respects the user's prefers-reduced-motion preference by jumping directly
 * to the end value without animation.
 *
 * @param {object} options
 * @param {number} options.end              - Target value to count up to
 * @param {number} [options.duration=2000]  - Animation duration in milliseconds
 * @param {boolean} [options.startOnVisible=true] - Start animation when element enters viewport
 *
 * @returns {{ ref: React.RefObject, count: number, isAnimating: boolean }}
 */
function useStatsCounter({ end, duration = 2000, startOnVisible = true }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Track whether the animation has already run (triggerOnce behavior)
  const hasStarted = useRef(false);
  // Hold a reference to the active rAF handle so we can cancel on unmount
  const rafHandle = useRef(null);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    // Respect reduced-motion: skip straight to the end value
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    setIsAnimating(true);

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.round(easedProgress * end));

      if (progress < 1) {
        rafHandle.current = requestAnimationFrame(tick);
      } else {
        // Ensure we land exactly on the target value
        setCount(end);
        setIsAnimating(false);
      }
    };

    rafHandle.current = requestAnimationFrame(tick);
  }, [end, duration, prefersReducedMotion]);

  useEffect(() => {
    // If startOnVisible is false, start immediately
    if (!startOnVisible) {
      startAnimation();
      return;
    }

    // Guard: if IntersectionObserver is not available, start immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      startAnimation();
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            // Disconnect after first trigger (triggerOnce behavior)
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [startOnVisible, startAnimation]);

  // Cancel any in-flight rAF on unmount to avoid state updates on
  // an unmounted component
  useEffect(() => {
    return () => {
      if (rafHandle.current !== null) {
        cancelAnimationFrame(rafHandle.current);
      }
    };
  }, []);

  return { ref, count, isAnimating };
}

export default useStatsCounter;
