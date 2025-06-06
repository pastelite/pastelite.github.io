import useShownWhenOnScreen from "@/hooks/useShownWhenOnScreen";
import TextSVG from "../Atoms/TextSVG";

interface TextHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: string;
  drawingTimeSec?: number;
}

export default function TextHeader(
  {
    text,
    drawingTimeSec = 0.5,
    className,
    ...props
  }: TextHeaderProps,
) {
  // const [inRange, setInRange] = useState(false);
  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   if (scrollYToEndAnimation === -1) return;

  //   if (latest > scrollYToStartAnimation && latest < scrollYToEndAnimation) {
  //     setInRange(true);
  //   } else setInRange(false);
  // });

  let [ref, inRange] = useShownWhenOnScreen<HTMLDivElement>(0, 100);

  return (
    <div ref={ref} className={`text-header ${className}`} {...props}>
      <TextSVG
        drawedText={inRange}
        text={text}
        fontSize={100}
        drawingTimeSec={drawingTimeSec}
      />
    </div>
  );
}
