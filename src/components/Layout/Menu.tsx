import AboutIcon from "@/assets/material_icons/person.svg?react";
import theme from "@/styles/theme";
import { useMotionValueEvent, useScroll } from "motion/react";
import { createContext, useRef, useState } from "react";
import ContactIcon from "../../assets/material_icons/contact_page.svg?react";
import WorksIcon from "../../assets/material_icons/work.svg?react";
import useBreakpoint from "../../hooks/useBreakpoint";
import usePositionStore from "../../store";
import { choosing } from "../../utils/number";
import CollapsibleAutoWidthDiv from "../UI/CollapsibleAutoWidthDiv";
import "./Menu.style.scss";

let MenuContext = createContext({
  isScrolling: false,
  setIsScrolling: (inp: boolean) => {},
});

interface MenuProps {
  menuBarWidth?: number;
}

const Menu = ({ menuBarWidth = 100 }: MenuProps) => {
  let breakpoint = useBreakpoint([768, 1024]);
  const [isScrolling, setIsScrolling] = useState(false);

  console.log("rerender!");

  let { titleButtonShow } = usePositionStore();

  const growMenu = (breakpoint === 2) && titleButtonShow;

  return (
    <MenuContext.Provider value={{ isScrolling, setIsScrolling }}>
      <div
        className="menu-bar"
        style={{
          display: "flex",
          flexDirection: choosing(breakpoint, ["row", "column"]),
          justifyContent: "center",
          alignItems: choosing(breakpoint, ["center", "stretch"]),
          padding: 15,
          gap: 15,
          transition: "all .3s cubic-bezier(0.5, 1, 0.89, 1)",
          ...choosing(breakpoint, [{
            left: titleButtonShow ? menuBarWidth : 0, // account for the home icon
            right: 0,
            bottom: 0,
            height: menuBarWidth,
          }, {
            width: growMenu ? 224 : menuBarWidth,
            left: 0,
            top: titleButtonShow ? menuBarWidth : 0,
            bottom: 0,
          }]),
        }}
      >
        <MenuItem
          pageIndex={0}
          SvgItem={AboutIcon}
          isExpanded={growMenu}
          text="About"
        >
        </MenuItem>
        <MenuItem
          pageIndex={1}
          SvgItem={WorksIcon}
          isExpanded={growMenu}
          text="Project"
        >
        </MenuItem>
        <MenuItem
          pageIndex={2}
          SvgItem={ContactIcon}
          isExpanded={growMenu}
          text="Contact"
        >
        </MenuItem>
      </div>
    </MenuContext.Provider>
  );
};

interface MenuItemProps {
  pageIndex: number;
  // children?: React.ReactNode;
  SvgItem: React.FC<React.SVGProps<SVGSVGElement>>;
  isExpanded?: boolean;
  text?: string;
}

function MenuItem(
  { pageIndex, SvgItem, isExpanded, text = "Menu Item" }: MenuItemProps,
) {
  const scrollToLocation = usePositionStore((state) => state.position);
  const { scrollY } = useScroll();
  const [selected, setSelected] = useState(false);
  let breakpoint = useBreakpoint([640, 768, 1024]);

  // when I select something, it shouldn't unselect during scrolling
  let selectionImmunityTimeout = useRef<NodeJS.Timeout>(null);
  // If I scrolling pass something briefly, it shouldn't show as selected
  let selectionDelayTimeout = useRef<NodeJS.Timeout>(null);

  // When user in mobile, it should be expanded if selected
  // if (breakpoint === 1) {
  //   isExpanded = selected;
  // }

  // let { isScrolling, setIsScrolling } = useContext(MenuContext);

  let { titleButtonShow } = usePositionStore();
  let showText = ((breakpoint === 3) && titleButtonShow) || (breakpoint === 1) && selected;

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    let nextScroll = (scrollToLocation.length > pageIndex + 1)
      ? scrollToLocation[pageIndex + 1] - (window.innerHeight / 2) + 1
      : Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );
    let currentScroll = (scrollToLocation.length > pageIndex)
      ? scrollToLocation[pageIndex]
      : 0;
    // console.log(
    //   pageIndex,
    //   scrollY,
    //   currentScroll - window.innerHeight / 2,
    //   nextScroll,
    // );
    if (
      scrollY >= (currentScroll - window.innerHeight / 2) &&
      scrollY <= nextScroll
    ) {
      // if (!isScrolling) setSelected(true);
      if (selectionDelayTimeout.current) {
        clearTimeout(selectionDelayTimeout.current);
      }
      selectionDelayTimeout.current = setTimeout(() => {
        setSelected(true);
        selectionDelayTimeout.current = null;
      }, 500);
    } else {
      if (selectionDelayTimeout.current) {
        clearTimeout(selectionDelayTimeout.current);
      }

      if (selectionImmunityTimeout.current == null) {
        setSelected(false);
      }
    }
  });

  return (
    <div
      className={`menu-item cursor-pointer ${
        selected ? "pressed" : ""
      } relative`}
      onClick={() => {
        if (scrollToLocation.length > pageIndex) {
          window.scrollTo({
            top: scrollToLocation[pageIndex],
            behavior: "smooth",
          });
          setSelected(true);
          selectionImmunityTimeout.current = setTimeout(() => {
            selectionImmunityTimeout.current = null;
          }, 800);
        }
      }}
      style={{
        ...choosing(breakpoint, [
          { width: selected ? 100 : 70 },
          { width: selected ? 150 : 70 },
          { height: selected ? 70 : 48 },
        ]),
        ...{ "--pill-color": theme.accentColor } as React.CSSProperties,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          height: 70,
          width: choosing(breakpoint, ["100%", 70, 70]), //70,
        }}
      >
        <SvgItem
          className=""
          fill="white"
          style={{ height: "40px", width: "40px" }}
        />
      </div>
      <div
        className="menu-text"
        style={{
          opacity: showText ? 1 : 0,
        }}
      >
        {text}
      </div>

      {
        /* <CollapsibleAutoWidthDiv
        className="relative overflow-hidden"
        collapsed={!isExpanded}
      >
        {text}
      </CollapsibleAutoWidthDiv> */
      }
    </div>
  );
}

export default Menu;
