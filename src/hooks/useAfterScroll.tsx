import { useEffect, useRef } from "react";

export default function useAfterScroll(callback: () => void, delay: number = 100) {
  const timeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        callback();
      }, delay);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [callback, delay]);
}