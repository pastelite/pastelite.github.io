import { Children, useLayoutEffect, useRef, useState } from "react";
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing } from "../utils/number";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import Puzzle from "../components/Puzzle";
import ReverseWaveDiv from "../components/WaveSVG";
import ToolIcon, { ToolIconList } from "../components/ToolIcon";
import IconSquare, { IconSquareGenerator } from "../components/IconSquare";

export function AboutPage() {
  const pageIndex = 0;
  const pageLocation = usePositionStore((state) => state.position);
  const pageScrollLocation = pageLocation[pageIndex];
  const nextPageScrollLocation = pageLocation[pageIndex + 1];
  const breakpoint = useBreakpoint([768]);

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        // backgroundColor: "var(--color-second-background)",
        minHeight: "100vh",
      }}
      noPaddingTop={breakpoint == 1}
    >
      <div className="flex flex-col md:flex-row items-center justify-between min-h-[75vh]">
        <div className="left-side w-full md:max-w-[600px] flex flex-col gap-2">
          <TextHeader
            text="About"
            scrollYToStartAnimation={pageScrollLocation -
              (window.innerHeight / 2)}
            scrollYToEndAnimation={pageScrollLocation +
              (window.innerHeight / 2)}
            drawingTimeSec={0.3}
            className="mb-4"
          />
          <div className="text-3xl text-white mb-4">
            Hello! I'm{" "}
            <span
              className="font-bold"
              style={{ color: "var(--accent-color-1)" }}
            >
              pastelite
            </span>,<br /> Just a normal guy who like to code!
          </div>
          <p>
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
          <Puzzle className="!h-[200px] !w-[200px] lg:!h-[300px] lg:!w-[300px] my-4" />
        </div>
      </div>
      <div className="text-5xl mt-8">
        How would I rate myself?
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 relative gap-4 mt-8">
        <DivWithAnimation
          scrollYToStartAnimation={pageScrollLocation -
            (window.innerHeight / 2)}
          scrollYToEndAnimation={nextPageScrollLocation -
            (window.innerHeight * (1 / 4))}
          delaySecond={.2}
          className="relative w-full"
        >
          Language:
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
        <div
          className="p-4 rounded-3xl"
          style={{
            background: "rgb(from var(--secondary-color) r g b / 0.25)",
          }}
        >
          Framework:
          <div className="flex gap-2 mt-4 ">
            <IconSquareGenerator
              toolList={[
                "typescript",
                "javascript",
                "python",
                "vite",
                "express",
                "nodejs",
                "pytorch",
                "tailwind",
                "c",
                "c#",
                "rust",
                "java"
              ]}
              showWave
            />

            {
              /* <div
              className="relative w-min h-min hover:scale-120 rounded-lg"
              style={{
                height: 64,
                width: 64,
              }}
            >
              <ReverseWaveDiv className="absolute top-0 left-0 bottom-0 right-0 brightness-75 overflow-hidden pointer-events-none z-10 rounded-md">
                {ToolIconList({
                  list: ["react"],
                  size: 64,
                  noScaleHover: true,
                })}
              </ReverseWaveDiv>
              <div className="absolute top-0 left-0 bottom-0 right-0">
                {ToolIconList({
                  list: ["react"],
                  size: 64,
                  noScaleHover: true,
                })}
              </div> */
            }
            {
              /* <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none blur-lg overflow-hidden">
                {ToolIconList({
                  list: ["react"],
                  size: 64,
                  noScaleHover: true,
                })}
              </div> */
            }
            {
              /* <ReverseWaveDiv
                className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none blur-lg overflow-hidden"
                level={0.5}
              >
                {ToolIconList({
                  list: ["react"],
                  size: 64,
                  noScaleHover: true,
                })}
              </ReverseWaveDiv> */
            }
            {/* </div> */}
          </div>
        </div>
        {
          /* <DivWithAnimation
          scrollYToStartAnimation={pageScrollLocation -
            (window.innerHeight / 2)}
          scrollYToEndAnimation={nextPageScrollLocation -
            (window.innerHeight * (1 / 4))}
          delaySecond={.2}
          className="relative w-full"
        >

        </DivWithAnimation> */
        }
      </div>
      <p className="my-4">
        But ultimately, everything is learnable with time and programming
        knowledge is transferable.
      </p>
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
