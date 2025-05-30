import TextSVG from "./TextSVG";
import "./BetterName.style.css";
import { useEffect, useRef, useState } from "react";
// Removed framer-motion imports: motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, animate
import TextCorouselBackgroundNew from "./TextCorouselBackgroundNew";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing } from "../utils/number";
import { useMotionValueEvent, useScroll } from "motion/react";

export default function BetterName() {
  // State for scroll position is implicitly managed by window.scrollY directly in the event handler
  let [backgroundHeight, setBackgroundHeight] = useState(window.innerHeight); // Initialize with full height
  let [isCollapsed, setIsCollapsed] = useState(false);
  let [isAnimation, setIsAnimation] = useState(false); // Controls CSS transition duration
  let timeoutRef = useRef<number | null>(null);
  let [pRatio, setPRatio] = useState(0);
  let [drawingAnimation, setDrawingAnimation] = useState(false);

  // let disableScrollRelatedAnimation = usePositionStore((state) => state.disableScrollRelatedAnimation);
  let [disableScrollRelatedAnimation, setDisableScrollRelatedAnimation] =
    useState(false);

  let heightImmunityTimeout = useRef<number | null>(null);

  let breakpoint = useBreakpoint([768]);
  let { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (scroll) => {
    // const handleScroll = () => {
      // let scroll = window.scrollY;
      let willCollapse = scroll > window.innerHeight / 2;
      if (heightImmunityTimeout.current == null) {
        setBackgroundHeight(window.innerHeight - scroll);
      }

      // if thing will change
      if (
        isCollapsed !== willCollapse
      ) {
        setIsCollapsed(willCollapse);
        setIsAnimation(true);
        setTimeout(() => {
          setIsAnimation(false);
        }, 300);
      }

      // continue animation if there is animation
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setIsAnimation(false);
          timeoutRef.current = null;
        }, 300);
      }
    // };

    // window.addEventListener("scroll", handleScroll);
    // handleScroll();
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    //   if (timeoutRef.current) {
    //     clearTimeout(timeoutRef.current);
    //   }
    // };
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let scroll = window.scrollY;
  //     let willCollapse = scroll > window.innerHeight / 2;
  //     if (heightImmunityTimeout.current == null) {
  //       setBackgroundHeight(window.innerHeight - scroll);
  //     }

  //     // if thing will change
  //     if (
  //       isCollapsed !== willCollapse
  //     ) {
  //       setIsCollapsed(willCollapse);
  //       setIsAnimation(true);
  //       setTimeout(() => {
  //         setIsAnimation(false);
  //       }, 300);
  //     }

  //     // continue animation if there is animation
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //       timeoutRef.current = window.setTimeout(() => {
  //         setIsAnimation(false);
  //         timeoutRef.current = null;
  //       }, 300);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll();
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [isCollapsed]);

  // delay animation by 0.5 sec only if everything is setted up
  useEffect(() => {
    let animationFrameId = requestAnimationFrame(() => { // Renamed to avoid conflict
      setTimeout(() => {
        setDrawingAnimation(true);
      }, 500);
    });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  let svgRef = useRef<SVGSVGElement | null>(null);

  const dynamicStyles = {
    height: isCollapsed ? 70 : backgroundHeight,
    ...choosing(breakpoint, [
      isCollapsed
        ? { bottom: 15 }
        : { bottom: window.innerHeight - backgroundHeight },
      {
        top: isCollapsed ? 15 : 0,
      },
    ]),
    left: isCollapsed ? 15 : 0,
    width: isCollapsed ? 70 : "100%",
    borderRadius: isCollapsed ? 16 : 0,
    overflow: "hidden",
    cursor: isCollapsed ? "pointer" : "default",

    // CSS transition properties
    transitionProperty: "height, top, bottom, left, width, border-radius",
    transitionDuration: isAnimation ? "0.3s" : "0s",
    transitionTimingFunction: "ease-out",
    // transitionTimingFunction: "ease-out",
    color: "white",
  };

  return (
    <>
      <div
        className={`name-background ${isCollapsed ? "collapsed" : ""}`}
        style={dynamicStyles}
        onClick={isCollapsed
          ? () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setBackgroundHeight(window.innerHeight);
            heightImmunityTimeout.current = window.setTimeout(() => {
              heightImmunityTimeout.current = null;
            }, 500);
          }
          : undefined}
      >
        <TextCorouselBackgroundNew />
        <div className={`title-box ${isCollapsed ? "only-show-first" : ""}`}>
          <TextSVG
            ref={svgRef}
            drawedText={drawingAnimation}
            style={{
              transform: isCollapsed
                ? `translateX(-${(pRatio / 2) * 100}%)`
                : "translateX(0)",
            }}
            text="pastelite"
            fontSize={160}
            drawingTimeSec={1}
            pathDataCallback={(pathData) => {
              if (pathData.length > 0 && svgRef.current) {
                const pBoundingBox = pathData[0].getBoundingBox();
                const [minLeft, maxRight] = pathData.reduce(
                  ([currentMinLeft, currentMaxRight], path) => {
                    const rect = path.getBoundingBox();
                    return [
                      Math.min(currentMinLeft, rect.x1),
                      Math.max(currentMaxRight, rect.x2),
                    ];
                  },
                  [Infinity, -Infinity],
                );
                const svgWidth = maxRight - minLeft;
                if (svgWidth > 0) { // Avoid division by zero
                  const pWidth = pBoundingBox.x2 - pBoundingBox.x1;
                  setPRatio(pWidth / svgWidth);
                } else {
                  setPRatio(0);
                }
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
