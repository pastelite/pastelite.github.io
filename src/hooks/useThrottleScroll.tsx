import { useEffect } from "react";

/**
 * useThrottleScroll
 * Calls the given callback on scroll, throttled with requestAnimationFrame.
 * 
 * @param callback - Function that receives current scrollY
 */
export default function useThrottleScroll(callback: (scrollY: number) => void, dependencies: any[]) {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          callback(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fire once on mount
    callback(window.scrollY);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, ...dependencies]);
}