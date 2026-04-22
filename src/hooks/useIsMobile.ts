import { useEffect, useState } from 'react';

/**
 * Responsive hook
 * Returns true when viewport width < breakpoint (default 640 px = "sm")
*/
export const useIsMobile = (breakpoint = 640): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}
