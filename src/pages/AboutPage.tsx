import { useLayoutEffect, useRef, useState } from "react";
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing } from "../utils/number";

export function AboutPage() {
  const [pageScrollLocation, setPageScrollLocation] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  let breakpoint = useBreakpoint([768]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (pageRef.current) {
        let rect = pageRef.current.getBoundingClientRect();
        setPageScrollLocation(
          rect.top + window.scrollY - window.innerHeight / 2,
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-second-background)",
        height: "100vh",
        paddingLeft: choosing(breakpoint,[20, 120]),
        paddingRight: 20,
        paddingTop: choosing(breakpoint,[100, 50]),
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: 100,
        }}
        ref={pageRef}
      >
        <TextHeader
          text="About"
          scrollYToStartAnimation={pageScrollLocation - 1}
          scrollYToEndAnimation={pageScrollLocation + window.innerHeight}
          drawingTimeSec={0.3}
        />
        <div>
          Hello! I'm pastelite. Just a normal coder
        </div>
        <DivWithAnimation
          scrollYToStartAnimation={pageScrollLocation - 1}
          scrollYToEndAnimation={pageScrollLocation + window.innerHeight}
          delaySecond={.2}
          className="relative md:absolute"
        >
          Test
        </DivWithAnimation>
      </div>
    </div>
  );
}
