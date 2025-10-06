import { createContext } from 'react';

export interface ScrollRestorationContextType {
  saveScrollPosition: (pathname?: string) => void;
  restoreScrollPosition: (pathname?: string) => void;
  clearScrollPosition: (pathname?: string) => void;
  clearAllScrollPositions: () => void;
  currentPath: string;
}

export const ScrollRestorationContext = createContext<ScrollRestorationContextType | null>(null);