import { useEffect, useLayoutEffect, useState } from "react";
import TextCorouselNew from "./TextCorouselNew";
import useScrollEffect from "../hooks/useScrollEffect";

function mappingNumber(n: number, min: number, max: number) {
  return n * (max - min) + min;
}

export default function TextCorouselBackground() {
  let [screenHeight, setScreenHeight] = useState(0);
  let [corouselList, setCorouselList] = useState<
    { "height": number; "speed": number }[]
  >([]);

  // screen size
  useLayoutEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // reduce size when scroll
  useScrollEffect(() => {
    let scrollTop = window.scrollY;
    // let scale = Math.max(0.5, 1 - scrollTop / window.innerHeight);
    let scale = mappingNumber(1 - scrollTop / window.innerHeight, 0.5, 1);
    document.documentElement.style.setProperty("--background-scale", `${scale}`);
  }, 50)

  // initialized corousels
  useEffect(() => {
    if (screenHeight === 0) return;

    let corouselHeight = corouselList.reduce(
      (acc, curr) => acc + curr.height,
      0,
    );
    let numToAdd = Math.ceil((screenHeight - corouselHeight) / 80);
    console.log(numToAdd);
    if (numToAdd === 0) return;
    
    if (numToAdd > 0) {
      let newCorousels = [];
      for (let i = 0; i < numToAdd; i++) {
        newCorousels.push({
          height: 80,
          speed: (Math.floor(Math.random() * 100) + 50) *
            ((corouselList.length + i) % 2 ? -1 : 1),
        });
      }
      setCorouselList((corouselList) => [...corouselList, ...newCorousels]);
    }
    if (numToAdd < 0) {
      setCorouselList((corouselList) => corouselList.slice(0, corouselList.length + numToAdd));
    }
    
    console.log(corouselList);
  }, [screenHeight]);

  return (
    <div className="text-corousel-background">
      {corouselList.map((corousel, index) => (
        <TextCorouselNew
          key={index}
          // itemGenerator={corousel.generator}
          gap={10}
          // style={{
          //   height: `${corousel.height}px`,
          // }}
          speed={corousel.speed}
          // this is to preload classes
          // defaultItem={{
          //   children: "",
          //   width: 0,
          //   // props: {
          //   //   className:
          //   //     "blink-on-start",
          //   // },
          //   id: "preload",
          // }}
        />
      ))}
    </div>
  );
}
