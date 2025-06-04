import usePositionStore from "@/store";
import { useLayoutEffect, useRef } from "react";

interface ScrollPositionTrackerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  page: number;
}

export default function ScrollPositionTracker(
  { children, page, ...props }: ScrollPositionTrackerProps,
) {
  const setPosition = usePositionStore((state) => state.setPosition);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition(page, rect.top + window.scrollY);
      }
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
          updatePosition();
        }
      }
    });

    if (ref.current) {
      updatePosition();
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.current, setPosition, page]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
