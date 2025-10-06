import React from "react";
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
  const show = React.useMemo(() => {
    if (typeof window === "undefined") return { theme: false, hamburger: true };
    const show = whitelistPages.includes(pathName);
    return {
      theme: show,
      hamburger: !show,
    };
  }, [pathName]);
  return show;
}
