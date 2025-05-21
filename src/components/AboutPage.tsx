import { useLayoutEffect, useRef, useState } from "react";
import TextHeader from "./TextHeader";

export function AboutPage() {
  const [pageScrollLocation, setPageScrollLocation] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (pageRef.current) {
        let rect = pageRef.current.getBoundingClientRect();
        setPageScrollLocation(rect.top + window.scrollY);
        console.log("pagescroll", rect.top + window.scrollY);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-second-background)",
        height: "100vh",
        paddingLeft: 100,
      }}
    >
      <div
        style={{
          height: 100,
        }}
        ref={pageRef}
      >
        <TextHeader text="Hello" scrollYToStartAnimation={pageScrollLocation-1} scrollYToEndAnimation={pageScrollLocation + 100} />
      </div>
    </div>
  );
}
