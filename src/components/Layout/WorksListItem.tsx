import useBreakpoint from "@/hooks/useBreakpoint";
import useShownWhenOnScreen from "@/hooks/useShownWhenOnScreen";
import { WorksListContext } from "@/pages/WorksPage";
import usePositionStore from "@/store";
import { useContext, useState, type HTMLAttributes, type ReactNode } from "react";
import CollapsibleAutoWidthDiv from "@/components/UI/CollapsibleAutoWidthDiv";
import TopRightIcon from "@/assets/icons/arrow-top-right.svg?react";

interface ProjectListItemContainerProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
}

interface ProjectListItemProps {
  index: number;
  title?: string;
  children?: ReactNode;
  image?: string;
  linkText?: string;
  link?: string;
}


export default function ProjectListItem(
  { index, title, children: description, image, linkText, link }:
    ProjectListItemProps,
) {
  let { selected, setSelected } = useContext(WorksListContext);
  let pagePosition = usePositionStore((state) => state.position);
  let [hovered, setHovered] = useState(false);
  let breakpoint = useBreakpoint([768]);
  let [ref, inRange] = useShownWhenOnScreen<HTMLDivElement>(0, 0);

  function handleSelection(index: number) {
    if (index === selected) {
      setSelected(-1);
    } else if (selected === -1) {
      setSelected(index);
      if (breakpoint < 2) {
        window.scrollTo({
          top: pagePosition[1],
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <div
      className={`project-list-item ${selected === index ? "selected" : ""} ${
        inRange ? "show" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={ref}
    >
      <img src={image} onClick={() => handleSelection(index)}></img>
      <div className="project-name">
        {title}
        <a href={link}>
          <div className="link">
            <CollapsibleAutoWidthDiv className="link-text" collapsed={!hovered}>
              {linkText}
            </CollapsibleAutoWidthDiv>
            <TopRightIcon />
          </div>
        </a>
      </div>
      <div className="hover-description" onClick={() => handleSelection(index)}>
        {description}
      </div>
      <CollapsibleAutoWidthDiv
        className="back-button"
        collapsed={!(selected === index)}
      >
        {"<<< Back"}
      </CollapsibleAutoWidthDiv>
    </div>
  );
}