import { useState } from "react";
import TextSVG from "../Atoms/TextSVG";
import { useMotionValueEvent, useScroll } from "motion/react";

interface TextHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: string;
  scrollYToStartAnimation?: number;
  scrollYToEndAnimation?: number;
  drawingTimeSec?: number;
}

export default function TextHeader(
  {
    text,
    scrollYToStartAnimation = -1,
    scrollYToEndAnimation = -1,
    drawingTimeSec = 0.5,
    className,
    ...props
  }: TextHeaderProps,
) {
  const [inRange, setInRange] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollYToEndAnimation === -1) return;

    if (latest > scrollYToStartAnimation && latest < scrollYToEndAnimation) {
      setInRange(true);
    } else setInRange(false);
  });

  return (
    <div className={`text-header ${className}`} {...props}>
      <TextSVG
        drawedText={inRange}
        text={text}
        fontSize={100}
        drawingTimeSec={drawingTimeSec}
      />
    </div>
  );
}
