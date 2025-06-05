import TextSVG from "../Atoms/TextSVG";
import "./BetterName.style.scss";
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

export default function BetterName() {
  let backgroundHeight = useMotionValue(window.innerHeight);
  let [isCollapsed, setIsCollapsed] = useState(false);
  let [pRatio, setPRatio] = useState(0);
  let [drawingAnimation, setDrawingAnimation] = useState(false);

  let breakpoint = useBreakpoint([768]);
  let { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (scroll) => {
    // if (disableBackgroundHeightSetting.current != null) {
    let newBackgroundHeight = Math.max(window.innerHeight - scroll, window.innerHeight / 2);
    backgroundHeight.set(newBackgroundHeight);
    // }

    setIsCollapsed(scroll > window.innerHeight / 2);
  });

  // when resize screen
  useLayoutEffect(() => {
    const handleResize = () => {
      let newBackgroundHeight = Math.max(
        window.innerHeight - window.scrollY,
        window.innerHeight / 2,
      );

      backgroundHeight.set(newBackgroundHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed, backgroundHeight]); // Depend on isCollapsed and motion values

  // delay animation by 0.5 sec after everything is setted up
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
  let bottom = useTransform(backgroundHeight, (bgheight) => {
    if (breakpoint == 1) return "auto";
    else {
      return isCollapsed ? 15 + (bgheight - 70) : window.innerHeight - bgheight;
    }
  });

  const dynamicStyles = {
    // TODO: fix small screen
    top: (breakpoint == 1) ? 0 : "auto",
    left: 0,
    width: "100%",
    overflow: "hidden",
    cursor: isCollapsed ? "pointer" : "default",
    color: "white",
  };

  return (
    <>
      <motion.div
        className={`name-background ${isCollapsed ? "collapsed" : ""}`}
        animate={dynamicStyles}
        style={{
          height: backgroundHeight,
          bottom: bottom,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={isCollapsed
          ? () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            // disableBackgroundHeightSetting.current = setTimeout(() => {
            //   backgroundHeight.set(window.innerHeight);
            // })
            // animate(backgroundHeight, 85, { duration: 0.2, ease: "easeOut" });
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
              // calculate p ratio
              if (!(pathData.length > 0 && svgRef.current)) return;

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
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
