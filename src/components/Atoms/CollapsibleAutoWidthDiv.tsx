import React, { useEffect } from "react";

interface CollapsibleAutoWidthDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export default function CollapsibleAutoWidthDiv(
  { collapsed = false, children, style, ...rest }: CollapsibleAutoWidthDivProps,
) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === innerRef.current) {
          let rect = entry.target.getBoundingClientRect();
          setWidth(rect.width);
          setHeight(rect.height);
          // setWidth(entry.);
          // setHeight(entry.contentRect.height);
        }
      }
    });

    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    return () => {
      if (innerRef.current) {
        observer.unobserve(innerRef.current);
      }
    };
  }, [collapsed]);

  return (
    <div
      style={{
        width: collapsed ? 0 : width,
        height: height,
        ...style
      }}
      {...rest}
    >
      <div style={{ position: "absolute" }} ref={innerRef} >
        {children}
      </div>
    </div>
  );
}
