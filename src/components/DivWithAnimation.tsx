import { useEffect, useRef, useState } from "react";
import "./DivWithAnimation.style.css";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import RoundedRectangleSVG from "./RoundedRectangleSVG";

interface DivWithAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  hiding?: boolean;
  scrollYToStartAnimation?: number;
  scrollYToEndAnimation?: number;
  delaySecond?: number;
  speed?: number;
  borderColor?: string;
  boxBackground?: string;
}

export default function DivWithAnimation(
  {
    children,
    className,
    hiding = false,
    scrollYToStartAnimation = -1,
    scrollYToEndAnimation = -1,
    delaySecond = 0,
    speed = .3,
    style,
    borderColor = "white",
    boxBackground = "black",
    ...props
  }: DivWithAnimationProps,
) {
  const [inRange, setInRange] = useState(false);
  const { scrollY } = useScroll();
  const timeoutRef = useRef<number | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollYToEndAnimation === -1) return;

    if (latest > scrollYToStartAnimation && latest < scrollYToEndAnimation) {
      if (inRange) return;

      if (timeoutRef.current) return;

      timeoutRef.current = setTimeout(() => {
        setInRange(true);
        timeoutRef.current = null;
      }, delaySecond * 1000);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setInRange(false);
    }
  });

  // measure
  // if (elementRef.current) {
  //   if (height !== elementRef.current.offsetHeight) {
  //     setHeight(elementRef.current.offsetHeight);
  //   }
  //   if (width !== elementRef.current.offsetWidth) {
  //     setWidth(elementRef.current.offsetWidth);
  //   }
  // }

  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setHeight(elementRef.current.offsetHeight);
        setWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [inRange, children]);

  return (
    <div
      className={`div-with-animation ${inRange ? "" : "hiding"} ${className}`}
      style={{
        transition: `all ${speed}s ease-out`,
        // background: boxBackground,
      }}
      ref={elementRef}
      {...props}
    >
      <div>
        {children}
      </div>
      <RoundedRectangleSVG
        className="absolute w-full h-full top-0 left-0 transition-[stroke-dashoffset] duration-200 z-10"
        width={width}
        height={height}
        borderDrawed={inRange}
        borderRadius={16}
      />
    </div>
  );
}
