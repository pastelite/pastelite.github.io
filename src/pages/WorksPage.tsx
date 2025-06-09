import { createContext, type ReactNode, useState } from "react";
import TextHeader from "../components/UI/TextHeader";

import ScrollPositionTracker from "@/components/UI/ScrollPositionTracker";
import WorksPageDescription from "./WorksPageDescription";
import WorksPageGrid from "./WorksPageGrid";

import "./WorksPage.style.scss";

export const WorksListContext = createContext<
  { selected: number; setSelected: Function }
>({
  selected: -1,
  setSelected: () => {},
});

export function WorksPage() {
  const [selected, setSelected] = useState(-1);

  return (
    <ScrollPositionTracker
      className="auto-left-padding auto-top-padding mb-8 overflow-hidden"
      page={1}
      style={{
        minHeight: "100vh",
      }}
    >
      <TextHeader
        text="Project"
        drawingTimeSec={0.3}
        className="mb-6"
      />
      <div className="text-left">
        You can click on each image to view more information.
      </div>
      <div className="relative project-list-page py-6">
        <WorksListContext.Provider value={{ selected, setSelected }}>
          <WorksPageGrid />
        </WorksListContext.Provider>
        <div
          className={`description-page ${
            (selected > -1) ? "show-description" : ""
          }`}
        >
          <WorksPageDescription page={selected} />
        </div>
      </div>
    </ScrollPositionTracker>
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
