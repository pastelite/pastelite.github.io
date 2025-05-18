import { useEffect, useLayoutEffect, useState } from "react";
import PasteliteSvg from "../assets/pastelite.svg?react";
import "./Name.style.css"
import useAfterScroll from "../hooks/useAfterScroll";

export default function Name() {
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    function handleResize() {
      let screenHeight = window.innerHeight;
      let titleHeight = (Math.round(screenHeight*0.5/80)-1)*80;

      setTop(titleHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      <PasteliteSvg className="title-name" style={{top: top}}/>
    </>
  );
}
