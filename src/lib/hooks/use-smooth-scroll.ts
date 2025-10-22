import { useCallback } from 'react';
import { smoothScrollTo, smoothScrollToTop, smoothScrollToElement, smoothScrollBy } from '../utils/smooth-scroll';
import type { SmoothScrollOptions } from '../utils/smooth-scroll';

/**
 * Hook for smooth scrolling functionality
 */
export function useSmoothScroll() {
  const scrollTo = useCallback((x: number, y: number, options?: SmoothScrollOptions) => {
    return smoothScrollTo(x, y, options);
  }, []);

  const scrollToTop = useCallback((options?: SmoothScrollOptions) => {
    return smoothScrollToTop(options);
  }, []);

  const scrollToElement = useCallback((
    element: HTMLElement | string,
    options?: SmoothScrollOptions & { offset?: number }
  ) => {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;
      
    if (!targetElement) {
      console.warn('Element not found for smooth scroll');
      return Promise.resolve();
    }
    
    return smoothScrollToElement(targetElement, options);
  }, []);

  const scrollBy = useCallback((deltaX: number, deltaY: number, options?: SmoothScrollOptions) => {
    return smoothScrollBy(deltaX, deltaY, options);
  }, []);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
    scrollBy
  };
}