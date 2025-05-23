import { BoundingBox, Font, load, Path as OpentypePath } from "opentype.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import RobotoSlabMedium from "../assets/fonts/RobotoSlab-Medium.ttf";
import { path } from "motion/react-client";
import { motion } from "motion/react";

interface TextSVGProps extends React.SVGProps<SVGSVGElement> {
  text: string;
  fontSize?: number;
  drawStroke?: boolean;
  boudingBoxCallback?: (list: BoundingBox[], width: number) => void
}

export default function TextSVG(
  {
    text,
    fontSize = 50,
    className,
    style,
    fill,
    stroke,
    drawStroke = false,
    ref,
    boudingBoxCallback,
    ...props
  }: TextSVGProps,
) {
  const fontRef = useRef<Font | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pathData, setPathData] = useState<OpentypePath[]>([]);
  const [pathLength, setPathLength] = useState<number[]>([]);

  useLayoutEffect(() => {
    load(RobotoSlabMedium).then((font) => {
      if (font) {
        fontRef.current = font;
      }
    }).then(() => {
      if (fontRef.current && svgRef.current) {
       // Get the path for the text
        const textPath = fontRef.current.getPaths(
          text,
          0,
          0.9 * fontSize,
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

      let leftMostPath = Infinity;
      let rightMostPath = -Infinity;
      let boundingBox = []
      for (let elem of pathData) {
        const rect = elem.getBoundingBox()
        boundingBox.push(rect)
        leftMostPath = Math.min(leftMostPath, rect.x1);
        rightMostPath = Math.max(rightMostPath, rect.x2);
      }

      const newWidth = Math.max(0, rightMostPath - leftMostPath);
      svgElement.setAttribute("width", `${newWidth}px`);
      svgElement.setAttribute("viewBox", `0 0 ${newWidth} ${fontSize}`);

      // title needed it. I know it's look like shit but if it works dont fix it
      if (boudingBoxCallback) {
        boudingBoxCallback(boundingBox, newWidth);
      }

      setPathLength(pathLengthes);
    }
  }, [pathData]);

  return (
    <svg
      ref={(node)=>{
        if (node) {
          svgRef.current = node;
          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref.hasOwnProperty('current')) {
              (ref as React.RefObject<SVGSVGElement | null>).current = node;
            }
          }
        }
      }}
      height={fontSize}
      style={{ overflow: "visible", ...style }}
      className={`${className || ""}`}
    >
      {pathData.map((d, i) => (
        <path
          key={i}
          d={d.toPathData(2)}
          fill={fill || "white"}
          stroke={stroke || "white"}
          style={{
            strokeWidth: 1,
            strokeDashoffset: drawStroke ? 0 : pathLength[i],
            strokeDasharray: pathLength[i],
            transition: `stroke-dashoffset 0.5s ease-in-out ${
              i * 0.05
            }s, fill 0.2s ease-in-out ${0.5 + pathData.length * 0.05}s`, //${0.5 + i * 0.05}
            ...{
              "--item-number": i,
              "--path-length": pathData[i],
            } as React.CSSProperties,
          }}
        />
      ))}
    </svg>
  );
}
