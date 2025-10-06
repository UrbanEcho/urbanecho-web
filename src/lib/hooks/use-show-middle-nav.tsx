import  { useMemo } from "react";
import { useLocation } from "react-router-dom";
const blacklistPages = [
  "/login",
  "/schedule-demo",
  "/forgot-password",
  "/new-password",
  "/schedule-demo-success"
];

export default function useShowMiddleNav() {
  const path = useLocation().pathname;
  const isBlacklisted = useMemo(() => {
    return blacklistPages.includes(path);
  }, [path]);

  return !isBlacklisted;
}
