import { useMotionValueEvent, useScroll } from "motion/react";
import usePositionStore from "../store";
import { useState } from "react";

export default function useScrollShown(
  pageIndex: number,
  criticalAreaScreenRatio = 0.25,
  startElement: React.RefObject<HTMLElement | null> | null = null,
) {
  const { scrollY } = useScroll();
  const pageLocation = usePositionStore((state) => state.position);
  const currentScrollLocation = pageLocation[pageIndex];
  const nextScrollLocation = (pageLocation.length > pageIndex + 1)
    ? pageLocation[pageIndex + 1]
    // basically the height of the page
    : Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    );
  const [isShown, setIsShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (scroll) => {
    let criticalArea = criticalAreaScreenRatio * window.innerHeight;
    let startOffset = 0;
    if (startElement != null && startElement.current != null) {
      let elementPageLocation =
        startElement.current.getBoundingClientRect().top + window.scrollY;

      startOffset += elementPageLocation - currentScrollLocation;
    }

    setIsShown(
      (scroll >
        currentScrollLocation + startOffset -
          window.innerHeight * (1 - criticalAreaScreenRatio)) &&
        (scroll < nextScrollLocation - criticalArea),
    );
  });

  return isShown;
}
