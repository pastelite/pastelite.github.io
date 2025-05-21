import "./App.css";
import TextSVG from "./components/TextSVG";
import Layout from "./components/Layout";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/TextCorouselBackgroundNew";
import { AboutPage } from "./components/AboutPage";

function App() {
  return (
    <>
      <TextCorouselBackgroundNew />
      <Name />
      <Layout>
        <AboutPage></AboutPage>
      </Layout>
    </>
  );
}

export default App;
