import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollRestorationOptions {
  storageKey?: string;
  restoreOnMount?: boolean;
  saveOnUnmount?: boolean;
  debounceMs?: number;
}

/**
 * Custom hook for managing scroll position restoration across route changes
 * 
 * @param options Configuration options for scroll restoration behavior
 * @returns Object with manual control functions
 */
export function useScrollRestoration(options: UseScrollRestorationOptions = {}) {
  const {
    storageKey = 'scroll-positions',
    restoreOnMount = true,
    saveOnUnmount = true,
    debounceMs = 100
  } = options;

  const location = useLocation();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRestoringRef = useRef(false);

  // Get scroll positions from sessionStorage
  const getStoredPositions = useCallback((): Record<string, ScrollPosition> => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, [storageKey]);

  // Save scroll positions to sessionStorage
  const setStoredPositions = useCallback((positions: Record<string, ScrollPosition>) => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(positions));
    } catch {
      // Silently fail if sessionStorage is not available
    }
  }, [storageKey]);

  // Save current scroll position
  const saveScrollPosition = useCallback((pathname: string = location.pathname) => {
    if (isRestoringRef.current) return;

    const positions = getStoredPositions();
    positions[pathname] = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
    setStoredPositions(positions);
  }, [location.pathname, getStoredPositions, setStoredPositions]);

  // Restore scroll position for current route
  const restoreScrollPosition = useCallback((pathname: string = location.pathname) => {
    const positions = getStoredPositions();
    const position = positions[pathname];

    if (position) {
      isRestoringRef.current = true;
      window.requestAnimationFrame(() => {
        window.scrollTo(position.x, position.y);
        // Allow saving again after a short delay
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 100);
      });
    } else {
      // Default to top of page if no saved position
      window.scrollTo(0, 0);
    }
  }, [location.pathname, getStoredPositions]);

  // Debounced save function
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveScrollPosition();
    }, debounceMs);
  }, [saveScrollPosition, debounceMs]);

  // Clear saved position for a specific route
  const clearScrollPosition = useCallback((pathname: string = location.pathname) => {
    const positions = getStoredPositions();
    delete positions[pathname];
    setStoredPositions(positions);
  }, [location.pathname, getStoredPositions, setStoredPositions]);

  // Clear all saved positions
  const clearAllScrollPositions = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // Silently fail
    }
  }, [storageKey]);

  // Effect for handling route changes
  useEffect(() => {
    if (restoreOnMount) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        restoreScrollPosition();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, restoreOnMount, restoreScrollPosition]);

  // Effect for saving scroll position on scroll
  useEffect(() => {
    if (saveOnUnmount) {
      window.addEventListener('scroll', debouncedSave, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', debouncedSave);
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveScrollPosition(); // Save final position
      };
    }
  }, [location.pathname, saveOnUnmount, debouncedSave, saveScrollPosition]);

  // Save position before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveScrollPosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    clearScrollPosition,
    clearAllScrollPositions,
    currentPath: location.pathname
  };
}