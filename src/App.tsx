import { useState } from "react";
import "./App.css";
import TextCorouselBackground from "./components/TextCorouselBackground";
import Name from "./components/Name";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TextCorouselBackground />
      {/* <img src={pasteliteSvg}  className="title-name"/> */}
      <Name />
    </>
  );
}

// function NamedTitle() {
//   // const titleRef = useRef<SvgS>(null);

//   const [top, setTop] = useState(0);

//   useEffect(() => {
//     function handleResize() {
//       let screenHeight = window.innerHeight;
//       let titleHeight = (Math.round(screenHeight*0.5/80)-1)*80;

//       setTop(titleHeight);
//     }

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [])

//   return (
//     <>
//       {/* <img src={pasteliteSvg}  className="title-name" ref={titleRef} style={{top: top}}/> */}
//       <TitleName className="title-name" style={{top: top}}/>
//     </>
//   );
// }

export default App;
