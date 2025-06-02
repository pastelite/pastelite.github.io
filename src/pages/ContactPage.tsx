import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";
import GitHubIcon from "../assets/logo/github-icon.svg?react";
import EmailIcon from "../assets/icons/envelope-icon.svg?react";
import DiscordIcon from "../assets/logo/discord.svg?react";
import ContactListItem from "../components/ContactListItem";
import OsuIcon from "../assets/logo/osu.svg?react";
import RedditIcon from "../assets/logo/reddit.svg?react";
import BlueskyIcon from "../assets/logo/bluesky.svg?react";
import SteamIcon from "../assets/logo/steam.svg?react";
import WikipediaIcon from "../assets/icons/wikipedia-icon.svg?react";
import WiktionaryIcon from "../assets/logo/Wiktionary_small_optimized.svg?react";
import HuggingfaceIcon from "../assets/logo/hf-logo-pirate-black-white.svg?react"
import ParticleBG from "../components/ParticlesBG";
// import ContactListItem

export function ContactPage() {
  const pageIndex = 2;
  const pageScrollLocation = usePositionStore((state) =>
    state.position[pageIndex]
  );

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-fourth-background)", // change in color.css
        minHeight: "100vh",
      }}
    >
      <TextHeader
        text="Link"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
      />
      <div>
        Some route you can use to contact me
      </div>
      <div className="flex flex-col md:flex-row relative gap-16 mt-4">
        <div className="w-full md:max-w-[360px]">
          <h2 className="text-3xl mb-4">Main</h2>
          <ContactListItem
            icon={GitHubIcon}
            linkTitle="pastelite"
            linkWebsiteName="GitHub"
            link="https://github.com/pastelite"
          />
          <ContactListItem
            icon={EmailIcon}
            linkTitle="Email (open app)"
            linkWebsiteName="Gmail"
            link="mailto:kana.bhong@gmail.com"
          />
          <ContactListItem
            icon={EmailIcon}
            linkTitle="Email (clipboard)"
            linkWebsiteName="Gmail"
            clipboard
            link="kana.bhong@gmail.com"
          />
          <ContactListItem
            icon={DiscordIcon}
            linkTitle="pastelite."
            linkWebsiteName="Discord"
            clipboard
            link="pastelite."
          />
        </div>
        <div>
          <h2 className="text-3xl mb-4">Other</h2>
          <ContactListItem
            icon={WikipediaIcon}
            linkTitle="ZilentFyld"
            linkWebsiteName="Thai Wikipedia"
            link="https://th.wikipedia.org/wiki/User:ZilentFyld"
            small
          />
          <ContactListItem
            icon={WiktionaryIcon}
            linkTitle="ZilentFyld"
            linkWebsiteName="Thai Wiktionary"
            link="https://th.wiktionary.org/wiki/User:ZilentFyld"
            small
          />
          <ContactListItem
            icon={OsuIcon}
            linkTitle="pastelite"
            linkWebsiteName="osu!"
            link="https://osu.ppy.sh/users/7098588"
            small
          />
          <ContactListItem
            icon={SteamIcon}
            linkTitle="pastelite"
            linkWebsiteName="Steam"
            link="https://steamcommunity.com/id/pastelite"
            small
          />
          <ContactListItem
            icon={RedditIcon}
            linkTitle="pastelite-"
            linkWebsiteName="Reddit"
            link="https://www.reddit.com/user/pastelite-/"
            small
          />
          <ContactListItem
            icon={HuggingfaceIcon}
            linkTitle="pastelite"
            linkWebsiteName="Huggingface"
            link="https://huggingface.co/pastelite"
            small
          />
          <ContactListItem
            icon={BlueskyIcon}
            linkTitle="pastelite"
            linkWebsiteName="Bluesky"
            link="https://bsky.app/profile/pastelite.bsky.social"
            small
            inactive
          />
        </div>
      </div>
      {/* <ParticleBG/> */}
    </PageContainer>
  );
}
