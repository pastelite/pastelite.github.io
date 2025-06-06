import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  use,
  useContext,
  useRef,
  useState,
} from "react";
import "./ProjectListPage.style.scss";
import AbsoluteGrid from "../UI/AbsoluteGrid";
import useBreakpoint from "@/hooks/useBreakpoint";
import { choosing } from "@/utils/number";
import TopRightIcon from "@/assets/icons/arrow-top-right.svg?react";
import CollapsibleAutoWidthDiv from "../Atoms/CollapsibleAutoWidthDiv";

// Images
import PrevWebImage from "@/assets/previousWork/old_website.png";
import GameAiImage from "@/assets/previousWork/game_ai.png";
import PastelbinImage from "@/assets/previousWork/pastelbin.png";
import BrainTrainerImage from "@/assets/previousWork/brain_trainer.png";
import ZilentBotImage from "@/assets/previousWork/zilentbot.png";
import usePositionStore from "@/store";

// Icon
import GithubIcon from "@/assets/logo/github-icon.svg?react";
import { IconSquareGenerator } from "../UI/IconSquare";
import SmallLink from "../Atoms/SmallLink";
import ProjectListPageSummary from "./ProjectListPageSummary";
import useShownWhenOnScreen from "@/hooks/useShownWhenOnScreen";

const ProjectListContext = createContext<
  { selected: number; setSelected: Function }
>({
  selected: -1,
  setSelected: () => {},
});

export default function ProjectListPage() {
  const [selected, setSelected] = useState(-1);
  const breakpoint = useBreakpoint([1024]);

  return (
    <div className="relative project-list-page py-6">
      <ProjectListContext.Provider value={{ selected, setSelected }}>
        <AbsoluteGrid
          numColumns={choosing(breakpoint, [2, 3])}
          className={`projects-list-container ${
            (selected > -1) ? "show-description" : ""
          }`}
          onClick={() => {
            if (selected > -1) {
              setSelected(-1);
            }
          }}
          style={{
            height: choosing(breakpoint, ["750px", "500px"]),
          }}
        >
          <ProjectListItem
            index={0}
            title={"My Previous Website"}
            link="https://github.com/pastelite/pstl.pw"
            linkText="GitHub"
            image={PrevWebImage}
          >
            <div className="p-2 grid place-content-center h-full">
              Older website written in React, arguably more pleasantly looking,
              but less "cool"
            </div>
          </ProjectListItem>
          <ProjectListItem
            index={1}
            title="Game Classification AI"
            link="https://github.com/pastelite/game_classification_ai"
            linkText="GitHub"
            image={GameAiImage}
          >
            <div className="p-2 grid place-content-center h-full">
              A classification AI that classify games based on their
              screenshots. Written in Python
            </div>
          </ProjectListItem>
          <ProjectListItem
            index={2}
            title={"Pastelbin"}
            link="https://github.com/pastelite/pastebin-clone"
            linkText="GitHub"
            image={PastelbinImage}
          >
            <div className="p-2 grid place-content-center h-full">
              A simple pastebin clone with React Frontend and Express Backend
            </div>
          </ProjectListItem>
          <ProjectListItem
            index={3}
            title={"Brain Trainer"}
            link="https://drive.google.com/drive/folders/1Aj_-j-cVvP1mFGdRawDyXVOkpT3Bo_H7?usp=sharing"
            linkText="Google Drive"
            image={BrainTrainerImage}
          >
            <div className="p-2 grid place-content-center h-full">
              A trainer for brain related machine learning tasks
            </div>
          </ProjectListItem>
          <ProjectListItem
            index={4}
            title={"Wikibots"}
            link="https://github.com/pastelite/ZilentBot-wiktionary"
            linkText="GitHub"
            image={ZilentBotImage}
          >
            <div className="p-2 grid place-content-center h-full">
              A bot/script for creating pages in Wiktionary
            </div>
          </ProjectListItem>
          <div className="other-links flex flex-col items-center justify-center">
            <div className="grow"></div>
            <div>And of course, this website.</div>
            <div className="grow"></div>
            <div className="text-left">
              By the way, there are some more random university project. I wrote
              it with friends:
              <div className="flex flex-wrap gap-2">
                <SmallLink link="https://github.com/tawan-chaidee/MangaIRSystem">
                  Manga Search System + Scraper
                </SmallLink>
                <SmallLink link="https://github.com/tawan-chaidee/ITCS424-GeoTask">
                  Flutter todo-list with maps
                </SmallLink>
                <SmallLink link="https://github.com/tawan-chaidee/Image_sternography">
                  Hiding messages in images
                </SmallLink>
              </div>
            </div>
          </div>
        </AbsoluteGrid>
      </ProjectListContext.Provider>
      <div
        className={`description-page ${
          (selected > -1) ? "show-description" : ""
        }`}
      >
        <ProjectListPageSummary page={selected} />
      </div>
    </div>
  );
}

interface ProjectListItemProps {
  index: number;
  title?: string;
  children?: ReactNode;
  image?: string;
  linkText?: string;
  link?: string;
}

interface ProjectListItemContainerProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
}

function ProjectListItem(
  { index, title, children: description, image, linkText, link }:
    ProjectListItemProps,
) {
  let { selected, setSelected } = useContext(ProjectListContext);
  let pagePosition = usePositionStore((state) => state.position);
  let [hovered, setHovered] = useState(false);
  let breakpoint = useBreakpoint([768]);
  let [ref, inRange] = useShownWhenOnScreen<HTMLDivElement>(0, 0);

  function handleSelection(index: number) {
    if (index === selected) {
      setSelected(-1);
    } else if (selected === -1) {
      setSelected(index);
      if (breakpoint < 1) {
        window.scrollTo({
          top: pagePosition[1],
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <div
      className={`project-list-item ${selected === index ? "selected" : ""} ${inRange ? "show" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
    >
      <img src={image} onClick={() => handleSelection(index)}></img>
      <div className="project-name">
        {title}
        <a href={link}>
          <div className="link">
            <CollapsibleAutoWidthDiv className="link-text" collapsed={!hovered}>
              {linkText}
            </CollapsibleAutoWidthDiv>
            <TopRightIcon />
          </div>
        </a>
      </div>
      <div className="hover-description" onClick={() => handleSelection(index)}>
        {description}
      </div>
      <CollapsibleAutoWidthDiv
        className="back-button"
        collapsed={!(selected === index)}
      >
        {"<<< Back"}
      </CollapsibleAutoWidthDiv>
    </div>
  );
}
