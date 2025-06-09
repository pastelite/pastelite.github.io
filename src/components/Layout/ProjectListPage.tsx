
import useBreakpoint from "@/hooks/useBreakpoint";
import { choosing } from "@/utils/number";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useState,
} from "react";
import CollapsibleAutoWidthDiv from "../UI/CollapsibleAutoWidthDiv";
import AbsoluteGrid from "../UI/AbsoluteGrid";
import "../../pages/WorksPage.style.scss";

// Images

import usePositionStore from "@/store";

// Icon
import useShownWhenOnScreen from "@/hooks/useShownWhenOnScreen";
import SmallLink from "../UI/SmallLink";
// import ProjectListPageSummary from "./ProjectListPageSummary";



export default function ProjectListPage() {
  const [selected, setSelected] = useState(-1);

  return (
    <div></div>
    // <div className="relative project-list-page py-6">
    //   <ProjectListContext.Provider value={{ selected, setSelected }}>
    //     <ProjectListGrid />
    //   </ProjectListContext.Provider>
    //   <div
    //     className={`description-page ${
    //       (selected > -1) ? "show-description" : ""
    //     }`}
    //   >
    //     <ProjectListPageSummary page={selected} />
    //   </div>
    // </div>
  );
}


