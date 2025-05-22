import { Font, load, Path as OpentypePath } from "opentype.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import RobotoSlabMedium from "../assets/fonts/RobotoSlab-Medium.ttf";
import { path } from "motion/react-client";
import { motion } from "motion/react";

interface TextSVGProps extends React.SVGProps<SVGSVGElement> {
  text: string;
  fontSize?: number;
  drawStroke?: boolean;
}

export default function TextSVG(
  {
    text,
    fontSize = 50,
    className,
    style,
    fill,
    stroke,
    drawStroke = true,
    ...props
  }: TextSVGProps,
) {
  const fontRef = useRef<Font | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pathData, setPathData] = useState<string[]>([]); // Changed to store pathData directly
  const [pathLength, setPathLength] = useState<number[]>([]);

  useEffect(() => {
    load(RobotoSlabMedium).then((font) => {
      if (font) {
        fontRef.current = font;
      }
    }).then(() => {
      if (fontRef.current && svgRef.current) {
        // const fontSize = 50;
        // // Calculate a reasonable starting position for the text
        // // You might want to adjust these values based on your specific layout needs
        // const x = 0; // A small offset from the left edge
        // const y = fontSize; // Place the baseline at the font size, so it's visible within the height

        // Get the path for the text
        const textPath = fontRef.current.getPaths(
          text,
          0,
          0.9 * fontSize,
          fontSize,
        );
        const pathData = textPath.map((p) => p.toPathData(2));
        setPathData(pathData);
      }
    }).catch((err) => {
      console.error(err);
    });
  }, [text]);

  // calculate width
  useLayoutEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current;
      let leftMost = Infinity;
      let rightMost = -Infinity;
      let pathLengthes = [];
      for (let elem of svgElement.children) {
        if (!(elem instanceof SVGPathElement)) continue;
        const rect = elem.getBoundingClientRect();
        const pathLength = elem.getTotalLength();
        pathLengthes.push(pathLength);
        leftMost = Math.min(leftMost, rect.left);
        rightMost = Math.max(rightMost, rect.right);
      }

      const width = Math.max(0, rightMost - leftMost);
      svgElement.setAttribute("width", `${width}px`);

      setPathLength(pathLengthes);
    }
  }, [pathData]);

  return (
    <svg
      ref={svgRef}
      height={fontSize}
      style={{ overflow: "visible", ...style }}
      className={`${className || ""}`}
    >
      {pathData.map((d, i) => (
        <path
          key={i}
          d={d}
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
              "--path-length": pathLength[i],
            } as React.CSSProperties,
          }}
        />
      ))}

      {/* {pathData && <path id="testpath" d={pathData} fill="black" />} */}
    </svg>
  );
}
