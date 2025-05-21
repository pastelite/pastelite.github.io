import { useEffect, useLayoutEffect, useState } from "react";
import TextCorouselNew from "./TextCorouselNew";
import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import useThrottleScroll from "../hooks/useThrottleScroll";
import { mappingNumber, mappingNumberPoint } from "../utils/number";

export default function TextCorouselBackground() {
  let [screenHeight, setScreenHeight] = useState(0);
  let [corouselList, setCorouselList] = useState<
    { "height": number; "speed": number }[]
  >([]);
  // let [scrollTop, setScrollTop] = useState(0);
  let scaleValue = useMotionValue(0);
  let opacityValue = useMotionValue(0);
  let blurValue = useMotionValue(0);
  let blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);
  let [scope, animate] = useAnimate();
  let [disableAnimation, setDisableAnimation] = useState(false);

  // screen size
  useLayoutEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useThrottleScroll(()=>{
    if (window.scrollY>window.innerHeight) {
      setDisableAnimation(true);
      return;
    };

    setDisableAnimation(false);

    let scale = mappingNumber(1 - window.scrollY / window.innerHeight, 0.5, 1);
    // let opacity = mappingNumber(1 - window.scrollY / window.innerHeight, 0, 1);
    let opacity = mappingNumberPoint(window.scrollY / window.innerHeight, [0.2,1],[0.5,0]);
    let blur = mappingNumber(1 - window.scrollY / window.innerHeight, 5, 0);

    animate(scaleValue, scale, {
      duration: 0.2,
      ease: "easeOut",
    })
    animate(opacityValue, opacity, {
      duration: 0.2,
      ease: "easeOut",
    })
    animate(blurValue, blur, {
      duration: 0.2,
      ease: "easeOut",
    })
  })

  // initialized corousels
  useEffect(() => {
    if (screenHeight === 0) return;

    let corouselHeight = corouselList.reduce(
      (acc, curr) => acc + curr.height,
      0,
    );
    let numToAdd = Math.ceil((screenHeight - corouselHeight) / 80);
    console.log(numToAdd);
    if (numToAdd === 0) return;

    if (numToAdd > 0) {
      let newCorousels = [];
      for (let i = 0; i < numToAdd; i++) {
        newCorousels.push({
          height: 80,
          speed: (Math.floor(Math.random() * 100) + 50) *
            ((corouselList.length + i) % 2 ? -1 : 1),
          // speed: 0,
        });
      }
      setCorouselList((corouselList) => [...corouselList, ...newCorousels]);
    }
    if (numToAdd < 0) {
      setCorouselList((corouselList) =>
        corouselList.slice(0, corouselList.length + numToAdd)
      );
    }

    console.log(corouselList);
  }, [screenHeight]);

  return (
    <motion.div
      className="text-corousel-background"
      style={{
        scale: scaleValue,
        opacity: opacityValue,
        filter: blurFilter,
      }}
      ref={scope}
    >
      {corouselList.map((corousel, index) => (
        <TextCorouselNew
          key={index}
          gap={10}
          style={{
            height: `${corousel.height}px`,
          }}
          speed={disableAnimation ? 0 : corousel.speed}
        />
      ))}
    </motion.div>
  );
}
