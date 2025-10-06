import { useContext } from 'react';
import { ScrollRestorationContext } from '../context/scroll-restoration-context';
import type { ScrollRestorationContextType } from '../context/scroll-restoration-context';

/**
 * Hook to access scroll restoration context
 * 
 * @returns Scroll restoration context methods
 * @throws Error if used outside of ScrollRestorationProvider
 */
export function useScrollRestorationContext(): ScrollRestorationContextType {
  const context = useContext(ScrollRestorationContext);
  
  if (!context) {
    throw new Error(
      'useScrollRestorationContext must be used within a ScrollRestorationProvider'
    );
  }
  
  return context;
}

/**
 * Hook to access scroll restoration context with optional fallback
 * 
 * @returns Scroll restoration context methods or null if not within provider
 */
export function useOptionalScrollRestorationContext(): ScrollRestorationContextType | null {
  return useContext(ScrollRestorationContext);
}