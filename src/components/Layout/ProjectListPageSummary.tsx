// It's getting way to long. Imma move here i guess

import SmallLink from "@/components/Atoms/SmallLink";
import { IconSquareGenerator } from "@/components/UI/IconSquare";
import GithubIcon from "@/assets/logo/github-icon.svg?react";
import HuggingfaceIcon from "@/assets/logo/hf-logo-pirate-black-white.svg?react";
import DockerIcon from "@/assets/logo/devicon/docker-plain.svg?react";
import GoogleDriveIcon from "@/assets/logo/google-drive.svg?react";
import WiktionaryIcon from "@/assets/logo/Wiktionary_small_optimized.svg?react";
import { useEffect, useState } from "react";

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

export default function ProjectListPageSummary({ page = -1 }) {
  const [pageAfterWait, setPageAfterWait] = useState(0);

  // basically prevent page from disappearing. need better way but this should be fine for now
  useEffect(()=>{
    if (page == -1) {
      setTimeout(() => {
        setPageAfterWait(-1);
      }, 300)
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
            My previous personal website writing when I'm trying to learn React.
            It's been a long time since then that's why I wrote this new website
            to showcase my improve skill
          </p>
          <p>
            But I'd say though, It was looking so much better than this one.
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
            A simple AI that can classify video games based on their screenshot.
            Might be useful for forum categorization and stuff.
          </p>
          <p>
            The input image are coming from a video download from youtube and
            extract frames from it using ffmpeg.
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
            Pastelbin is basically a pastebin clone.
          </p>
          <p>
            This project is created for me to learn full stack development.
            pastebin is as simple as it get, get some text, save it, and load it
            when user want to edit
          </p>
          <p>
            The UI is also include WYSIWYG (what you see is what you get) editor
            to help with edit
          </p>
          <p>
            Note that my greatest mistake here is to use MySQL which make it a
            pain to setup. I didn't develop since then because I'm too lazy to
            fix it.
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
            A trainer for brain-related machine learning task
          </p>
          <p>
            The trainer including data transform, extensible base trainer class,
            epoch summary with each metrics,
          </p>
          <p>
            I cannot release the code for now due to the possibility of leaking
            patient data. So I will put it in Google Drive without git repo and
            models.
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
            I stopped when I was in university and have less time to contribute.
            No matter what, I was so lazy to write many pages so I just write a
            bot to do it for me
          </p>
          <p>
            What the bot usually does is visit a page, get some information,
            search necessary information, and create a new pages
          </p>
          <p>
            Other than this, I also have many different script that I used to
            speedup page creation. I will link here I guess:
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
