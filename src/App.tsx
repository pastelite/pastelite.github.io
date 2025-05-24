import "./App.css";
import TextSVG from "./components/TextSVG";
import Layout from "./components/Layout";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/TextCorouselBackgroundNew";
import { AboutPage } from "./components/AboutPage";
import BetterName from "./components/BetterName";

function App() {
  return (
    <>
      
      {/* <Name /> */}
      {/* <BetterName></BetterName> */}
      <Layout>
        <AboutPage></AboutPage>
      </Layout>
    </>
  );
}

export default App;
