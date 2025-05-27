import { useLayoutEffect, useRef } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import usePositionStore from "../store";
import { choosing } from "../utils/number";


interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pageIndex: number;
}

export default function PageContainer(
  { children, style, className = "", pageIndex = -1, ...props }:
    PageContainerProps,
) {
  let breakpoint = useBreakpoint([768, 1024]);

  const setPosition = usePositionStore((state) => state.setPosition);
  const pageRef = useRef<HTMLDivElement>(null);

  // measure width
  useLayoutEffect(() => {
    const handleResize = () => {
      if (pageRef.current) {
        let rect = pageRef.current.getBoundingClientRect();
        if (pageIndex >= 0) {
          setPosition(pageIndex, rect.top + window.scrollY);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className={`page-container ${className}`}
      style={{
        paddingLeft: choosing(breakpoint, [20, 120, 244]),
        paddingRight: 20,
        paddingTop: choosing(breakpoint, [100, 50]),
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
