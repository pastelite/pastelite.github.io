import "./Layout.style.css";
import BetterName from "../components/BetterName";
import useBreakpoint from "../hooks/useBreakpoint";
import ContactList from "./layout/ContactList";
import Menu from "./layout/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const topBarHeight = 50;
  const topBarHeightSmall = 100;
  const menuBarWidth = 100;

  let breakpoint = useBreakpoint([768]);

  return (
    <>
      <div
        className="fixed top-0 right-0 z-20 flex flex-row items-center justify-end pr-4"
        style={{
          left: menuBarWidth,
          height: [topBarHeightSmall, topBarHeight][breakpoint],
        }}
      >
        <ContactList />
      </div>
      <Menu menuBarWidth={menuBarWidth} />
      <div className="content" style={{ left: 0, top: `calc(100vh)` }}>
        {children}
      </div>
      <BetterName />
    </>
  );
}
