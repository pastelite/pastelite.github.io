import { Children, useLayoutEffect, useRef, useState } from "react";
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing } from "../utils/number";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";

export function AboutPage() {
  const pageIndex = 0;
  const pageScrollLocation = usePositionStore((state) =>
    state.position[pageIndex]
  );

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-second-background)",
        height: "100vh",
      }}
    >
      <TextHeader
        text="About"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
      />
      <div>
        Hello! I'm pastelite. Just a normal coder
      </div>
      <DivWithAnimation
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        delaySecond={.2}
        className="relative md:absolute md:right-4 w-full md:w-[448px]"
      >
        Test
      </DivWithAnimation>
    </PageContainer>
  );
}