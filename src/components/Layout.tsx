import { motion, useMotionValue, useTransform } from "motion/react";
import "./Layout.style.css";
import useThrottleScroll from "../hooks/useThrottleScroll";
import { mappingNumber, mappingNumberPoint } from "../utils/number";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const topBarHeight = 50;
  const menuBarWidth = 100;

  const colorValue = useMotionValue(0);
  const colorTransform = useTransform(colorValue, [0, 1], [
    "#0b0b0b",
    "rgb(40, 45, 50)",
  ]);

  const [showLine, setShowLine] = useState(false);

  useThrottleScroll((scrollY) => {
    // let color = mappingNumber(scrollY / window.innerHeight, 0, 1);
    let color = mappingNumberPoint(scrollY / window.innerHeight, [0, 0], [
      0.3,
      0,
    ], [1, 1]);
    colorValue.set(color);

    setShowLine(scrollY > window.innerHeight);
  });

  return (
    <>
      {/* This is for background color */}
      <motion.div
        className="background-color"
        style={{ backgroundColor: colorTransform }}
      >
      </motion.div>
      <div
        className="top-bar"
        style={{ left: menuBarWidth, height: topBarHeight }}
      >
      </div>
      <div
        className="menu-bar"
        style={{
          width: menuBarWidth,
          // borderRight: `1px solid ${showLine ? "#fff" : "#000"}`,
          // height: `calc(100vh - ${topBarHeight}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "#fff8",
            scale: `1 ${showLine ? 1 : 0}`,
            transformOrigin: "bottom",
            transition: "scale .5s ease-in-out",
          }}
        >
        </div>
        <div>Test</div>
        <div>Test2</div>
        <div>Test3</div>
      </div>
      <div className="content" style={{ left: 0, top: `calc(100vh)` }}>
        {children}
      </div>
    </>
  );
}
