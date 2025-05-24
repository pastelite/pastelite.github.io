import TextSVG from "./TextSVG";
import "./BetterName.style.css";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "motion";
import TextCorouselBackgroundNew from "./TextCorouselBackgroundNew";
import useThrottleScroll from "../hooks/useThrottleScroll";
import type { BoundingBox } from "opentype.js";

export default function BetterName() {
  let { scrollY } = useScroll();
  // let backgroundHeight = useMotionValue(window.innerHeight); // Initialize with full height
  let [backgroundHeight, setBackgroundHeight] = useState(window.innerHeight); // Initialize with full height]
  let hasCollapsed = useRef(false); // Use a ref to track if it has collapsed
  let [isCollapsed, setIsCollapsed] = useState(false);
  let [isAnimation, setIsAnimation] = useState(false);
  let timeoutRef = useRef<number | null>(null);
  let [pRatio, setPRatio] = useState(0);
  let [drawingAnimation, setDrawingAnimation] = useState(false);
  // let [animateHeight, setAnimateHeight] = useState(false)

  useMotionValueEvent(scrollY, "change", (scroll) => {
    setBackgroundHeight(window.innerHeight - scroll);
    if (scroll > window.innerHeight / 2 && !isCollapsed) {
      setIsCollapsed(true);
      setIsAnimation(true);
      timeoutRef.current = setTimeout(() => {
        setIsAnimation(false);
        timeoutRef.current = null;
      }, 300);
    } else if (scroll <= window.innerHeight / 2 && isCollapsed) {
      setIsCollapsed(false);
      setIsAnimation(true);
      timeoutRef.current = setTimeout(() => {
        setIsAnimation(false);
        timeoutRef.current = null;
      }, 300);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsAnimation(false);
        timeoutRef.current = null;
      }, 300);
    }
  });

  // delay animation by 0.5 sec only if everything is setted up
  useEffect(() => {
    let animationFrame = requestAnimationFrame(() => {
      setTimeout(() => {
        setDrawingAnimation(true);
      }, 500);
    });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  let svgRef = useRef<SVGSVGElement | null>(null);

  // function setPRatioCallback(list: BoundingBox[], width: number) {
  //   if (list.length == 0) return
  //   let pWidth = list[0].x2 - list[0].x1
  //   setPRatio(pWidth/width)
  // }

  return (
    <>
      <motion.div
        className={`name-background ${isCollapsed ? "collapsed" : ""}`}
        style={{
          color: "white",
        }}
        animate={{
          height: isCollapsed ? 70 : backgroundHeight,
          top: isCollapsed ? 15 : 0,
          left: isCollapsed ? 15 : 0,
          width: isCollapsed ? 70 : "100%",
          borderRadius: isCollapsed ? 70 * 0.25 : 0,
          overflow: "hidden",
          cursor: isCollapsed ? "pointer" : "default",
        }}
        transition={isAnimation
          ? { duration: 0.2, ease: "easeOut" }
          : { duration: 0 }}
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
                ? `translateX(-${pRatio / 2 * 100}%)`
                : "translateX(0)",
            }}
            text="pastelite"
            fontSize={160}
            drawingTimeSec={1}
            pathDataCallback={(pathData) => {
              if (pathData.length > 0 && svgRef.current) {
                const pBoundingBox = pathData[0].getBoundingBox();
                const [minLeft, maxRight] = pathData.reduce(
                  ([minLeft, maxRight], path) => {
                    const rect = path.getBoundingBox();
                    return [
                      Math.min(minLeft, rect.x1),
                      Math.max(maxRight, rect.x2),
                    ];
                  },
                  [Infinity, -Infinity],
                );
                const svgWidth = maxRight - minLeft;
                const pWidth = pBoundingBox.x2 - pBoundingBox.x1;
                setPRatio(pWidth / svgWidth);
              }
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
