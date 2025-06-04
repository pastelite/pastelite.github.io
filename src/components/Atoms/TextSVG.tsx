import { BoundingBox, Font, load, Path as OpentypePath } from "opentype.js";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import RobotoSlabMedium from "@/assets/fonts/RobotoSlab-Medium.ttf";
import { motion } from "motion/react";

interface TextSVGProps extends React.SVGProps<SVGSVGElement> {
  text: string;
  fontSize?: number;
  font?: string;
  drawedText?: boolean;
  drawingTimeSec?: number;
  pathStyle?: React.CSSProperties;
  pathDataCallback?: (pathData: OpentypePath[]) => void;
}

export default function TextSVG(
  {
    text,
    fontSize = 50,
    style,
    pathStyle,
    fill,
    stroke,
    ref,
    font = RobotoSlabMedium,
    drawedText = true,
    drawingTimeSec = 0.5,
    pathDataCallback,
    ...props
  }: TextSVGProps,
) {
  const fontRef = useRef<Font | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pathData, setPathData] = useState<OpentypePath[]>([]);
  const [pathLength, setPathLength] = useState<number[]>([]);
  const [animatingStroke, setAnimatingStroke] = useState<boolean>(false);

  // get font path
  useLayoutEffect(() => {
    load(font).then((font) => {
      if (font) {
        fontRef.current = font;
      }
    }).then(() => {
      if (fontRef.current && svgRef.current) {
        // Get the path for the text
        const textPath = fontRef.current.getPaths(
          text,
          0,
          0.9 * fontSize, // reserve 0.1 for the unline line stuff (like p,j,q)
          fontSize,
        );
        setPathData(textPath);
      }
    }).catch((err) => {
      console.error(err);
    });
  }, [text]);

  // calculate width
  useLayoutEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current;

      // calculate path lengthes
      let pathLengthes = [];
      for (let elem of svgElement.children) {
        if (!(elem instanceof SVGPathElement)) continue;
        const pathLength = elem.getTotalLength();
        pathLengthes.push(pathLength);
      }

      // calculate svg width
      let leftMostPath = Infinity;
      let rightMostPath = -Infinity;
      for (let elem of pathData) {
        const rect = elem.getBoundingBox();
        leftMostPath = Math.min(leftMostPath, rect.x1);
        rightMostPath = Math.max(rightMostPath, rect.x2);
      }

      const newWidth = Math.max(0, rightMostPath - leftMostPath);
      svgElement.setAttribute("width", `${newWidth}px`);
      svgElement.setAttribute("viewBox", `0 0 ${newWidth} ${fontSize}`);

      // title needed it. I know it's look like shit but if it works dont fix it
      if (pathDataCallback) {
        pathDataCallback(pathData);
      }

      setPathLength(pathLengthes);
    }
  }, [pathData]);

  // delay animation so the pathlength stuff can be set without the transition
  useEffect(() => {
    if (pathLength.length > 0) {
      setAnimatingStroke(true);
    }
  }, [pathLength]);

  const generateTransition = useMemo(() => {
    return (i: number) => {
      let timePerPath = drawingTimeSec / text.length;
      let strokeDelay = i * timePerPath;
      let fillDelay = drawedText ? drawingTimeSec * 2 : 0;
      // return `stroke-dashoffset ${drawingTimeSec}s ease-in-out ${strokeDelay}, fill ${drawingTimeSec}s ease-in-out ${fillDelay}`;
      return animatingStroke
        ? `stroke-dashoffset ${drawingTimeSec}s ease-in-out ${strokeDelay}s, fill-opacity 0.2s ease-in-out ${fillDelay}s, opacity 0.2s ease-in-out`
        : `stroke-dashoffset 0s ease 0s, fill-opacity 0s ease 0s, opacity 0.2s ease-in-out`; // Safe fallback
    };
  }, [animatingStroke, drawingTimeSec, text, drawedText]);

  return (
    <svg
      ref={(node) => {
        if (node) {
          svgRef.current = node;
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref.hasOwnProperty("current")) {
              (ref as React.RefObject<SVGSVGElement | null>).current = node;
            }
          }
        }
      }}
      fill={fill || "white"}
      stroke={stroke || "white"}
      height={fontSize}
      style={{ overflow: "visible", ...style }}
      {...props}
    >
      {pathData.map((d, i) => (
        <path
          key={i}
          d={d.toPathData(2)}
          fillOpacity={drawedText ? 1 : 0}
          // fill={fill || drawedText ? "white" : "transparent"}
          // stroke={stroke || "white"}
          style={{
            strokeWidth: 1,
            strokeDasharray: pathLength[i],
            strokeDashoffset: drawedText ? 0 : pathLength[i],
            // delay animation because it will make it looks better
            // ${0.5 + i * 0.05}
            transition: generateTransition(i),
            ...pathStyle,
          }}
        />
      ))}
    </svg>
  );
}
