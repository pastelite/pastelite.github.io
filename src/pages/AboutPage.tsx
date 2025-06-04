import {
  Children,
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import useBreakpoint from "../hooks/useBreakpoint";
import { choosing, mappingNumber } from "../utils/number";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import Puzzle from "../components/Puzzle";
import ReverseWaveDiv from "../components/WaveSVG";
import ToolIcon, { ToolIconList } from "../components/ToolIcon";
import IconSquare, { IconSquareGenerator } from "../components/IconSquare";
import SVGBorder from "../components/SVGBorder";
import "./AboutPage.style.scss";
import useScrollShown from "../hooks/useScrollShown";
import TextSVG from "../components/TextSVG";
import { darken, mix } from "color2k";
import theme from "../theme";

export function AboutPage() {
  const pageIndex = 0;
  const pageLocation = usePositionStore((state) => state.position);
  const pageScrollLocation = pageLocation[pageIndex];
  const nextPageScrollLocation = pageLocation[pageIndex + 1];
  const rendered = useScrollShown(0);
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
          {
            /* <TextHeader
            text="About"
            scrollYToStartAnimation={pageScrollLocation -
              (window.innerHeight / 2)}
            scrollYToEndAnimation={pageScrollLocation +
              (window.innerHeight / 2)}
            drawingTimeSec={0.3}
            className="mb-4"
          /> */
          }
          <div className={`text-header mb-4`}>
            <TextSVG
              drawedText={rendered}
              text={"About"}
              fontSize={100}
              drawingTimeSec={0.3}
            />
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 relative gap-4 mt-8 max-w-[1024px] m-auto">
        <div
          className={"about-container p-4 rounded-3xl relative" +
            (rendered ? " show" : "")}
        >
          <SVGBorder
            className="drawing-border"
            borderRadius={24}
            drawBorder={false}
          />
          <div className="text-xl text-center">How would I rate my skill?</div>
          <div className="text-center">Higher = Better</div>
          <div className="text-lg mt-4" style={{ lineHeight: 0.8 }}>
            Programming Languages <span className="text-sm">(+CSS)</span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap logo-container-color-mix">
            <AboutPageIconSquare
              toolList={["typescript", "javascript"]}
              level={0.9}
            />
            <AboutPageIconSquare
              toolList={["python"]}
              level={0.9}
            />
            <AboutPageIconSquare
              toolList={["c#", "java"]}
              level={0.6}
            />
            <AboutPageIconSquare
              toolList={["css"]}
              level={0.5}
            />
            <AboutPageIconSquare
              toolList={["rust", "c"]}
              level={0.4}
            />
          </div>
          <div className="text-lg mt-4" style={{ lineHeight: 0.8 }}>
            Framework
          </div>
          <div className="flex gap-2 mt-4 flex-wrap logo-container-color-mix">
            <AboutPageIconSquare
              toolList={["react"]}
              level={0.8}
            />
            <AboutPageIconSquare
              toolList={["tailwind"]}
              level={0.6}
            />
            <AboutPageIconSquare
              toolList={["nodejs", "express"]}
              level={0.4}
            />
            <AboutPageIconSquare
              toolList={["pytorch"]}
              level={0.4}
            />
          </div>
        </div>
        <div
          className={"about-container p-4 rounded-3xl relative" +
            (rendered ? " show" : "")}
        >
          <SVGBorder
            className="drawing-border"
            borderRadius={24}
            drawBorder={false}
          />
          <div className="text-xl text-center">More info about me?</div>
        </div>
      </div>
      <p className="my-4">
        But ultimately, everything is learnable with time and programming
        knowledge is transferable.
      </p>
    </PageContainer>
  );
}

function AboutPageIconSquare({ toolList, level = 0.5 }: {
  toolList: string[];
  level: number;
}) {
  return (
    <IconSquareGenerator
      toolList={toolList}
      showWave
      waveProgress={level}
      containerStyle={{
        "--background-color": darken(
          mix(
            theme.secondaryColor,
            theme.accentColor,
            Math.abs(level - 0.33) * (1 / 0.66),
          ),
          0.1,
        ),
      } as CSSProperties}
    />
  );
}
