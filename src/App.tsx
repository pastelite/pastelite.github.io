import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import TextCorousel from "./components/TextCorousel";
import TextCorouselBackground, { fontFamily } from "./components/TextCorouselBackground";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TextCorouselBackground />
      {/* <div className="title" style={{
        fontFamily: fontFamily[Math.floor(Math.random() * fontFamily.length)],
      }}>
        pastelite
      </div> */}
    </>
  );
}



export default App;
