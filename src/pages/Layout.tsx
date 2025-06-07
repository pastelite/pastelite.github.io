import { motion, useScroll, useTransform } from "motion/react";
import BetterName from "../components/Layout/BetterName";
import ContactList from "../components/Layout/ContactList";
import "../components/Layout/Layout.style.css";
import Menu from "../components/Layout/Menu";
import EasierName from "@/components/Layout/EasierName";

export default function Layout({ children }: { children: React.ReactNode }) {
  const topBarHeight = 100;
  const menuBarWidth = 100;

  let {scrollY} = useScroll()
  let backgroundColor = useTransform(scrollY, [0, window.innerHeight], ["rgb(11,11,11)", "rgb(30, 35, 40)"])

  return (
    <>
      <div
        className="top-bar"
        style={{
          height: topBarHeight,
          paddingRight: topBarHeight / 2,
        }}
      >
        <ContactList />
      </div>
      <Menu menuBarWidth={menuBarWidth} />
      <div className="content" style={{ left: 0, top: `100vh` }}>
        {children}
      </div>
      {/* <BetterName /> */}
      <EasierName/>
      <motion.div
        className="-z-10 top-0 left-0 fixed right-0 bottom-0"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
      </motion.div>
    </>
  );
}
