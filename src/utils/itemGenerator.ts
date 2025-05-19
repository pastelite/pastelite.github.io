import type { HTMLAttributes } from "react";
import type { ItemGenerator, TextCorouselItemData } from "../components/TextCorouselNew";
import { randomBetween, randomElement, shuffleArray } from "./random";

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
export const fontFamily = [
  '"Noto Serif", "Niramit", "Georgia", "Times New Roman", "Yu Mincho", serif',
  '"Open Sans", "Noto Sans Thai", "Arial", "Helvetica", sans-serif',
  '"Roboto Slab", "Chakra Petch", "Courier New", "Fira Code", monospace',
  '"Roboto Condensed", "IBM Plex Sans Thai Looped", "Arial", "Helvetica", sans-serif',
];
const fontWeight = ["200", "300", "400", "500", "600"];

function linearHexMap(x: number) {
  if (x < 0.1 || x > 1) return null; // handle out-of-range input
  const val = Math.round((x - 0.1) / (1 - 0.1) * 15);
  return val.toString(16); // convert to hex string
}

export default class CustomTextCorouselItemGenerator implements ItemGenerator {
  countUntilShuffle: number;
  shuffledLanguages: string[];
  timer: any;
  timerEnd: boolean;

  constructor() {
    this.countUntilShuffle = helloLanguages.length - 1;
    this.shuffledLanguages = shuffleArray(helloLanguages);
    this.timerEnd = false;
    this.timer = setTimeout(() => {
      this.timerEnd = true;
    }, 1000)
  }

  getItem(): TextCorouselItemData {
    // reset counter
    this.countUntilShuffle--;
    if (this.countUntilShuffle === -1) {
      this.countUntilShuffle = helloLanguages.length - 1;
      let previousShuffledLanguages = this.shuffledLanguages[0];
      this.shuffledLanguages = shuffleArray(helloLanguages);
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
    let opacity = linearHexMap(randomBetween(0.2, 0.5));
    let textShadowColor = `#fff${opacity}`;
    console.log(textShadowColor);
    let textShadowEmpty = `#0000`;
    // let mappedToHex = Math.round(opacity * 255).toString(16).padStart(2, "0");
    let props: HTMLAttributes<HTMLDivElement> = {
      style: {
        fontFamily: randomElement(fontFamily),
        fontSize: "48px",
        fontWeight: randomElement(fontWeight),
        // opacity: randomBetween(0.2, 0.5),
        animationDelay: randomBetween(0.5, 1.25) + "s",
        animationDuration: randomBetween(1, 2) + "s",
        textShadow: `-1px -1px 0 ${textShadowColor}, 1px -1px 0 ${textShadowColor}, -1px 1px 0 ${textShadowColor}, 1px 1px 0 ${textShadowColor}`,
        // textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff"
        // ...this.timerEnd ? {
        //   textShadow: `-1px -1px 0 ${textShadowColor}, 1px -1px 0 ${textShadowColor}, -1px 1px 0 ${textShadowColor}, 1px 1px 0 ${textShadowColor}`,
        // } : {
        //   textShadow: `-1px -1px 0 ${textShadowEmpty}, 1px -1px 0 ${textShadowEmpty}, -1px 1px 0 ${textShadowEmpty}, 1px 1px 0 ${textShadowEmpty}`,
        // },
        ...this.timerEnd ? {
          opacity: 1,
        } : {
          opacity: 0,
        }
        
      },
      className: this.timerEnd ? "" : "blink-on-start",
    };
    return { children: text, props };
  }
}
