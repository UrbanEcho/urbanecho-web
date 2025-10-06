import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const whitelistPages = [
  "/login",
  "/forgot-password",
  "/new-password",
  "/schedule-demo",
  "/schedule-demo-success",
];

export default function useShowHeaderThemeToggleOnMobile() {
  const pathName = useLocation().pathname;
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  });

  // Listen for window resize events
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = useMemo(() => {
    return windowWidth <= 768;
  }, [windowWidth]);

  const show = React.useMemo(() => {
    if (typeof window === "undefined")
      return { theme: false, hamburger: true, isMobile };
    const show = whitelistPages.includes(pathName);
    return {
      theme: show,
      hamburger: !show,
      isMobile,
    };
  }, [pathName, isMobile]);
  
  return show;
}
