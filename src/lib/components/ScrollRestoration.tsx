import type { ReactNode } from 'react';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

interface ScrollRestorationProps {
  children: ReactNode;
  storageKey?: string;
  restoreOnMount?: boolean;
  saveOnUnmount?: boolean;
  debounceMs?: number;
  disabled?: boolean;
}

/**
 * Component that automatically handles scroll position restoration for its children
 * 
 * @param props Configuration props for scroll restoration behavior
 */
export function ScrollRestoration({
  children,
  disabled = false,
  ...hookOptions
}: ScrollRestorationProps) {
  // Initialize the hook to enable scroll restoration (side effects only)
  useScrollRestoration(disabled ? { restoreOnMount: false, saveOnUnmount: false } : hookOptions);

  return <>{children}</>;
}

export default ScrollRestoration;