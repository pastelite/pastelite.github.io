import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import { type ReactNode, useEffect, useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import TopRightIcon from "../assets/icons/arrow-top-right.svg?react";
import ReactLogo from "../assets/logo/React.svg?react";
import TypeScriptLogo from "../assets/logo/TypescriptNoBorder.svg?react";
import ViteLogo from "../assets/logo/ViteBlack.svg?react";
import TailwindLogo from "../assets/logo/Tailwind.svg?react";

import OldWebsiteImage from "../assets/previousWork/old_website.png";
import ToolIcon from "../components/ToolIcon";

function devideArrayByColumn<T>(array: T[], col: number): T[][] {
  let arrays: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    let row = Math.floor(i / col);

    if (arrays.length < row + 1) {
      arrays.push([]);
    }

    arrays[row].push(array[i]);
  }

  return arrays;
}

interface WorkListItemProps {
  title: string;
  image?: string;
  children?: ReactNode;
  tools: ReactNode;
  linkName?: string;
  linkTo?: string;
}

function WorkListItem(
  { title, image, children, tools, linkName, linkTo }: WorkListItemProps,
) {
  return (
    <div className="work-list-item relative h-full w-full">
      <img
        className="w-full h-[calc(100%-48px)] object-cover object-left transition-all duration-200"
        src={image}
      >
      </img>
      <div className="desc text-white absolute left-0 w-full top-[calc(100%-48px)] h-full">
        <div className="h-[48px] border-t border-b border-white flex justify-between items-center px-2">
          {title}
          <a href={linkTo}>
            <div className="link flex px-2 py-1">
              <div className="link-text text-white">{linkName}</div>
              <TopRightIcon fill="white"></TopRightIcon>
            </div>
          </a>
        </div>

        <div className="desc text-white h-0 px-2 py-2">
          {children}
        </div>

        <div className="absolute bottom-4 left-4 h-12 gap-2 flex">
          {tools}
        </div>
      </div>
    </div>
  );
}

export function WorksPage() {
  const pageIndex = 1;
  const pageScrollLocation = usePositionStore((state) =>
    state.position[pageIndex]
  );

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-third-background)",
        height: "100vh",
      }}
    >
      <TextHeader
        text="Project"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
      />
      <GrowingGrid>
        <WorkListItem
          title="My Previous Website"
          tools={
            <>
              <ToolIcon color="#087ea4" tooltip="React">
                <ReactLogo className="h-full w-full" />
              </ToolIcon>
              <ToolIcon color="#3178c6" tooltip="TypeScript">
                <TypeScriptLogo className="h-full w-full" />
              </ToolIcon>
              <ToolIcon color="#38bdf8" tooltip="Tailwind">
                <TailwindLogo className="h-full w-full" fill="white" />
              </ToolIcon>
              <ToolIcon color="#8b73fe" tooltip="Vite">
                <ViteLogo className="h-full w-full" fill="white" />
              </ToolIcon>
            </>
          }
          image={OldWebsiteImage}
          linkName="GitHub"
          linkTo="https://github.com/pastelite/pstl.pw"
        >
          The second website I've ever made! arguably looks even better than
          this one but lack the "coolness"
        </WorkListItem>
        <div>Test2</div>
        <div>Test3</div>
      </GrowingGrid>
    </PageContainer>
  );
}

interface GrowingGridProps {
  children: React.ReactNode[];
  gap?: 10;
}

export function GrowingGrid({ children: items, gap = 10 }: GrowingGridProps) {
  const [numColumn, setNumColumn] = useState(3);
  const breakpoint = useBreakpoint([1024]);
  useEffect(() => {
    if (breakpoint < 1) {
      setNumColumn(2);
    } else {
      setNumColumn(3);
    }
  }, [breakpoint]);

  const [currentCol, setCurrentCol] = useState(-1);

  return (
    <div
      className="flex flex-col w-full h-[50vh] min-h-[50vh] max-h-[50vh]"
      style={{
        gap: gap,
      }}
    >
      {devideArrayByColumn(items, numColumn).map((rows, _) => {
        return (
          <div
            className="flex w-full grow-1 hover:grow-2 transition-all duration-200 overflow-hidden"
            style={{
              gap: gap,
            }}
          >
            {rows.map((item, colIndex) => {
              return (
                <div
                  className="basis-0 transition-all duration-200 overflow-hidden"
                  onMouseEnter={() => {
                    setCurrentCol(colIndex);
                  }}
                  onMouseLeave={() => {
                    setCurrentCol(-1);
                  }}
                  style={{
                    flexGrow: colIndex == currentCol ? 2 : 1,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
