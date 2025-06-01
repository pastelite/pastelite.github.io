import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import { type ReactNode, useEffect, useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import TopRightIcon from "../assets/icons/arrow-top-right.svg?react";

import OldWebsiteImage from "../assets/previousWork/old_website.png";
import GameAiImage from "../assets/previousWork/game_ai.png";
import PastelbinImage from "../assets/previousWork/pastelbin.png";
import BrainTrainerImage from "../assets/previousWork/brain_trainer.png";
import ZilentBotImage from "../assets/previousWork/zilentbot.png";
import ToolIcon, { ToolIconList } from "../components/ToolIcon";
import { choosing } from "../utils/number";

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

export function WorksPage() {
  const pageIndex = 1;
  const scrollPosition = usePositionStore((state) => state.position);
  const pageScrollLocation = scrollPosition[pageIndex];
  const nextScrollLocation = scrollPosition[pageIndex + 1];
  let breakpoint = useBreakpoint([768, 1024]);

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-third-background)",
        minHeight: "100vh",
      }}
    >
      <TextHeader
        text="Project"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
        className="mb-6"
      />
      <GrowingGrid
        style={{
          height: choosing(breakpoint, [
            "calc(300px * 6)",
            "calc(300px * 3)",
            "calc(300px * 2)",
          ]),
        }}
        gap={20}
      >
        <WorkListItem
          title="My Previous Website"
          tools={ToolIconList({
            list: ["react", "typescript", "tailwind", "vite"],
          })}
          image={OldWebsiteImage}
          imageObjectPosition="left"
          linkName="GitHub"
          linkTo="https://github.com/pastelite/pstl.pw"
        >
          The second website I've ever made! arguably looks even better than
          this one but lack the "coolness"
        </WorkListItem>
        <WorkListItem
          title="Game Classification AI"
          tools={ToolIconList({
            list: ["python", "pytorch"],
          })}
          image={GameAiImage}
          linkName="GitHub"
          linkTo="https://github.com/pastelite/game_classification_ai"
        >
          An machine learning model that detect game based on the screenshot.
          There are many version of the model including the 2dConv stack and
          efficient net finetuning model. The code also include the screenshot
          extractor from video, gradio ui, and fast api
        </WorkListItem>
        <WorkListItem
          title="Pastelbin"
          tools={ToolIconList({
            list: [
              "react",
              "typescript",
              "tailwind",
              "vite",
              "nodejs",
              "express",
            ],
          })}
          image={PastelbinImage}
          linkName="GitHub"
          linkTo="https://github.com/pastelite/pastebin-clone"
          imageObjectPosition="left top"
        >
          Basically a pastebin clone. The project also include WYSIWG text
          editor to help with the note writing
        </WorkListItem>
        <WorkListItem
          title="Brain Trainer"
          tools={ToolIconList({
            list: ["python", "pytorch"],
          })}
          image={BrainTrainerImage}
          linkName="Google Drive"
          linkTo="https://drive.google.com/drive/folders/1Aj_-j-cVvP1mFGdRawDyXVOkpT3Bo_H7?usp=sharing"
          imageObjectPosition="left top"
        >
          My university senior project is related to training a model related to
          brain, so I wrote the trainer equiped with nifti loader, data
          transformation, k-fold, and extensible trainer class to train my
          model. To prevent patient name leaking, I will release this as a
          zipped file for now
        </WorkListItem>
        <WorkListItem
          title="Wikibots"
          tools={ToolIconList({
            list: ["javascript", "python"],
          })}
          image={ZilentBotImage}
          linkName="GitHub"
          linkTo="https://github.com/pastelite/ZilentBot-wiktionary"
          imageObjectPosition="top"
        >
          I used to be avid wikipedia/wiktionary translator (from english to
          thai) so I made a lot of bots/script to use. the link provided are the
          bots for generating declention page in spefic language
        </WorkListItem>
        <div className="flex flex-col justify-center items-center w-full h-full text-xl text-center">
          This Website! <br />(Because of course it is)
        </div>
      </GrowingGrid>
    </PageContainer>
  );
}

interface WorkListItemProps {
  title: string;
  image?: string;
  children?: ReactNode;
  tools: ReactNode;
  linkName?: string;
  linkTo?: string;
  imageObjectPosition?: string;
}

function WorkListItem(
  {
    title,
    image,
    children,
    tools,
    linkName,
    linkTo,
    imageObjectPosition = "center",
  }: WorkListItemProps,
) {
  return (
    <div className="work-list-item relative h-full w-full">
      <img
        className="w-full h-[calc(100%-48px)] object-cover transition-all duration-200"
        src={image}
        style={{
          objectPosition: imageObjectPosition,
        }}
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

        <div className="text-white px-2 py-2">
          {children}
        </div>

        <div className="absolute bottom-4 left-4 h-12 gap-2 flex">
          {tools}
        </div>
      </div>
    </div>
  );
}

interface GrowingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  gap?: number;
}

export function GrowingGrid(
  { children: items, gap = 10, className, style, ...props }: GrowingGridProps,
) {
  const [numColumn, setNumColumn] = useState(3);
  const breakpoint = useBreakpoint([768, 1024]);
  useEffect(() => {
    if (breakpoint == 0) {
      setNumColumn(1);
    } else if (breakpoint == 1) {
      setNumColumn(2);
    } else {
      setNumColumn(3);
    }
  }, [breakpoint]);

  const [currentCol, setCurrentCol] = useState(-1);

  return (
    <div
      className={`flex flex-col w-full ${className || ""}`}
      style={{
        gap: gap,
        ...style,
      }}
      {...props}
    >
      {devideArrayByColumn(items, numColumn).map((rows, rowIndex) => {
        return (
          <div
            className="flex w-full grow-2 hover:grow-3 shrink-1 basis-0 transition-all duration-200 overflow-hidden"
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
                    flexGrow: colIndex == currentCol ? 3 : 2,
                    ...{ "--item-index": rowIndex * numColumn + colIndex },
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
