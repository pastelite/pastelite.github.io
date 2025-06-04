import TextSVG from "../Atoms/TextSVG";
import "../Layout/BetterName.style.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// Removed framer-motion imports: motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, animate
import TextCorouselBackgroundNew from "../Organism/TextCorouselBackgroundNew";
import useBreakpoint from "../../hooks/useBreakpoint";
import { choosing } from "../../utils/number";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { animate } from "motion";

export default function BetterName() {
  // State for scroll position is implicitly managed by window.scrollY directly in the event handler
  let backgroundHeightMv = useMotionValue(window.innerHeight);
  let backgroundWidthMv = useMotionValue(window.innerWidth);
  let [isCollapsed, setIsCollapsed] = useState(false);
  let timeoutRef = useRef<NodeJS.Timeout>(null);
  let [pRatio, setPRatio] = useState(0);
  let [drawingAnimation, setDrawingAnimation] = useState(false);

  let heightImmunityTimeout = useRef<number | null>(null);

  let breakpoint = useBreakpoint([768]);
  let { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (scroll) => {
    let willCollapse = scroll > window.innerHeight / 2;
    let newBackgroundHeight = willCollapse ? 70 : (window.innerHeight - scroll);
    let newBackgroundWidth = willCollapse ? 70 : window.innerWidth;

    // setBackgroundHeight(window.innerHeight - scroll);

    // if thing will change
    if (
      isCollapsed !== willCollapse
    ) {
      // setIsCollapsed(willCollapse);
      requestAnimationFrame(() => {
        setIsCollapsed(willCollapse);
      });
      animate(backgroundHeightMv, newBackgroundHeight, {
        duration: 0.2,
      });
      animate(backgroundWidthMv, newBackgroundWidth, {
        duration: 0.2,
      });
      // setIsAnimation(true);
      timeoutRef.current = setTimeout(() => {
        // setIsAnimation(false);
        timeoutRef.current = null;
      }, 300);
    }

    // continue animation if there is animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
      }, 300);
      animate(backgroundHeightMv, newBackgroundHeight, {
        duration: 0.2,
      });
      animate(backgroundWidthMv, newBackgroundWidth, {
        duration: 0.2,
      });
    } else {
      backgroundHeightMv.set(newBackgroundHeight);
      backgroundWidthMv.set(newBackgroundWidth);
    }
  });

  // when resize screen
  useLayoutEffect(() => {
    const handleResize = () => {
      let newBackgroundHeight = isCollapsed
        ? 70
        : (window.innerHeight - window.scrollY);
      let newBackgroundWidth = isCollapsed ? 70 : window.innerWidth;

      backgroundHeightMv.set(newBackgroundHeight);
      backgroundWidthMv.set(newBackgroundWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed, backgroundHeightMv, backgroundWidthMv]); // Depend on isCollapsed and motion values

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
  let bottom = useTransform(backgroundHeightMv, (bgheight) => {
    if (breakpoint == 1) return "auto";
    else {
      return isCollapsed ? 15 + (bgheight - 70) : window.innerHeight - bgheight;
    }
  });

  const dynamicStyles = {
    // TODO: fix bottom
    // height: isCollapsed ? 70 : backgroundHeight,
    // ...choosing(breakpoint, [
    //   isCollapsed
    //     ? { bottom: 15 }
    //     : { bottom: window.innerHeight - backgroundHeight },
    //   {
    //     top: isCollapsed ? 15 : 0,
    //   },
    // ]),
    top: (breakpoint == 1) ? (isCollapsed ? 15 : 0) : "auto",
    left: isCollapsed ? 15 : 0,
    // width: isCollapsed ? 70 : "100%",
    borderRadius: isCollapsed ? 16 : 0,
    overflow: "hidden",
    cursor: isCollapsed ? "pointer" : "default",

    // CSS transition properties
    // transitionProperty: "height, top, bottom, left, width, border-radius",
    // transitionDuration: isAnimation ? "0.3s" : "0s",
    // transitionTimingFunction: "ease-out",
    // transitionTimingFunction: "ease-out",
    color: "white",
  };

  return (
    <>
      <motion.div
        className={`name-background ${isCollapsed ? "collapsed" : ""}`}
        animate={dynamicStyles}
        style={{
          height: backgroundHeightMv,
          width: backgroundWidthMv,
          bottom: bottom,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={isCollapsed
          ? () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
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
      </motion.div>
    </>
  );
}
