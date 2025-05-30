
import TextHeader from "../components/TextHeader";
import DivWithAnimation from "../components/DivWithAnimation";
import usePositionStore from "../store";
import PageContainer from "../components/PageContainer";

export function ContactPage() {
  const pageIndex = 2;
  const pageScrollLocation = usePositionStore((state) =>
    state.position[pageIndex]
  );

  return (
    <PageContainer
      pageIndex={pageIndex}
      className="page-container"
      style={{
        textAlign: "left",
        backgroundColor: "var(--color-fourth-background)",
        minHeight: "100vh",
      }}
    >
      <TextHeader
        text="Contact"
        scrollYToStartAnimation={pageScrollLocation -
          (window.innerHeight / 2)}
        scrollYToEndAnimation={pageScrollLocation + (window.innerHeight / 2)}
        drawingTimeSec={0.3}
      />
      <div>
        Basically the most useless page rn
      </div>
    </PageContainer>
  );
}