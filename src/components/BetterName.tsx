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
  let [drawingAnimation, setDrawingAnimation] = useState(false)
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

  useEffect(()=>{
    let timeout = setTimeout(()=>{
      setDrawingAnimation(true)
    },1000)

    return () => {
      if (timeout) clearTimeout(timeout);
    }
  }, [])

  let svgRef = useRef<SVGSVGElement | null>(null)

  function setPRatioCallback(list: BoundingBox[], width: number) {
    if (list.length == 0) return
    let pWidth = list[0].x2 - list[0].x1
    setPRatio(pWidth/width)
  }

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
        }}
        transition={isAnimation
          ? { duration: 0.2, ease: "easeOut" }
          : { duration: 0 }}
      >
        <TextCorouselBackgroundNew />
        <div className={`title-box ${isCollapsed ? "only-show-first" : ""}`}>
          <TextSVG ref={svgRef} fill={drawingAnimation ? "#fff" : "#fff0"} drawStroke={drawingAnimation} style={{
            transform: isCollapsed ? `translateX(-${pRatio/2 * 100}%)` : "translateX(0)"
          }} text="pastelite" fontSize={160} boudingBoxCallback={setPRatioCallback} />
        </div>
      </motion.div>
    </>
  );
}
