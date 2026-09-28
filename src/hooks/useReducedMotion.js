import { useState, useEffect } from 'react';

/**
 * useReducedMotion
 *
 * Listens to the `prefers-reduced-motion` media query and returns a boolean
 * indicating whether the user has requested reduced motion.
 *
 * @returns {boolean} true if the user prefers reduced motion, false otherwise
 */
function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';

  const getInitialValue = () => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(query).matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    }

    // Fallback for older browsers (Safari < 14)
    mediaQueryList.addListener(handleChange);
    return () => mediaQueryList.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;
