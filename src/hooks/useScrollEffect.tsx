import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function useScrollThrottle(callback: () => void, runEvery: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Call initially
    callback();

    const handleScroll = () => {
      // only run when timeout is null
      if (timeoutRef.current === null) {
        callback();
        // add timeout so no more calculation
        timeoutRef.current = setTimeout(() => {
          console.log("running");
          // callback();
          timeoutRef.current = null;
        }, runEvery);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, runEvery]);
}