import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import TextCorousel from "./components/TextCorousel";
import TextCorouselBackground from "./components/TextCorouselBackground";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        Starting this for the sake of starting
      </div>
      <TextCorousel gap={10} /> */}
      <TextCorouselBackground />
    </>
  );
}



export default App;
