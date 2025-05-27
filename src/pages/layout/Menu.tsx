import { useRef, useState } from "react";
import AboutIcon from "../../assets/material_icons/person.svg?react";
import ContactIcon from "../../assets/material_icons/contact_page.svg?react";
import WorksIcon from "../../assets/material_icons/work.svg?react";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useMotionValueEvent, useScroll } from "motion/react";
import usePositionStore from "../../store";
import { choosing } from "../../utils/number";
import useBreakpointNew from "../../hooks/useBreakpointNew";

interface MenuProps {
  menuBarWidth?: number;
}

const Menu = ({ menuBarWidth = 100 }: MenuProps) => {
  let breakpoint = useBreakpoint([768, 1024]);
  // let breakpoint = useBreakpointNew([768, 1024]);

  const [showLine, setShowLine] = useState(false);

  const { scrollY } = useScroll();

  const scrollToLocation = usePositionStore((state) => state.position);

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    setShowLine(scrollY > window.innerHeight / 2);
  });

  // const [growMenu, setGrowMenu] = useState(false);

  // if (breakpoint === 2 && growMenu === false) {
  //   setGrowMenu(true);
  // } else if ((breakpoint === 0 || breakpoint === 1) && growMenu === true) {
  //   setGrowMenu(false);
  // }

  const growMenu = (breakpoint === 2) && showLine;

  return (
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
          left: showLine ? menuBarWidth : 0, // account for the home icon
          right: 0,
          bottom: 0,
          height: menuBarWidth,
        }, {
          width: growMenu ? 224 : menuBarWidth,
          left: 0,
          top: showLine ? menuBarWidth : 0,
          bottom: 0,
        }]),
      }}
    >
      <div
        className="absolute bottom-0 -right-[1px] w-[1px] bg-white transition-all duration-300"
        style={{
          height: showLine ? "100vh" : "0",
        }}
      >
      </div>
      <MenuItem pageIndex={0} SvgItem={AboutIcon} isExpanded={growMenu} text="About">
        {
          /* <AboutIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        /> */
        }
      </MenuItem>
      <MenuItem pageIndex={1} SvgItem={WorksIcon} isExpanded={growMenu} text="Project">
        {
          /* <WorksIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        /> */
        }
      </MenuItem>
      <MenuItem pageIndex={2} SvgItem={ContactIcon} isExpanded={growMenu} text="Contact">
        {
          /* <ContactIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        /> */
        }
      </MenuItem>
    </div>
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
  // let breakpoint = useBreakpoint([768]);
  let breakpoint = useBreakpointNew([768]);
  // when I select something, it shouldn't unselect during scrolling
  let selectionImmunityTimeout = useRef<number | null>(null);
  // If I scrolling pass something briefly, it shouldn't show as selected
  let selectionDelayTimeout = useRef<number | null>(null);

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    console.log(scrollToLocation);
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
    console.log(
      pageIndex,
      scrollY,
      currentScroll - window.innerHeight / 2,
      nextScroll,
    );
    if (
      scrollY >= (currentScroll - window.innerHeight / 2) &&
      scrollY <= nextScroll
    ) {
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
            // setSelected(false);
            selectionImmunityTimeout.current = null;
          }, 500);
        }
      }}
      style={{
        ...breakpoint({ width: selected ? 100 : 70 }, {
          height: selected ? 70 : 48,
        }),
        ...{ "--pill-color": "#00c5fc" } as React.CSSProperties,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          height: 70,
          width: 70,
        }}
      >
        <SvgItem
          className=""
          fill="white"
          style={{ height: "40px", width: "40px" }}
        />
      </div>

      <div
        className="text-nowrap overflow-hidden transition-all duration-300 text-left"
        style={{
          flexGrow: isExpanded ? 1 : 0,
          width: 0,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default Menu;
