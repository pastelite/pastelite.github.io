import { useEffect, useRef, useState } from "react";

export default function useShownWhenOnScreen<T extends HTMLElement>(
  threshold: number = 0,
  offset: number = -100,
): [React.RefObject<T | null>, boolean]  {
  const itemRef = useRef<T | null>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === itemRef.current) {
          if (entry.isIntersecting) {
            setIsShown(true);
          } else {
            setIsShown(false);
          }
        }
      }
    }, {
      root: null,
      rootMargin: `${offset}px 0px`,
      threshold: threshold,
    });

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return [itemRef, isShown];
}
