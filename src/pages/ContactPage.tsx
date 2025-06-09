import ScrollPositionTracker from "@/components/UI/ScrollPositionTracker";
import EmailIcon from "../assets/icons/envelope-icon.svg?react";
import WikipediaIcon from "../assets/icons/wikipedia-icon.svg?react";
import WiktionaryIcon from "../assets/logo/Wiktionary_small_optimized.svg?react";
import BlueskyIcon from "../assets/logo/bluesky.svg?react";
import DiscordIcon from "../assets/logo/discord.svg?react";
import GitHubIcon from "../assets/logo/github-icon.svg?react";
import HuggingfaceIcon from "../assets/logo/hf-logo-pirate-black-white.svg?react";
import OsuIcon from "../assets/logo/osu.svg?react";
import RedditIcon from "../assets/logo/reddit.svg?react";
import SteamIcon from "../assets/logo/steam.svg?react";
import ContactListItem from "../components/UI/ContactListItem";
import TextHeader from "../components/UI/TextHeader";

export function ContactPage() {
  return (
    <ScrollPositionTracker
      className="auto-left-padding auto-top-padding text-left bg-[#0004]"
      page={2}
      style={{
        minHeight: "100vh",
      }}
    >
      <TextHeader
        text="Link"
        drawingTimeSec={0.3}
        className="flex justify-center"
      />
      <div className="text-center mt-2">
        Some route you can use to contact me {":)"}
      </div>
      <div className="flex flex-col md:flex-row relative gap-8 md:gap-32 mt-4 md:w-max m-auto pb-[100px] md:pb-0">
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
          <h2 className="text-3xl mb-4 md:min-w-[250px]">Other</h2>
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
    </ScrollPositionTracker>
  );
}
