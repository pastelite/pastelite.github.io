import "./App.css";
import TextSVG from "./components/TextSVG";
import Layout from "./pages/Layout";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/TextCorouselBackgroundNew";
import { AboutPage } from "./pages/AboutPage";
import BetterName from "./components/BetterName";
import { ContactPage } from "./pages/ContactPage";
import { WorksPage } from "./pages/WorksPage";

function App() {
  return (
    <>
      
      {/* <Name /> */}
      {/* <BetterName></BetterName> */}
      <Layout>
        <AboutPage/>
        <WorksPage/>
        <ContactPage/>
      </Layout>
    </>
  );
}

export default App;
