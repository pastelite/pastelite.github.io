import { type ReactNode } from "react";
import LinkIcon from "@/assets/icons/arrow-top-right.svg?react";
import ClipboardIcon from "@/assets/material_icons/assignment_turned_in.svg?react";

import "./SmallLink.style.scss";

interface SmallLink {
  link?: string;
  action?: "link" | "clipboard" | "action";
  onClick?: () => void;
  children?: ReactNode;
}

export default function SmallLink(
  { link, action = "link", children, onClick }: SmallLink,
) {
  const clipboardCopy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <a
      href={action == "link" ? link : undefined}
      onClick={action == "clipboard"
        ? () => clipboardCopy(link || "")
        : onClick}
    >
      <div className="small-links">
        {children}
        {action == "link" && <LinkIcon></LinkIcon>}
        {action == "clipboard" && <ClipboardIcon></ClipboardIcon>}
      </div>
    </a>
  );
}
