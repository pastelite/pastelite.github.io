import { useEffect, useRef, useState } from "react";
import TextSVG from "../Atoms/TextSVG";
import TextCorouselBackgroundNew from "../Organism/TextCorouselBackgroundNew";
import "./EasierName.style.scss";
import usePositionStore from "@/store";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

export default function EasierName() {
  let svgRef = useRef<SVGSVGElement>(null);
  let textboxRef = useRef<HTMLDivElement>(null);
  let [textBoxTop, setTextBoxTop] = useState(0);
  let [drawingAnimation, setDrawingAnimation] = useState(false);
  let { titleButtonShow, setTitleButtonShow } = usePositionStore();
  let [innerHeight, setInnerHeight] = useState(window.innerHeight);

  // let [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === textboxRef.current) {
          let element = entry.target as HTMLDivElement;
          let rect = element.getBoundingClientRect();
          setTextBoxTop(rect.top);
        }
      }

      setInnerHeight(window.innerHeight);
    });
    if (textboxRef.current) {
      observer.observe(textboxRef.current);
    }
    return () => {
      if (textboxRef.current) {
        observer.unobserve(textboxRef.current);
      }
    };
  }, []);

  let { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (scrollY) => {
    if (scrollY > window.innerHeight - textBoxTop) {
      if (titleButtonShow === false) setTitleButtonShow(true);
    } else {
      if (titleButtonShow === true) setTitleButtonShow(false);
    }
  });

  let scale = useTransform(scrollY, [0, innerHeight], [1, 0.75]);
  let borderRadius = useTransform(scrollY, [0, innerHeight], [0, 24]);

  // delay animation by 0.1 sec after everything is setted up
  useEffect(() => {
    let animationFrameId = requestAnimationFrame(() => { // Renamed to avoid conflict
      setTimeout(() => {
        setDrawingAnimation(true);
      }, 1000);
    });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="easier-name">
        <TextCorouselBackgroundNew />
        <motion.div
          className={`title-box`}
          ref={textboxRef}
          style={{
            scale,
            borderRadius,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <TextSVG
            text="pastelite"
            fontSize={160}
            drawingTimeSec={1}
            ref={svgRef}
            drawedText={drawingAnimation}
          />
        </motion.div>
      </div>
      <div
        className={`back-to-title-box ${titleButtonShow ? "collapsed" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <TextSVG text="p" fontSize={160} drawingTimeSec={1} />
      </div>
    </>
  );
}
