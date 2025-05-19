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
        <div style={{ height: "100vh" }}>
        </div>
        <div style={{ height: "100vh" }}>
          <div>Test Page 2</div>
        </div>
      </Layout>
    </>
  );
}

export default App;
