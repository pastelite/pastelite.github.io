// What is this?
// My works page need a way to animate item moving which is a pain to do because of relative/absolute stuff
// 1. setting item as absolute will make flexbox remove the space for that item
// 2. grid absolute did not bring thing to the place as i expected, and i need to add row: and column:

import type { CSSProperties } from "react";
import React from "react";
import "./AbsoluteGrid.style.scss";

interface AbsoluteGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  numColumns?: number;
}
export default function AbsoluteGrid(
  { children, gap = 10, numColumns = 2, className, style, ...props }:
    AbsoluteGridProps,
) {
  const numChildren = React.Children.count(children);

  return (
    <div
      className={`absolute-grid-${numColumns} ${className || ""}`}
      style={{
        "--gap": `${gap}px`,
        "--num-rows": Math.ceil(numChildren / numColumns),
        ...style,
      } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
