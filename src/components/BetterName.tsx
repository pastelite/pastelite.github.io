import TextSVG from "./TextSVG";
import "./BetterName.style.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// Removed framer-motion imports: motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, animate
import TextCorouselBackgroundNew from "./TextCorouselBackgroundNew";
import useThrottleScroll from "../hooks/useThrottleScroll"; // This import is kept as per "don't change other irrelevent code"
import type { BoundingBox } from "opentype.js";
import usePositionStore from "../store";

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

  // Effect for handling scroll events
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scroll = window.scrollY;
  //     setBackgroundHeight(Math.max(0, window.innerHeight - scroll)); // Ensure height is not negative

  //     let shouldTriggerAnimation = false;
  //     if (scroll > window.innerHeight / 2) {
  //       if (!isCollapsed) {
  //         setIsCollapsed(true);
  //         shouldTriggerAnimation = true;
  //       }
  //     } else { // scroll <= window.innerHeight / 2
  //       if (isCollapsed) {
  //         setIsCollapsed(false);
  //         shouldTriggerAnimation = true;
  //       }
  //     }

  //     if (shouldTriggerAnimation) {
  //       setIsAnimation(true);
  //       if (timeoutRef.current) {
  //         clearTimeout(timeoutRef.current);
  //       }
  //       timeoutRef.current = window.setTimeout(() => {
  //         setIsAnimation(false);
  //         timeoutRef.current = null;
  //       }, 300); // This duration should match your CSS transition duration
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // Call once on mount to set initial state based on current scroll

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, [isCollapsed]); // Re-run effect if isCollapsed changes to use its latest value in the handler

  useEffect(() => {
    const handleScroll = () => {
      let scroll = window.scrollY;
      let willCollapse = scroll > window.innerHeight / 2;
      if (heightImmunityTimeout.current == null) {
        setBackgroundHeight(window.innerHeight - scroll);
      }

      // if (scroll > window.innerHeight / 2 && !isCollapsed) {
      //   setIsCollapsed(true);
      // } else if (isCollapsed) {
      //   setIsCollapsed(false);
      // }
      // setIsCollapsed(scroll > (window.innerHeight / 2));

      console.log(
        "prev:",
        isCollapsed,
        "new:",
        scroll > window.innerHeight / 2,
      );

      if (
        isCollapsed !== willCollapse && disableScrollRelatedAnimation === false
      ) {
        setIsCollapsed(willCollapse);
        setIsAnimation(true);
        setTimeout(() => {
          setIsAnimation(false);
        }, 300);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setIsAnimation(false);
        timeoutRef.current = null;
      }, 300);

      setIsCollapsed(willCollapse);

      // if (scroll > window.innerHeight / 2 && !isCollapsed) {
      //   setIsCollapsed(true);
      //   setIsAnimation(true);
      //   timeoutRef.current = setTimeout(() => {
      //     setIsAnimation(false);
      //     timeoutRef.current = null;
      //   }, 300);
      // } else if (scroll <= window.innerHeight / 2 && !isCollapsed) {
      //   setIsCollapsed(false);
      //   console.log("start animation")
      //   setIsAnimation(true);
      //   timeoutRef.current = setTimeout(() => {
      //     setIsAnimation(false);
      //     timeoutRef.current = null;
      //   }, 300);
      // } else if (timeoutRef.current) {
      //   clearTimeout(timeoutRef.current);
      //   timeoutRef.current = setTimeout(() => {
      //     setIsAnimation(false);
      //     timeoutRef.current = null;
      //   }, 300);
      // }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isCollapsed, disableScrollRelatedAnimation]);

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

  // function setPRatioCallback(list: BoundingBox[], width: number) {
  //   if (list.length == 0) return
  //   let pWidth = list[0].x2 - list[0].x1
  //   setPRatio(pWidth/width)
  // }

  const dynamicStyles = {
    height: isCollapsed ? 70 : backgroundHeight,
    top: isCollapsed ? 15 : 0,
    left: isCollapsed ? 15 : 0,
    width: isCollapsed ? 70 : "100%",
    borderRadius: isCollapsed ? 16 : 0,
    overflow: "hidden", // This was part of animate, kept as direct style
    cursor: isCollapsed ? "pointer" : "default",

    // CSS transition properties
    transitionProperty: "height, top, left, width, border-radius",
    transitionDuration: isAnimation ? "0.3s" : "0s",
    transitionTimingFunction: isAnimation
      ? "cubic-bezier(0, 0, 0.58, 1)"
      : "ease", // 'circOut' easing
    color: "white", // Base style from original motion.div
  };

  return (
    <>
      <div
        className={`name-background ${isCollapsed ? "collapsed" : ""}`}
        style={dynamicStyles}
        onClick={isCollapsed
          ? () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            // setDisableScrollRelatedAnimation(true);
            // setTimeout(() => {
            //   setDisableScrollRelatedAnimation(false);
            // }, 400);
            // heightImmunity
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
              // This transform will be instant unless TextSVG or its CSS has a transition for transform
              transform: isCollapsed
                ? `translateX(-${(pRatio / 2) * 100}%)` // Ensure pRatio/2 is calculated correctly
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
