import "./App.css";
import TextSVG from "./components/Atoms/TextSVG";
import Layout from "./pages/Layout";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/Organism/TextCorouselBackgroundNew";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { WorksPage } from "./pages/WorksPage";
import { useMotionValue } from "motion/react";

function App() {
  return (
    <>
      <Layout>
        <AboutPage/>
        <WorksPage/>
        <ContactPage/>
      </Layout>
    </>
  );
}

export default App;
