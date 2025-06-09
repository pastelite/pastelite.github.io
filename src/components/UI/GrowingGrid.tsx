import useBreakpoint from "@/hooks/useBreakpoint";
import { useEffect, useState } from "react";

function devideArrayByColumn<T>(array: T[], col: number): T[][] {
  let arrays: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    let row = Math.floor(i / col);

    if (arrays.length < row + 1) {
      arrays.push([]);
    }

    arrays[row].push(array[i]);
  }

  return arrays;
}


interface GrowingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  gap?: number;
}

export default function GrowingGrid(
  { children: items, gap = 10, className, style, ...props }: GrowingGridProps,
) {
  const [numColumn, setNumColumn] = useState(3);
  const breakpoint = useBreakpoint([768, 1024]);
  useEffect(() => {
    if (breakpoint == 0) {
      setNumColumn(1);
    } else if (breakpoint == 1) {
      setNumColumn(2);
    } else {
      setNumColumn(3);
    }
  }, [breakpoint]);

  const [currentCol, setCurrentCol] = useState(-1);

  return (
    <div
      className={`flex flex-col w-full ${className || ""}`}
      style={{
        gap: gap,
        ...style,
      }}
      {...props}
    >
      {devideArrayByColumn(items, numColumn).map((rows, rowIndex) => {
        return (
          <div
            className="flex w-full grow-2 hover:grow-3 shrink-1 basis-0 transition-all duration-200 overflow-hidden"
            style={{
              gap: gap,
            }}
          >
            {rows.map((item, colIndex) => {
              return (
                <div
                  className="basis-0 transition-all duration-200 overflow-hidden"
                  onMouseEnter={() => {
                    setCurrentCol(colIndex);
                  }}
                  onMouseLeave={() => {
                    setCurrentCol(-1);
                  }}
                  style={{
                    flexGrow: colIndex == currentCol ? 3 : 2,
                    ...{ "--item-index": rowIndex * numColumn + colIndex },
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
