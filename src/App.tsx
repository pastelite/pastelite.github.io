import { useState } from "react";
import "./App.css";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/TextCorouselBackgroundNew";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TextCorouselBackgroundNew />
      <Name />
      <div style={{height: "100vh"}}>

      </div>
      <div style={{height: "100vh"}}>
        <div>Test Page 2</div>
      </div>
    </>
  );
}

export default App;
