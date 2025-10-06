import { useMemo } from "react";
import { useLocation } from "react-router-dom";
const blacklistPages = [
  "/login",
  "/forgot-password",
  "/new-password",
  "/schedule-demo",
  "/schedule-demo-success",
];

export default function useShowFooter() {
  const pathName = useLocation().pathname;
  const isBlacklisted = useMemo(() => {
    return blacklistPages.includes(pathName);
  }, [pathName]);
  return !isBlacklisted;
}
