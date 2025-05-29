import { Children, useLayoutEffect, useRef, useState } from "react";
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing } from "../utils/number";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import Puzzle from "../components/Puzzle";

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
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="left-side w-full md:max-w-[600px]">
          <TextHeader
            text="About"
            scrollYToStartAnimation={pageScrollLocation -
              (window.innerHeight / 2)}
            scrollYToEndAnimation={pageScrollLocation +
              (window.innerHeight / 2)}
            drawingTimeSec={0.3}
            className="mb-4"
          />
          <div className="text-3xl text-white my-4">
            Hello! I'm <span className="font-bold">pastelite</span>,<br />{" "}
            Just a normal guy who like to code!
          </div>
          <p className="mb-2">
            I've been coding since I was in highschool and I have been coding
            ever since.
          </p>
          <p>
            I did it because it's fun I guess? Coding is like solving the puzzle
            where the answer is the result you desired, kinda like a sandbox
            game where you can built whatever you want.
          </p>
          <p>
            By the way, the puzzle is playable.
          </p>
        </div>
        <div className="right-side grow flex justify-center items-center">
          <Puzzle className="!h-[200px] !w-[200px] lg:!h-[300px] lg:!w-[300px] my-4"/>
        </div>
      </div>
      <div className="text-5xl mt-8">
        Q&A
      </div>
      <DivWithAnimation
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        delaySecond={.2}
        className="relative"
      >
        My Language knowledge (Relative, I have zero professional so Imma rank
        this lowly):
        <ul>Javascript/Typescript</ul>
        <Bar width={.75} />
        <ul>Python</ul>
        <Bar width={.75} />
        <ul>C#</ul>
        <Bar width={.5} />
        <ul>Java</ul>
        <Bar width={.5} />
        <ul>Rust</ul>
        <Bar width={.25} />
        <ul>C</ul>
        <Bar width={.25} />
      </DivWithAnimation>
    </PageContainer>
  );
}

function Bar({ width }: { width: number }) {
  return (
    <div className="bar w-full h-2 bg-black/50 rounded-full relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
        style={{
          width: `${width * 100}%`,
        }}
      >
      </div>
    </div>
  );
}
