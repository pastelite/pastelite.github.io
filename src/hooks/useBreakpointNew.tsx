import { useEffect, useLayoutEffect, useState } from "react";

export default function useBreakpointNew(breakpoints: number[]) {
  let [currentBreakpoint, setCurrentBreakpoint] = useState(getBreakpointIndex());

  function getBreakpointIndex() {
    const width = window.innerWidth;
    let breakpointIndex = 0;

    for (let i = 0; i < breakpoints.length; i++) {
      if (width >= breakpoints[i]) {
        breakpointIndex = i + 1;
      }
    }

    return breakpointIndex;
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getBreakpointIndex());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  function chooseBreakpoint<T>(...value:T[]): T {
    if (currentBreakpoint >= value.length) {
      return value[value.length - 1];
    }
    return value[currentBreakpoint];
  }

  return chooseBreakpoint;
}
