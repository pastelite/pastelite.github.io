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
    </>
  );
}

export default App;
