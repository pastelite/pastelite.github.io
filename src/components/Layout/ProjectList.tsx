import useBreakpoint from "@/hooks/useBreakpoint";
import "./ProjectList.style.scss";
import { choosing } from "@/utils/number";
import type React from "react";

interface ProjectListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  numberOfColumns?: number;
}

export default function ProjectList(
  { children, className, numberOfColumns=3, ...rest }: ProjectListProps,
) {

  return (
    <div
      // className={choosing(breakpoint, [
      //   "project-list-1",
      //   "project-list-2",
      //   "project-list-3",
      // ]) + " relative " + (className || "")}
      className={`project-list-${numberOfColumns} relative ${className || ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
