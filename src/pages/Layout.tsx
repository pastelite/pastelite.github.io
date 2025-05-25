import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import "./Layout.style.css";
import useThrottleScroll from "../hooks/useThrottleScroll";
import { choosing, mappingNumber, mappingNumberPoint } from "../utils/number";
import { useState } from "react";
import BetterName from "../components/BetterName";
import useBreakpoint from "../hooks/useBreakpoint";
import ContactList from "./layout/ContactList";
import usePositionStore from "../store";
import AboutIcon from "../assets/material_icons/person.svg?react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const topBarHeight = 50;
  const topBarHeightSmall = 100;
  const menuBarWidth = 100;

  const colorValue = useMotionValue(0);
  const colorTransform = useTransform(colorValue, [0, 1], [
    "#0b0b0b",
    "rgb(40, 45, 50)",
  ]);

  const [showLine, setShowLine] = useState(false);

  const { scrollY } = useScroll();

  const scrollToLocation = usePositionStore((state) => state.position);

  useMotionValueEvent(scrollY, "change", (scrollY) => {
    let color = mappingNumberPoint(scrollY / window.innerHeight, [0, 0], [
      0.3,
      0,
    ], [1, 1]);
    colorValue.set(color);

    setShowLine(scrollY > window.innerHeight / 2);
  });

  // useThrottleScroll((scrollY) => {
  //   // let color = mappingNumber(scrollY / window.innerHeight, 0, 1);
  //   let color = mappingNumberPoint(scrollY / window.innerHeight, [0, 0], [
  //     0.3,
  //     0,
  //   ], [1, 1]);
  //   colorValue.set(color);

  //   setShowLine(scrollY > window.innerHeight);
  // });

  let breakpoint = useBreakpoint([768]);

  return (
    <>
      <div
        className="fixed top-0 right-0 z-20 flex flex-row items-center justify-end pr-4"
        style={{
          left: menuBarWidth,
          height: [topBarHeightSmall, topBarHeight][breakpoint],
        }}
      >
        <ContactList />
      </div>
      <div
        className="menu-bar"
        style={{
          display: "flex",
          // flexDirection: "column",
          // flexDirection: ["row","column"][breakpoint],
          flexDirection: choosing(breakpoint, ["row", "column"]),
          justifyContent: "center",
          alignItems: "center",
          // ...[{},{width: menuBarWidth}][breakpoint]
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
          className="absolute bottom-0 right-0 w-[1px] bg-white transition-all duration-300"
          style={{
            height: showLine ? "100vh" : "0",
          }}
        >
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: scrollToLocation[0], behavior: "smooth" })}
        >
          <AboutIcon fill="white" style={{height: "40px", width: "max-content"}}/>
        </div>
        <div>Test2</div>
        <div>Test3</div>
      </div>
      <div className="content" style={{ left: 0, top: `calc(100vh)` }}>
        {children}
      </div>
      <BetterName />
    </>
  );
}
