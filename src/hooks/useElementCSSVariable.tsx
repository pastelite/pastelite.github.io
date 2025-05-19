import { useEffect, useRef } from "react";

export function useElementSizeCSSVars<T extends HTMLElement = HTMLElement>(
  prefix: string,
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateVars = () => {
      // const width = el.offsetWidth;
      // const height = el.offsetHeight;
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      document.documentElement.style.setProperty(`--${prefix}-width`, `${width}px`);
      document.documentElement.style.setProperty(`--${prefix}-height`, `${height}px`);
      // const rect = el.getBoundingClientRect();
      // el.style.setProperty(`--${prefix}-width`, `${rect.width}px`);
      // el.style.setProperty(`--${prefix}-height`, `${rect.height}px`);
    };

    updateVars();

    const resizeObserver = new ResizeObserver(updateVars);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [prefix]);

  return ref;
}
