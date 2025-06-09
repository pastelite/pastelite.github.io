import SVGBorder from "@/components/Atoms/SVGBorder";
import TextSVG from "@/components/Atoms/TextSVG";
import Puzzle from "@/components/Organism/Puzzle";
import { IconSquareGenerator } from "@/components/UI/IconSquare";
import ScrollPositionTracker from "@/components/UI/ScrollPositionTracker";
import useShownWhenOnScreen from "@/hooks/useShownWhenOnScreen";
import theme from "@/styles/theme";
import { darken, mix, saturate } from "color2k";
import { type CSSProperties } from "react";
import "./AboutPage.style.scss";
import useBreakpoint from "@/hooks/useBreakpoint";

export function AboutPage() {
  const [textRef, isShowText] = useShownWhenOnScreen<HTMLDivElement>();
  let breakpoint = useBreakpoint([768]);

  return (
    <ScrollPositionTracker page={0}>
      <div className="auto-left-padding text-left flex flex-col md:flex-row items-center justify-between min-h-[75vh] py-4 mt-[50px]">
        <div className="left-side w-full md:max-w-[600px] flex flex-col gap-2">
          <div className={`mb-4`} ref={textRef}>
            <TextSVG
              drawedText={isShowText}
              text={"About"}
              fontSize={100}
              drawingTimeSec={0.3}
            />
          </div>
          <div className="text-3xl text-white mb-4">
            Hello! I'm{"  "}
            <span
              className="font-bold"
              style={{ color: "var(--accent-color-1)" }}
            >
              pastelite
            </span>,<br /> Just a normal guy who like to code!
          </div>
          <p>
            I've been coding since high school, and I haven't stopped since
          </p>
          <p>
            I do it because it's fun! Coding is like playing a sandbox game
            where you can build whatever you want. It's also like solving a
            puzzle where the answer is the result you desired.
          </p>
          <p>
            By the way, the puzzle on the{" "}
            {breakpoint === 0 ? "bottom" : "right"} is playable.
          </p>
        </div>
        <div className="right-side grow flex justify-center items-center">
          <Puzzle className="!h-[200px] !w-[200px] lg:!h-[300px] lg:!w-[300px] my-4" />
        </div>
      </div>
      <div className="about-summary-grid-container bg-[#0003] py-8">
        <div className="auto-left-padding about-summary-grid">
          <AboutPageBox style={{ zIndex: 1 }} className="text-left">
            <SVGBorder
              className="drawing-border"
              borderRadius={24}
              drawBorder={false}
            />
            <div className="text-xl text-center">
              How would I rate my skill?
            </div>
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
            <p className="my-4">
              But ultimately, programming knowledge is transferable, and
              everything is learnable with time and practice.
            </p>
          </AboutPageBox>
          <AboutPageBox className="flex flex-col">
            <div className="grow text-4xl grid place-content-center text-nowrap">
              🇹🇭🛕🐘
            </div>
            <div className="">
              I'm from Thailand, somewhere near Bangkok
            </div>
          </AboutPageBox>
          <AboutPageBox className="flex flex-col">
            <div className="grow text-4xl grid place-content-center text-nowrap">
              💻🌐🤖
            </div>
            <div className="">
              I think I'm interested in full-stack and machine learning
            </div>
          </AboutPageBox>
          <AboutPageBox className="flex flex-col">
            <div className="grow text-4xl grid place-content-center text-nowrap">
              🥐🥐🥐
            </div>
            <div className="">
              I love croissants. Is it even possible not to love croissants?
            </div>
          </AboutPageBox>
          <AboutPageBox className="flex flex-col">
            <div className="grow text-4xl grid place-content-center text-nowrap">
              {"</>"}⌨️🖱️
            </div>
            <div className="">
              In my free time, I code and play games, especially strategy games.
            </div>
          </AboutPageBox>
        </div>
      </div>
    </ScrollPositionTracker>
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
        "--background-color": mix(
          theme.secondaryColor,
          saturate(darken(theme.accentColor, 0.2), 0.2),
          Math.abs(level - 0.33) * (1 / 0.66),
        ),
      } as CSSProperties}
    />
  );
}

function AboutPageBox(
  { children, style, className }: {
    children?: React.ReactNode;
    style?: CSSProperties;
    className?: string;
  },
) {
  let [ref, isShown] = useShownWhenOnScreen<HTMLDivElement>(0, 100);

  return (
    <div
      ref={ref}
      className={"about-container p-4 rounded-3xl relative" +
        (isShown ? " show" : "") + (className ? ` ${className}` : "")}
      style={style}
    >
      <SVGBorder
        className="drawing-border"
        borderRadius={24}
        drawBorder={false}
      />
      {children}
    </div>
  );
}
