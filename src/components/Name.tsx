import { useLayoutEffect, useRef, useState } from "react";
import PasteliteSvg from "../assets/pastelite.svg?react";
import "./Name.style.css";
import { mappingNumber } from "../utils/number";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { animate } from "motion";

// how "p" in the title takes up entire title space
const pRatio = 0.115;
const menuBarWidth = 100;
const topLeftNameRatio = 0.3; // how much smaller the title is in the top left corner
const nameBackgroundWidth = 70;
const animateDelay = 500;

export default function Name() {
  const [top, setTop] = useState(240);
  const [screenWidth, setScreenWidth] = useState(1280);
  const [svgWidthHeightRatio, setSvgWidthHeightRatio] = useState(0);
  const scale = useMotionValue(1);
  const [hiding, setHiding] = useState(false);
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  let svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (svgRef.current) {
      let svgWidthHeightRatio = svgRef.current.width.animVal.value / svgRef.current.height.animVal.value
      setSvgWidthHeightRatio(svgWidthHeightRatio);
    }

    // delay animation
    setTimeout(() => {
      setReadyToAnimate(true);
    }, animateDelay);
  }, []);

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

  let {scrollY} = useScroll();

  useMotionValueEvent(scrollY, "change", (scroll) => {
    let limit = window.innerHeight * 0.5;

    if (scroll > limit) {
      animate(scale, 1, { duration: 0.1, ease: "easeOut" });
      setHiding(true);
      return;
    } else {
      if (hiding) setHiding(false);
    }

    // scale
    let newScale = mappingNumber(
      1 - scroll / window.innerHeight,
      0.8,
      1,
    );

    animate(
      scale,  newScale, { duration: 0.2, ease: "easeOut" }
    );
  });

  

  // useThrottleScroll(() => {
  //   // hiding title
  //   let limit = window.innerHeight * 0.5;

  //   if (window.scrollY > limit) {
  //     animate(scale, 1, { duration: 0.1, ease: "easeOut" });
  //     setHiding(true);
  //     return;
  //   } else {
  //     if (hiding) setHiding(false);
  //   }

  //   // calculate scale
  //   let newScale = mappingNumber(
  //     1 - window.scrollY / window.innerHeight,
  //     0.8,
  //     1,
  //   );

  //   animate(scale, newScale, { duration: 0.2, ease: "easeOut" });
  // });

  let presumedSvgWidth = 160 * svgWidthHeightRatio;
  let pSize = presumedSvgWidth * pRatio;
  let leftOffset = menuBarWidth - pSize + 16; // 16 is margin

  return (
    <>
      <motion.div
        className={"title-name" + (hiding ? " to-top" : "")}
        animate={{
          height: hiding ? topLeftNameRatio * 160 : 160,
          top: hiding ? 0 : top,
          // use calc to reduce the "left" animation
          // /8 since the height is reduce from 180 to 60 (/2)
          // x: hiding ? `calc(0% + ${((menuBarWidth-(svgWidth*pRatio))/2) + svgWidth*pRatio/8}px)` : `calc(-50% + ${screenWidth / 2}px)`,
          x: hiding
            ? `calc(0% + ${leftOffset}px)`
            : `calc(-50% + ${screenWidth / 2}px)`,
          // x: hiding? (menuBarWidth-(svgWidth*pRatio))/2 : -0.5*svgWidth + screenWidth/2,
          margin: hiding ? "20px 16px" : 0,
          // paddingLeft: `calc(${pRatio} * (var(--name-width) - 2em))`,
        }}
        style={{
          scale: scale,
        }}
        transition={{ duration: readyToAnimate ? 0.2 : 0, ease: "easeOut" }}
      >
        {/* The second div for the background. This is easier to be it's own thing but it's kinda need to inherit the position of the main text as well */}
        <motion.div
          className="title-name-background"
          animate={{
            height: hiding ? nameBackgroundWidth : "100%",
            width: hiding ? nameBackgroundWidth : "100%",
            position: "absolute",
            background: "var(--color-first-background)",
            borderRadius: hiding ? nameBackgroundWidth * 0.25 : 180 * 0.25,
            opacity: hiding ? 1 : 0,
            left: (menuBarWidth - nameBackgroundWidth) / 2 - leftOffset - 16,
            top: "calc(50% + 10%)", // accounted for the weird p shape
            transform: "translateY(-50%)",
            scale: hiding ? 1 : 1.2,
          }}
          transition={{ duration: readyToAnimate ? 0.2 : 0, ease: "easeOut" }}
          onClick={() => {
            animate(window.scrollY, 0, {
              duration: 0.3, // Adjust duration as needed
              ease: "easeOut",
              onUpdate: (latest) => {
                window.scrollTo({
                  top: latest,
                  behavior: "instant",
                });
              }
            });
            // window.scrollTo({
            //   top: 0,
            //   behavior: "instant", // I want to fix this shit so hard
            // });
          }}
        >
        </motion.div>
        <PasteliteSvg
          style={{
            clipPath: hiding
              ? "polygon(0px 0px, 13% 0px, 10% 100%, 0px 100%)"
              : "polygon(-10px -10px, 110% -10px, 110% 110%, -10px 110%)",
            transition: `clip-path ${readyToAnimate ? 0.2 : 0}s ease-out`,
          }}
          ref={svgRef}
        />
      </motion.div>
    </>
  );
}
