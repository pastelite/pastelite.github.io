import "./App.css";
import Layout from "./components/Layout";
import Name from "./components/Name";
import TextCorouselBackgroundNew from "./components/TextCorouselBackgroundNew";

function App() {
  return (
    <>
      <TextCorouselBackgroundNew />
      <Name />
      <Layout>
        <div style={{ textAlign: "left", backgroundColor: "var(--color-second-background)"}}>
          Test
        </div>
      </Layout>
    </>
  );
}

export default App;
