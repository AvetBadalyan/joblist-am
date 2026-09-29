import { useCallback, useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/**
 * useScrollAnimation
 *
 * Triggers a scroll-based animation when an element enters the viewport,
 * using the Intersection Observer API. Respects the user's
 * `prefers-reduced-motion` preference by surfacing content immediately
 * without any animation.
 *
 * @param {object}  [options]
 * @param {number}  [options.threshold=0.2]    - Fraction of the element that must be
 *                                               visible before triggering (0–1).
 * @param {boolean} [options.triggerOnce=true]  - Disconnect the observer after the
 *                                               first trigger so the animation only
 *                                               plays once.
 * @param {string}  [options.rootMargin='0px']  - Margin around the root used to
 *                                               grow/shrink the effective viewport.
 *
 * @returns {{ ref: React.RefObject, isVisible: boolean, hasAnimated: boolean }}
 */
function useScrollAnimation({
  threshold = 0.2,
  triggerOnce = true,
  rootMargin = "0px",
} = {}) {
  const prefersReducedMotion = useReducedMotion();

  // When the user prefers reduced motion, or IntersectionObserver is unavailable,
  // treat everything as already visible so content renders immediately.
  const noObserver =
    prefersReducedMotion ||
    typeof window === "undefined" ||
    !window.IntersectionObserver;

  const [isVisible, setIsVisible] = useState(noObserver);
  const [hasAnimated, setHasAnimated] = useState(noObserver);

  const ref = useRef(null);

  // Keep a stable reference to the options so the effect only re-runs when
  // the values actually change, not on every render.
  const thresholdRef = useRef(threshold);
  const rootMarginRef = useRef(rootMargin);
  const triggerOnceRef = useRef(triggerOnce);

  useEffect(() => {
    thresholdRef.current = threshold;
    rootMarginRef.current = rootMargin;
    triggerOnceRef.current = triggerOnce;
  });

  const handleIntersection = useCallback((entries, observer) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      setIsVisible(true);
      setHasAnimated(true);

      if (triggerOnceRef.current) {
        observer.disconnect();
      }
    } else if (!triggerOnceRef.current) {
      // Allow re-animation on scroll out when triggerOnce is false
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Already in "show everything" mode — no observer needed.
    if (noObserver) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: thresholdRef.current,
      rootMargin: rootMarginRef.current,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [noObserver, handleIntersection]);

  return { ref, isVisible, hasAnimated };
}

export default useScrollAnimation;
