import type { ReactNode } from 'react';
import { useScrollRestoration } from '../lib/hooks/useScrollRestoration';
import { ScrollRestorationContext } from '../lib/context/scroll-restoration-context';

interface ScrollRestorationProviderProps {
  children: ReactNode;
  storageKey?: string;
  restoreOnMount?: boolean;
  saveOnUnmount?: boolean;
  debounceMs?: number;
  disabled?: boolean;
}

/**
 * Provider that manages scroll restoration state across the entire application
 * 
 * @param props Configuration props for scroll restoration behavior
 */
export function ScrollRestorationProvider({
  children,
  disabled = false,
  ...hookOptions
}: ScrollRestorationProviderProps) {
  const scrollRestoration = useScrollRestoration(
    disabled ? { restoreOnMount: false, saveOnUnmount: false } : hookOptions
  );

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <ScrollRestorationContext.Provider value={scrollRestoration}>
      {children}
    </ScrollRestorationContext.Provider>
  );
}

export default ScrollRestorationProvider;