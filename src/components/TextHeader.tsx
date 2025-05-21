import { useState } from "react";
import TextSVG from "./TextSVG"
import { useMotionValueEvent, useScroll } from "motion/react";

interface TextHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text: string
  scrollYToStartAnimation?: number,
  scrollYToEndAnimation?: number
}

export default function TextHeader({text, scrollYToStartAnimation=-1, scrollYToEndAnimation=-1}: TextHeaderProps) {
  const [inRange, setInRange] = useState(true);
  const {scrollY} = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollYToEndAnimation === -1) return;

    if (latest > scrollYToStartAnimation && latest < scrollYToEndAnimation) setInRange(true);
    else setInRange(false);
  })
  
  return <div className={"text-header"}>
    <TextSVG drawStroke={inRange} fill={inRange ? "#fff" : "#fff0"} text={text} fontSize={100} />
  </div>
}