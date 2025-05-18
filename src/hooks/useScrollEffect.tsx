import { useLayoutEffect, useRef, useState } from "react";

export default function(callback: () => void, runEvery: number) {
  const [count, setCount] = useState(0);
  const timeout = useRef<number | null>(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      timeout.current = setTimeout(() => {
        callback();
        setCount(count + 1);
        timeout.current = null;
      }, runEvery);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }
  }, [count]);
}