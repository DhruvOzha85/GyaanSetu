import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * useScrollReveal - A simple hook to trigger animations when elements enter the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} { ref, isInView }
 */
export const useScrollReveal = (options = { once: true, amount: 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  return { ref, isInView };
};

export default useScrollReveal;
