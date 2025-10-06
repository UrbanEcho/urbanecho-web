import { useMemo } from "react";
import { useLocation } from "react-router-dom";
const blacklistPages = ["/forgot-password", "/new-password"];

export default function useShowNavBar() {
  const pathName = useLocation().pathname;
  const isBlacklisted = useMemo(() => {
    return blacklistPages.includes(pathName);
  }, [pathName]);
  return !isBlacklisted;
}
