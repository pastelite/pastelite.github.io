import { useEffect, useState } from "react";
import TextCorousel, {
  type ItemGenerator,
  type TextCorouselItemData,
} from "./TextCorousel";

const helloLanguages = [
  "Hello", // English
  "สวัสดี", // Thai
  "Hola", // Spanish
  "Bonjour", // French
  "你好", // Chinese (Mandarin)
  "नमस्ते", // Hindi
  "Привет", // Russian
  "こんにちは", // Japanese
  "안녕하세요", // Korean
  "Guten Tag", // German
  "Cześć", // Polish
  "Ciao", // Italian
  "ສະບາຍດີ", // Lao
];
const fontFamily = [
  '"Noto Serif", "Niramit", "Georgia", "Times New Roman", "Yu Mincho", serif',
  '"Open Sans", "Noto Sans Thai", "Arial", "Helvetica", sans-serif',
  '"Roboto Slab", "Chakra Petch", "Courier New", "Fira Code", monospace',
  '"Roboto Condensed", "IBM Plex Sans Thai Looped", "Arial", "Helvetica", sans-serif',
];
const fontWeight = ["200", "300", "400", "500", "600"];

// let shuffled = unshuffled
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value)

let shuffler = (array: string[]) =>
  array.map((value) => ({ value, sort: Math.random() })).sort((a, b) =>
    a.sort - b.sort
  ).map(({ value }) => value);

const randomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

class CustomTextCorouselItemGenerator implements ItemGenerator {
  countUntilShuffle: number;
  shuffledLanguages: string[];

  constructor() {
    this.countUntilShuffle = helloLanguages.length - 1;
    this.shuffledLanguages = shuffler(helloLanguages);
  }

  getItem(): TextCorouselItemData {
    // reset counter
    this.countUntilShuffle--;
    if (this.countUntilShuffle === -1) {
      this.countUntilShuffle = helloLanguages.length - 1;
      let previousShuffledLanguages = this.shuffledLanguages[0];
      this.shuffledLanguages = shuffler(helloLanguages);
      if (
        this.shuffledLanguages[helloLanguages.length - 1] ===
          previousShuffledLanguages
      ) {
        // swap with the middle
        let middleIndex = Math.floor(helloLanguages.length / 2);
        let temp = this.shuffledLanguages[middleIndex];
        this.shuffledLanguages[middleIndex] =
          this.shuffledLanguages[helloLanguages.length - 1];
        this.shuffledLanguages[helloLanguages.length - 1] = temp;
      }
    }
    let text = this.shuffledLanguages[this.countUntilShuffle];

    let props = {
      style: {
        fontFamily: randomElement(fontFamily),
        fontSize: "48px",
        fontWeight: randomElement(fontWeight),
      },
    };
    return { children: text, props, width: 0 };
  }
}

export default function TextCorouselBackground() {
  let [screenHeight, setScreenHeight] = useState(0);
  let [corouselList, setCorouselList] = useState<
    { "height": number; "speed": number }[]
  >([]);

  // screen size
  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // initialized corousels
  useEffect(() => {
    if (screenHeight === 0) return;

    let corouselHeight = corouselList.reduce(
      (acc, curr) => acc + curr.height,
      0,
    );
    if (corouselHeight < screenHeight) {
      setCorouselList([...corouselList, {
        height: 80,
        speed: (Math.floor(Math.random() * 100) + 50) *
          (corouselList.length % 2 ? -1 : 1),
      }]);
      console.log(corouselList)
    }
  }, [screenHeight, corouselList]);

  return (
    <div className="text-corousel-background">
      {
        corouselList.map((corousel, index) => (
          <TextCorousel
            key={index}
            itemGenerator={new CustomTextCorouselItemGenerator()}
            gap={10}
            style={{
              height: `${corousel.height}px`,
            }}
            speed={corousel.speed}
          />
        ))
      }
    </div>
  );
}
