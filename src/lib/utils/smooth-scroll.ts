/**
 * Smooth scroll utility functions
 */

export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
}

/**
 * Easing functions for smooth scrolling
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

/**
 * Smooth scroll to a specific position
 */
export function smoothScrollTo(
  targetX: number,
  targetY: number,
  options: SmoothScrollOptions = {}
): Promise<void> {
  const { duration = 500, easing = easingFunctions.easeOutQuad } = options;

  return new Promise((resolve) => {
    const startX = window.pageXOffset;
    const startY = window.pageYOffset;
    const distanceX = targetX - startX;
    const distanceY = targetY - startY;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(
        startX + distanceX * easedProgress,
        startY + distanceY * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}

/**
 * Smooth scroll to top of page
 */
export function smoothScrollToTop(options?: SmoothScrollOptions): Promise<void> {
  return smoothScrollTo(0, 0, options);
}

/**
 * Smooth scroll to an element
 */
export function smoothScrollToElement(
  element: HTMLElement,
  options: SmoothScrollOptions & { offset?: number } = {}
): Promise<void> {
  const { offset = 0, ...scrollOptions } = options;
  const rect = element.getBoundingClientRect();
  const targetY = window.pageYOffset + rect.top - offset;
  
  return smoothScrollTo(0, targetY, scrollOptions);
}

/**
 * Smooth scroll by a specific amount
 */
export function smoothScrollBy(
  deltaX: number,
  deltaY: number,
  options?: SmoothScrollOptions
): Promise<void> {
  const currentX = window.pageXOffset;
  const currentY = window.pageYOffset;
  
  return smoothScrollTo(currentX + deltaX, currentY + deltaY, options);
}