// It's getting way to long. Imma move here i guess

import DockerIcon from "@/assets/logo/devicon/docker-plain.svg?react";
import GithubIcon from "@/assets/logo/github-icon.svg?react";
import GoogleDriveIcon from "@/assets/logo/google-drive.svg?react";
import HuggingfaceIcon from "@/assets/logo/hf-logo-pirate-black-white.svg?react";
import WiktionaryIcon from "@/assets/logo/Wiktionary_small_optimized.svg?react";
import SmallLink from "@/components/UI/SmallLink";
import { IconSquareGenerator } from "@/components/UI/IconSquare";
import { useEffect, useState } from "react";

export default function WorksPageDescription({ page = -1 }) {
  const [pageAfterWait, setPageAfterWait] = useState(0);

  // basically prevent page from disappearing. need better way but this should be fine for now
  useEffect(() => {
    if (page == -1) {
      setTimeout(() => {
        setPageAfterWait(-1);
      }, 300);
    } else {
      setPageAfterWait(page);
    }
  }, [page]);

  return (
    <>
      {pageAfterWait == 0 && (
        <>
          <h3>My Previous Website</h3>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://github.com/pastelite/pstl.pw"
              action="link"
            >
              <GithubIcon className="h-6 w-6 mr-2" />
              Github
            </SmallLink>
          </div>
          <p>
            My old personal website was created back when I was trying to learn
            React. It's been a while since then, so I decided to write a new
            one, both for refreshing my knowledge and showcasing new techniques
            I've learned.
          </p>
          <p>
            But honestly, I'd say the old one looked better, just less cool.
          </p>
          <ToolSummaryBox
            languages={["typescript", "css"]}
            frameworks={["react", "tailwind"]}
          />
        </>
      )}
      {pageAfterWait == 1 && (
        <>
          <h3>Game Classification AI</h3>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://github.com/pastelite/game_classification_ai"
              action="link"
            >
              <GithubIcon className="h-6 w-6 mr-2" fill="white" />
              Github
            </SmallLink>
            <SmallLink
              link="https://huggingface.co/pastelite/game-classification"
              action="link"
            >
              <HuggingfaceIcon className="h-6 w-6 mr-2" fill="white" />
              Huggingface
            </SmallLink>
            <SmallLink
              link="https://hub.docker.com/r/pastelite/game_classify"
              action="link"
            >
              <DockerIcon className="h-6 w-6 mr-2" fill="white" />
              Docker
            </SmallLink>
          </div>
          <p>
            A simple AI that can classify video games based on their
            screenshots. This might be useful for forum categorization and other
            applications.
          </p>
          <p>
            The input images are extracted frames from videos downloaded from
            YouTube using FFmpeg.
          </p>
          <ToolSummaryBox
            languages={["python"]}
            frameworks={["pytorch", "gradio", "fastapi", "docker"]}
          />
        </>
      )}
      {pageAfterWait == 2 && (
        <>
          <h3>Pastelbin</h3>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://github.com/pastelite/pastebin-clone"
              action="link"
            >
              <GithubIcon className="h-6 w-6 mr-2" fill="white" />
              Github
            </SmallLink>
          </div>
          <p>
            Pastelbin is basically a Pastebin clone.
          </p>
          <p>
            I created this project to learn full-stack development. Pastebin is
            as simple as it gets: you input text, save it, and load it when a
            user wants to see or edit.
          </p>
          <p>
            The UI also includes a WYSIWYG (What You See Is What You Get) editor
            to assist with editing.
          </p>
          <p>
            My biggest mistake here was using MySQL, which made it a pain to set
            up for what should be a simple project. I haven't developed it
            further since then because I'm too lazy to fix it.
          </p>
          <ToolSummaryBox
            languages={["typescript", "css"]}
            frameworks={["react", "tailwindcss", "express", "node"]}
          />
        </>
      )}
      {pageAfterWait == 3 && (
        <>
          <h3>Brain Trainer</h3>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://drive.google.com/drive/folders/1Aj_-j-cVvP1mFGdRawDyXVOkpT3Bo_H7?usp=sharing"
              action="link"
            >
              <GoogleDriveIcon className="h-6 w-6 mr-2" fill="white" />
              Google Drive
            </SmallLink>
          </div>
          <p>
            A trainer for brain-related machine learning tasks.
          </p>
          <p>
            The trainer includes data transformation, an extensible base trainer
            class, and an epoch summary with various metrics.
          </p>
          <p>
            I The trainer includes data transformation, an extensible base
            trainer class, and an epoch summary with various metrics.
          </p>
          <ToolSummaryBox
            languages={["python"]}
            frameworks={["pytorch"]}
          />
        </>
      )}
      {pageAfterWait == 4 && (
        <>
          <h3>Wikibots</h3>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://github.com/pastelite/ZilentBot-wiktionary"
              action="link"
            >
              <GithubIcon className="h-6 w-6 mr-2" fill="white" />
              Github
            </SmallLink>
            <SmallLink
              link="https://th.wiktionary.org/wiki/Special:Contributions/ZilentBot"
              action="link"
            >
              <WiktionaryIcon className="h-6 w-6 mr-2" fill="white" />
              Bot Wiktionary
            </SmallLink>
          </div>
          <p>
            I was an avid Wikipedia and Wiktionary contributor for a long time.
            I stopped when I was in university and had less time to contribute.
            No matter what, I was too lazy to write many pages, so I just wrote
            a bot to do it for me.
          </p>
          <p>
            What the bot usually does is visit a page, gather information,
            search for necessary details, and then create new pages.
          </p>
          <p>
            Other than this, I also have many different scripts that I used to
            speed up page creation. I will link them here, I guess:
          </p>
          <div className="flex gap-2 flex-wrap">
            <SmallLink
              link="https://th.wiktionary.org/wiki/User:ZilentFyld/bettercreate.js"
              action="link"
            >
              <WiktionaryIcon className="h-6 w-6 mr-2" fill="white" />
              Automatic page creator
            </SmallLink>
            <SmallLink
              link="https://th.wiktionary.org/wiki/User:ZilentFyld/zilentscript.js"
              action="link"
            >
              <WiktionaryIcon className="h-6 w-6 mr-2" fill="white" />
              ZilentScript
            </SmallLink>
          </div>
          <ToolSummaryBox
            languages={["python", "javascript"]}
            frameworks={["mediawiki"]}
          />
        </>
      )}
    </>
  );
}

function ToolSummaryBox(
  { languages, frameworks }: { languages: string[]; frameworks: string[] },
) {
  return (
    <div className="tools-summary-box">
      <div className="container">
        <h4>Languages</h4>
        <div className="flex gap-2">
          <IconSquareGenerator
            toolList={languages}
          />
        </div>
      </div>
      <div className="container">
        <h4>Frameworks</h4>
        <div className="flex gap-2">
          <IconSquareGenerator
            toolList={frameworks}
          />
        </div>
      </div>
    </div>
  );
}
