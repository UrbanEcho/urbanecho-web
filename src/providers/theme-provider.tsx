import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import AppTheme, {
  createColorGetter,
  getColorCategory,
  getAllSemanticColors,
  LightTheme,
  DarkTheme,
  type ThemeMode,
  type AllSemanticColorPaths,
} from "../lib/theme";
import { GlobalStyles } from "@/lib/global-styles";

type ThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  getColor: (colorPath: AllSemanticColorPaths) => string;
  getColorCategory: (
    category:
      | "content"
      | "background"
      | "border"
      | "surface"
      | "overlay"
      | "logo"
  ) => Record<string, string>;
  colors: Record<string, string>;
  themeObject: typeof LightTheme | typeof DarkTheme;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "__ub_theme";

// Simplified theme initialization
function initializeTheme(): ThemeMode {
  // Server-side: default to light
  if (typeof window === "undefined") return "light";
  
  try {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Fall through to system preference
  }
  
  // Fall back to system preference
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = React.useState<ThemeMode>(initializeTheme);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // Apply theme to DOM and handle cross-tab sync
  useEffect(() => {
    applyTheme(theme);
    
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [theme]);

  const value = useMemo(() => {
    const getColor = createColorGetter(theme);
    const colors = getAllSemanticColors(theme);
    const themeObject = theme === "light" ? LightTheme : DarkTheme;

    return {
      theme,
      toggleTheme,
      setTheme,
      getColor,
      getColorCategory: (category: Parameters<typeof getColorCategory>[0]) =>
        getColorCategory(category, theme),
      colors,
      themeObject,
    };
  }, [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ScThemeProvider theme={AppTheme}>
        <GlobalStyles />
        {children}
      </ScThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColors() {
  const { getColor, colors, getColorCategory } = useTheme();
  return { getColor, colors, getColorCategory };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useColor(colorPath: AllSemanticColorPaths) {
  const { getColor } = useTheme();
  return getColor(colorPath);
}