import TextSVG from "./TextSVG";
import "./BetterName.style.css";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { animate } from "motion";
import TextCorouselBackgroundNew from "./TextCorouselBackgroundNew";
import useThrottleScroll from "../hooks/useThrottleScroll";

export default function BetterName() {
  let { scrollY } = useScroll();
  // let backgroundHeight = useMotionValue(window.innerHeight); // Initialize with full height
  let [backgroundHeight, setBackgroundHeight] = useState(window.innerHeight); // Initialize with full height]
  let hasCollapsed = useRef(false); // Use a ref to track if it has collapsed
  let [isCollapsed, setIsCollapsed] = useState(false);
  let [isAnimation, setIsAnimation] = useState(false);
  let timeoutRef = useRef<number | null>(null);
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

  return (
    <>
      <motion.div
        className={`name-background`}
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
      </motion.div>
      <TextSVG text="pastelite" style={{
        zIndex: 20
      }} />
      <TextSVG text="pastelite" />
    </>
  );
}
