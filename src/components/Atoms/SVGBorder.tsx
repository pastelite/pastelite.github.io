import { useLayoutEffect, useRef, useState } from "react";

interface SVGBorder extends React.SVGProps<SVGSVGElement> {
  borderRadius?: number;
  drawBorder?: boolean;
}

export default function SVGBorder(
  { borderRadius = 0, drawBorder = true, stroke = "white", style, ...rest }: SVGBorder,
) {
  let svgRef = useRef<SVGSVGElement>(null);
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });

  // get parent width
  useLayoutEffect(() => {
    const parentElement = svgRef.current?.parentElement;
    if (!parentElement) return;

    const updateSize = () => {
      setSize({
        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
      });
    };

    updateSize(); // Initial size

    const observer = new ResizeObserver(() => {
      updateSize();
    });
    observer.observe(parentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // border radius
  const r = Math.min(
    borderRadius,
    width / 2,
    height / 2,
  );

  let pathD = `
    M ${r},0
    L ${width - r},0
    A ${r},${r} 0 0 1 ${width},${r}
    L ${width},${height - r}
    A ${r},${r} 0 0 1 ${width - r},${height}
    L ${r},${height}
    A ${r},${r} 0 0 1 0,${height - r}
    L 0,${r}
    A ${r},${r} 0 0 1 ${r},0
    Z
  `;

  let [strokeLength, setStrokeLength] = useState(0);

  // update strokeLength
  useLayoutEffect(() => {
    if (!svgRef.current) return;

    let pathElement = svgRef.current.querySelector("path");
    if (!pathElement) return;

    setStrokeLength(pathElement.getTotalLength());
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      stroke={stroke}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "visible",
        strokeDasharray: strokeLength,
        strokeDashoffset: drawBorder ? 0 : strokeLength,
        ...style,
      }}
      {...rest}
    >
      <path d={pathD} fill={"transparent"} />
    </svg>
  );
}
