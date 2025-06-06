import "./App.css";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import Layout from "./pages/Layout";
import { WorksPage } from "./pages/WorksPage";

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
