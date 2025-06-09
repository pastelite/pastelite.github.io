import AbsoluteGrid from "@/components/UI/AbsoluteGrid";
import useBreakpoint from "@/hooks/useBreakpoint";
import { choosing } from "@/utils/number";
import { useContext } from "react";
import { WorksListContext } from "./WorksPage";
import WorksListItem from "@/components/Layout/WorksListItem";
import SmallLink from "@/components/UI/SmallLink";
import BrainTrainerImage from "@/assets/previousWork/brain_trainer.png";
import GameAiImage from "@/assets/previousWork/game_ai.png";
import PrevWebImage from "@/assets/previousWork/old_website.png";
import PastelbinImage from "@/assets/previousWork/pastelbin.png";
import ZilentBotImage from "@/assets/previousWork/zilentbot.png";

export default function ProjectListGrid() {
  const breakpoint = useBreakpoint([640, 1024]);
  let { selected, setSelected } = useContext(WorksListContext);

  return (
    <AbsoluteGrid
      numColumns={choosing(breakpoint, [1, 2, 3])}
      className={`projects-list-container ${
        (selected > -1) ? "show-description" : ""
      }`}
      onClick={() => {
        if (selected > -1) {
          setSelected(-1);
        }
      }}
      style={{
        height: choosing(breakpoint, ["1200px", "750px", "500px"]),
      }}
    >
      <WorksListItem
        index={0}
        title={"My Previous Website"}
        link="https://github.com/pastelite/pstl.pw"
        linkText="GitHub"
        image={PrevWebImage}
      >
        <div className="p-2 grid place-content-center h-full">
          An older website written in React, arguably more pleasantly looking,
          but less "cool."
        </div>
      </WorksListItem>
      <WorksListItem
        index={1}
        title="Game Classification AI"
        link="https://github.com/pastelite/game_classification_ai"
        linkText="GitHub"
        image={GameAiImage}
      >
        <div className="p-2 grid place-content-center h-full">
          A classification AI that categorizes games based on their screenshots,
          written in Python.
        </div>
      </WorksListItem>
      <WorksListItem
        index={2}
        title={"Pastelbin"}
        link="https://github.com/pastelite/pastebin-clone"
        linkText="GitHub"
        image={PastelbinImage}
      >
        <div className="p-2 grid place-content-center h-full">
          A simple Pastebin clone with a React frontend and Express+Node backend
        </div>
      </WorksListItem>
      <WorksListItem
        index={3}
        title={"Brain Trainer"}
        link="https://drive.google.com/drive/folders/1Aj_-j-cVvP1mFGdRawDyXVOkpT3Bo_H7?usp=sharing"
        linkText="Google Drive"
        image={BrainTrainerImage}
      >
        <div className="p-2 grid place-content-center h-full">
          A trainer for brain-related machine learning tasks.
        </div>
      </WorksListItem>
      <WorksListItem
        index={4}
        title={"Wikibots"}
        link="https://github.com/pastelite/ZilentBot-wiktionary"
        linkText="GitHub"
        image={ZilentBotImage}
      >
        <div className="p-2 grid place-content-center h-full">
          A bot/script for creating pages in Wiktionary.
        </div>
      </WorksListItem>
      <div className="other-links flex flex-col items-center justify-center">
        <div className="grow"></div>
        <div>And of course, this website!</div>
        <div className="grow"></div>
        <div className="text-left">
          By the way, here are some other random university projects I worked on
          with friends:
          <div className="flex flex-wrap gap-2">
            <SmallLink link="https://github.com/tawan-chaidee/MangaIRSystem">
              Manga Search System + Scraper
            </SmallLink>
            <SmallLink link="https://github.com/tawan-chaidee/ITCS424-GeoTask">
              Flutter To-Do List with Maps
            </SmallLink>
            <SmallLink link="https://github.com/tawan-chaidee/Image_sternography">
              Hiding Messages in Images
            </SmallLink>
          </div>
        </div>
      </div>
    </AbsoluteGrid>
  );
}
