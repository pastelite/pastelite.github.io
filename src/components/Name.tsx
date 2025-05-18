import { useLayoutEffect, useState } from "react";
import PasteliteSvg from "../assets/pastelite.svg?react";
import "./Name.style.css";
import useThrottleScroll from "../hooks/useThrottleScroll";
import { mappingNumber } from "../utils/number";
import { motion, useMotionValue } from "motion/react";
import { animate } from "motion";

const motionPasteliteSvg = motion(PasteliteSvg);

export default function Name() {
  const [top, setTop] = useState(0);
  // const [scale, setScale] = useState(1);
  const scale = useMotionValue(1);

  useThrottleScroll(() => {
    let newScale = mappingNumber(
      1 - window.scrollY / window.innerHeight,
      0.8,
      1,
    );

    animate(scale, newScale, { duration: 0.2, ease: "easeOut" });
    // setScale(newScale);
    // animate(scale, newScale, {duration: 0.2, ease: "easeOut"});
  });

  useLayoutEffect(() => {
    function handleResize() {
      let screenHeight = window.innerHeight;
      let titleHeight = (Math.round(screenHeight * 0.5 / 80) - 1) * 80;

      setTop(titleHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.div
        className="title-name"
        style={{
          scale: scale,
          x: "-50%",
          y: "10%",
          top: top,
        }}
        // animate={{ scale: scale, x: "-50%", y: "10%" }}
        // transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <PasteliteSvg />
      </motion.div>
    </>
  );
}
