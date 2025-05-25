interface RoundedRectangleSVGProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  borderRadius?: number;
  borderDrawed?: boolean;
  transitionDurationSec?: number;
}
const RoundedRectangleSVG: React.FC<RoundedRectangleSVGProps> = (

  {
    width = 1000,
    height = 300,
    borderRadius = 25,
    style,
    borderDrawed = false,
    preserveAspectRatio=false,
    transitionDurationSec=0.5,
    ...props
  },
) => {
  // Ensure border-radius doesn't exceed half of the smaller dimension
  const effectiveBorderRadius = Math.min(
    borderRadius,
    width / 2,
    height / 2,
  );

  const r = effectiveBorderRadius;

  // Path definition for a rounded rectangle
  // M: Move to
  // L: Line to
  // A: Arc
  const pathData = `
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

  return (
    <svg
      width={width}
      height={height}
      viewBox={`-1 -1 ${width + 1} ${height + 1}`}
      preserveAspectRatio={preserveAspectRatio ? "xMidYMid meet" : "none"}
      style={{
        overflow: "visible",
        ...style,
      }}
      {...props}
    >
      <path
        d={pathData}
        stroke="white"
        fill={"transparent"}
        style={{
          strokeDasharray: width * 2 + height * 2,
          strokeDashoffset: borderDrawed ? 0 : width * 2 + height * 2,
          transition: `stroke-dashoffset ${transitionDurationSec}s ease-out`,
        }}
      />
    </svg>
  );
};

export default RoundedRectangleSVG;
