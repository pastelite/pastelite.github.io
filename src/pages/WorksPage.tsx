
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";

export function WorksPage() {
  const pageIndex = 1;
  const pageScrollLocation = usePositionStore((state) =>
    state.position[pageIndex]
  );

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-second-background)",
        height: "100vh",
      }}
    >
      <TextHeader
        text="Project"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
      />
      <div>
        List of projects go here...
      </div>
    </PageContainer>
  );
}