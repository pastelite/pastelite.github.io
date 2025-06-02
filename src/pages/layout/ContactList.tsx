import GithubIcon from "../../assets/logo/github-icon.svg?react";
import WikipediaIcon from "../../assets/icons/wikipedia-icon.svg?react";
import EmailIcon from "../../assets/icons/envelope-icon.svg?react";

export default function ContactList() {
  return (
    <div className="flex flex-row gap-4 pointer-events-auto">
      <div className="min-content">
        <a href="https://github.com/pastelite">
          <GithubIcon className="h-6 w-6" />
        </a>
      </div>
      <div className="min-content">
        <a href="https://th.wikipedia.org/wiki/User:ZilentFyld">
          <WikipediaIcon className="h-6 w-6" />
        </a>
      </div>
      <div className="min-content">
        <a href="mailto:kana.bhong@gmail.com">
          <EmailIcon className="h-6 w-6"/>
        </a>
      </div>
    </div>
  );
}