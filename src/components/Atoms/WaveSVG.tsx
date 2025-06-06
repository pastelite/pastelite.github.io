import { type ReactNode, useEffect, useRef } from "react";

function calculateSinOutput(
  startPhase: number,
  wavelength: number,
  amplitude: number,
  period: number,
  x: number,
  t: number,
) {
  return amplitude *
    Math.sin(
      startPhase * (2 * Math.PI) + (2 * Math.PI / wavelength) * x +
        (2 * Math.PI / period) * t,
    );
}

// NOTE: no bottom stuff, just the sin function
function getSinPathes(
  baseY: number,
  width: number,
  height: number,
  startPhase: number,
  wavelength: number,
  amplitude: number,
  period: number,
  currentTime: number,
) {
  const path: [number, number][] = [];
  path.push([
    0,
    baseY +
    calculateSinOutput(
      startPhase,
      wavelength,
      amplitude,
      period,
      0,
      currentTime,
    ),
  ]);

  for (let i = 0; i <= width + 1; i++) {
    const y = baseY +
      calculateSinOutput(
        startPhase,
        wavelength,
        amplitude,
        period,
        i,
        currentTime,
      );
    // path.push(`L ${i} ${y}`);
    path.push([i, y]);
  }
  // path.push(`L ${width} ${height} L ${0} ${height} Z`);
  // return path.join(" ");

  return path;
}

interface ReverseWaveSVGProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: number;
  children?: ReactNode;
}

export default function ReverseWaveDiv(
  { level = 0.5, className, style, children, ...props }: ReverseWaveSVGProps,
) {
  const canvasRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  // const level = 0.7;

  function draw(currentTime: number) {
    const path1 = getSinPathes(
      100 - (level * 100),
      100,
      100,
      0.25,
      66,
      2,
      1.5,
      currentTime,
    );
    const path2 = getSinPathes(
      100 - (level * 100),
      100,
      100,
      0.1,
      45,
      1.5,
      2,
      currentTime,
    );
    // const path3 = getSinPathes(
    //   100 - (level * 100),
    //   100,
    //   100,
    //   0.5,
    //   55,
    //   1,
    //   2.5,
    //   currentTime,
    // );
    const path = path1.map((
      path1,
      i,
    ) => [path1[0], (path1[1] + path2[i][1]) / 2]);

    path.push([101, 0]);
    path.push([0, 0]);

    // let d = path.reduce((acc, curr, index) => {
    //   if (index === 0) {
    //     return `M ${curr[0]} ${curr[1]}`;
    //   } else {
    //     return `${acc} L ${curr[0]} ${curr[1]}`;
    //   }
    // }, "");

    // d += " Z";

    // let clipPath = path.reduce((acc, curr, index) => {
    //   // if (index === 0) {
    //   //   return `M ${curr[0]} ${curr[1]}`;
    //   // } else {
    //   //   return `${acc} L ${curr[0]} ${curr[1]}`;
    //   // }
    //   return ``
    // }, "");
    let clipPath = path.map((path) => {
      return `${path[0]}% ${path[1]}%`;
    });

    // canvasRef.current!.setAttribute("d", d);
    divRef.current!.style.clipPath = `polygon(${clipPath.join(", ")})`;
  }

  const lastTimeStamp = useRef(0);

  useEffect(() => {
    let currentTime = 0;
    let animationFrameId: number;

    const render = (timestamp: DOMHighResTimeStamp) => {
      const deltaTime = timestamp - lastTimeStamp.current;
      currentTime += deltaTime / 1000;
      lastTimeStamp.current = timestamp;
      draw(currentTime);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`${className || ""}`}
      ref={divRef}
      style={{
        // backdropFilter: "grayscale(80%) brightness(40%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
