import "./Layout.style.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  const topBarHeight = 50;
  const menuBarWidth = 100;

  return (
    <>
      <div className="top-bar" style={{ left: menuBarWidth, height: topBarHeight }}></div>
      <div className="menu-bar" style={{ width: menuBarWidth }}>
        <div>Test</div>
        <div>Test2</div>
        <div>Test3</div>
      </div>
      <div className="content" style={{ left: menuBarWidth, top: topBarHeight }}>{children}</div>
    </>
  );
}
