import { useState } from "react";
import AboutIcon from "../../assets/material_icons/person.svg?react";
import ContactIcon from "../../assets/material_icons/contact_page.svg?react";
import WorksIcon from "../../assets/material_icons/work.svg?react";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useMotionValueEvent, useScroll } from "motion/react";
import usePositionStore from "../../store";
import { choosing } from "../../utils/number";

interface MenuProps {
  menuBarWidth?: number;
}

const Menu = ({ menuBarWidth = 100 }: MenuProps) => {
  let breakpoint = useBreakpoint([768]);

  const [showLine, setShowLine] = useState(false);

  const { scrollY } = useScroll();

  const scrollToLocation = usePositionStore((state) => state.position);

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    setShowLine(scrollY > window.innerHeight / 2);
  });

  return (
    <div
      className="menu-bar"
      style={{
        display: "flex",
        flexDirection: choosing(breakpoint, ["row", "column"]),
        justifyContent: "center",
        alignItems: "stretch",
        padding: 15,
        gap: 15,
        ...choosing(breakpoint, [{
          left: 0,
          right: 0,
          bottom: 0,
          height: menuBarWidth,
        }, {
          width: menuBarWidth,
          left: 0,
          top: 0,
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
      <MenuItem pageIndex={0}>
        <AboutIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        />
      </MenuItem>
      <MenuItem pageIndex={1}>
        <WorksIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        />
      </MenuItem>
      <MenuItem pageIndex={2}>
        <ContactIcon
          fill="white"
          style={{ height: "40px", width: "max-content" }}
        />
      </MenuItem>
    </div>
  );
};

interface MenuItemProps {
  pageIndex: number;
  children?: React.ReactNode;
}

function MenuItem({ pageIndex, children }: MenuItemProps) {
  const scrollToLocation = usePositionStore((state) => state.position);
  const { scrollY } = useScroll();
  const [selected, setSelected] = useState(false);
  let breakpoint = useBreakpoint([768]);

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    console.log(scrollToLocation);
    let nextScroll = (scrollToLocation.length > pageIndex + 1)
      ? scrollToLocation[pageIndex + 1] - window.innerHeight / 2
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
      setSelected(true);
    } else {
      setSelected(false);
    }
  });

  return (
    <div
      className={`menu-item cursor-pointer ${selected ? "pressed" : ""} `}
      onClick={() => {
        if (scrollToLocation.length > pageIndex) {
          window.scrollTo({
            top: scrollToLocation[pageIndex],
            behavior: "smooth",
          });
        }
      }}
      style={{
        ...choosing(breakpoint, [{ width: selected ? 100 : 70 }, {
          height: selected ? 70 : 48,
        }]),
        ...{ "--pill-color": "#00c5fc" } as React.CSSProperties,
      }}
    >
      {children}
    </div>
  );
}

export default Menu;
