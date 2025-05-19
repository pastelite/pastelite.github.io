import { use, useLayoutEffect, useRef, useState } from "react";
import PasteliteSvg from "../assets/pastelite.svg?react";
import "./Name.style.css";
import useThrottleScroll from "../hooks/useThrottleScroll";
import { mappingNumber } from "../utils/number";
import { motion, useMotionValue, useTransform } from "motion/react";
import { animate } from "motion";
import { useElementSizeCSSVars } from "../hooks/useElementCSSVariable";

// how "p" in the title takes up entire title space
const pRatio = 0.12;
const menuBarWidth = 100;
const topLeftNameRatio = 0.3; // how much smaller the title is in the top left corner
const nameBackgroundWidth = 70


export default function Name() {
  const [top, setTop] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);
  // const [scale, setScale] = useState(1);
  // const calculatedTop = useRef(0); 
  // const top = useMotionValue(0);
  const scale = useMotionValue(1);
  // const yRaw = useMotionValue(0);
  // const y = useTransform([yRaw, top], ([vyRaw, vtop]) => `calc(${vtop}px + ${vyRaw}%)`);
  // const xRaw = useMotionValue(-50);
  // const screenWidth = useMotionValue(window.innerWidth);
  // const x = useTransform([screenWidth,xRaw], ([vwidth, v]) => `calc(${vwidth}px + ${v}%)`);
  const [hiding, setHiding] = useState(false);
  // const height = useMotionValue(160);

  let elementRef = useElementSizeCSSVars<HTMLDivElement>("name");
  // let svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (elementRef.current) {
      // setSvgWidth(elementRef.current.getBoundingClientRect().width);
      setSvgWidth(elementRef.current.offsetWidth);
    }
    console.log(svgWidth);
  }, []);

  useThrottleScroll(() => {
    // hiding title
    let limit = window.innerHeight * 0.5;

    if (window.scrollY > limit) {
      animate(scale, 1, { duration: 0.1, ease: "easeOut" });
      setHiding(true);
      return
    } else {
      if (hiding) setHiding(false);
    }

    // calculate scale
    let newScale = mappingNumber(
      1 - window.scrollY / window.innerHeight,
      0.8,
      1,
    );

    animate(scale, newScale, { duration: 0.2, ease: "easeOut" });
  });
  
  useLayoutEffect(() => {
    function handleResize() {
      let screenHeight = window.innerHeight;
      let titleHeight = (Math.round(screenHeight * 0.5 / 80) - 1) * 80;

      setTop(titleHeight);
      setScreenWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let pSize = svgWidth * pRatio;
  let leftOffset = menuBarWidth - pSize + 16; // 16 is margin

  return (
    <>
      <motion.div
        className={"title-name"+(hiding ? " to-top" : "")}
        animate={{
          height: hiding ? topLeftNameRatio * 180 : 180,
          top: hiding ? 0 : top,
          // use calc to reduce the "left" animation
          // /8 since the height is reduce from 180 to 60 (/2)
          // x: hiding ? `calc(0% + ${((menuBarWidth-(svgWidth*pRatio))/2) + svgWidth*pRatio/8}px)` : `calc(-50% + ${screenWidth / 2}px)`,
          x: hiding? `calc(0% + ${leftOffset}px)` : `calc(-50% + ${screenWidth / 2}px)`,
          // x: hiding? (menuBarWidth-(svgWidth*pRatio))/2 : -0.5*svgWidth + screenWidth/2,
          margin: hiding ? "20px 16px": 0,
          // paddingLeft: `calc(${pRatio} * (var(--name-width) - 2em))`,
          
        }}
        style={{
          scale: scale,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        ref={elementRef}
      >
        {/* The second div for the background. This is easier to be it's own thing but it's kinda need to inherit the position of the main text as well */}
        <div style={{
          height: hiding? nameBackgroundWidth : "100%",
          width: hiding? nameBackgroundWidth: "100%",
          position: "absolute",
          background: "gray",
          borderRadius: "25%",
          opacity: hiding? 1: 0,
          left: (menuBarWidth-nameBackgroundWidth)/2 - leftOffset - 16,
          top: "calc(50% + 10%)", // accounted for the weird p shape
          transform: "translateY(-50%)",
          transition: "all .2s ease-out"
        }}>

        </div>
        <PasteliteSvg style={{
          clipPath: hiding ? "polygon(0px 0px, 13% 0px, 10% 100%, 0px 100%)" 
          : "polygon(-10px -10px, 110% -10px, 110% 110%, -10px 110%)",
          transition: "clip-path .2s ease-out"
        }} />
      </motion.div>
    </>
  );
}
