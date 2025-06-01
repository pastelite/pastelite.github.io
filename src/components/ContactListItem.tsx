import CheckIcon from "../assets/material_icons/assignment_turned_in.svg?react";
import { type CSSProperties, useState } from "react";
import "./ContactListItem.style.css";

interface ContactListItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  linkTitle: string;
  linkWebsiteName?: string;
  link?: string;
  onClick?: () => void;
  clipboard?: boolean;
  small?: boolean;
  inactive?: boolean;
}

export default function ContactListItem(
  {
    icon: Icon,
    linkTitle,
    linkWebsiteName,
    link,
    onClick,
    clipboard,
    small = false,
    inactive = false
  }: ContactListItemProps,
) {
  const [copied, setCopied] = useState(false);
  function handleClick() {
    if (link && clipboard) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <a
      href={clipboard ? undefined : link}
      className="text-white"
      style={{
        cursor: (onClick || link) ? "pointer" : "none",
      }}
    >
      <div
        onClick={onClick || handleClick}
        className={`contact-list-item ${small?"smaller":""}`}
        style={{
          height: small ? 45 : 70,
          opacity: inactive? 0.5 : 1,
          ...{
            "--hover-bg-color": "red",
            "--hover-height": small ? "55px" : "80px",
          } as CSSProperties,
        }}
      >
        <div
          className="contact-list-item-icon"
          style={{
            opacity: copied ? 0 : 1,
          }}
        >
          <Icon height={small? "32px":"46px"} width={small? "32px":"46px"} fill="white" />
        </div>
        <div
          className="contact-list-text"
          style={{
            opacity: copied ? 0 : 1,
          }}
        >
          <div className="subtitle">{linkWebsiteName}</div>
          <div className="text-2xl">{linkTitle}</div>
        </div>
        <div
          className="copy-to-clipboard-notice"
          style={{
            opacity: copied ? 1 : 0,
          }}
        >
          <CheckIcon height="80px" />
          Copied to the clipboard
        </div>
      </div>
    </a>
  );
}
