import { use, useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomTextCorouselItemGenerator from "../../utils/itemGenerator";
import type { TextCorouselItemData } from "../Organism/TextCorouselNew";

export default function TextCorouselBackgroundCanvas() {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let [screenHeight, setScreenHeight] = useState(0);
  let [screenWidth, setScreenWidth] = useState(0);
  let [corouselList, setCorouselList] = useState<
    { "height": number; "speed": number }[]
  >([]);

  // screen size
  useLayoutEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ticker
  const animationFrameId = useRef<number>(0);
  const generator = useRef<CustomTextCorouselItemGenerator>(new CustomTextCorouselItemGenerator());
  const lastTime = useRef<number>(0);
  const speed = 100;
  const timeThreshold = 500;
  // const [offsets, setOffset] = useState(0);
  const [triggerRerender, setTriggerRerender] = useState(false);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTime.current) {
        lastTime.current = time;
      }

      const deltaTime = time - lastTime.current;
      const distanceToMove = (speed * deltaTime) / 1000; // speed is in pixels per second

      if (time - lastTime.current > timeThreshold) {
        // if it too long, just don't move
        // this prevent bugs where distanceToMove is too big and everything just disappear
        lastTime.current = time;
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      // setOffset((prev) => prev - distanceToMove);
      
      for (let i = 0; i < textItemOffset.current.length; i++) {
        textItemOffset.current[i] -= distanceToMove;
      }
      setTriggerRerender(prev => !prev);

      lastTime.current = time;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      lastTime.current = 0; // Reset lastTime on cleanup
    };
  }, [speed]);

  // let [textItems, setTextItems] = useState<TextCorouselItemData[][]>([]);
  // let 
  let textItem = useRef<TextCorouselItemData[][]>([]);
  let textItemOffset = useRef<number[]>([]);
  // let generator = new CustomTextCorouselItemGenerator();

  // initialized corousels
  useEffect(() => {
    let items = [];

    for (let i = 0; i < 1; i++) {
      items.push(generator.current.getItem());
    }

    textItem.current = [items];
    textItemOffset.current = [0];
  }, []);

  // render showing screen height for testing
  useEffect(() => {
    if (screenHeight === 0) return;

    let canvas = canvasRef.current!;
    let ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // drawALine(ctx, canvas, 0);
    let height = 80;
    let i = 0;
    while (height < screenHeight) {
      if (textItem.current.length <= i) {
        textItem.current.push([generator.current.getItem()]);
        textItemOffset.current.push(0);
      }
      drawALine(ctx, canvas, i, height);
      height += 80;
      i++;
    }
    

  });

  function drawALine(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, index: number, height: number = 0) {
    // draw first line
    let lineOffset = textItemOffset.current[index];
    let line = textItem.current[index];
    let obsoleteNotes: {"i": number, "width": number}[] = [];
    // let height = index*80+80;

    // draw array
    for (let i = 0; i < line.length; i++) {
      // set up
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#FFFFFF";
      ctx.font = `${
        line[i].props?.style?.fontWeight || "normal"
      } ${40}px  ${line[i].props?.style?.fontFamily || "Arial"}`;

      // draw text
      let text = ctx.measureText(line[i].children?.toString() || "");
      if (lineOffset + text.width < 0) {
        obsoleteNotes.push({"i": i, "width": text.width});
        lineOffset += text.width + 10;
        continue;
      };
      ctx.strokeText(line[i].children?.toString() || "", lineOffset, height);
      lineOffset += text.width + 10;
    }

    // draw the rest & update if needed
    while (lineOffset <= canvas.width) {
      let newItem = generator.current.getItem();
      
      // set up
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#FFFFFF";
      ctx.font = `${
        newItem.props?.style?.fontWeight || "normal"
      } ${40}px  ${newItem.props?.style?.fontFamily || "Arial"}`;

      // draw text
      let text = ctx.measureText(newItem.children?.toString() || "");
      ctx.strokeText(newItem.children?.toString() || "", lineOffset, height);
      line.push(newItem);
      lineOffset += text.width + 10;
    }

    // remove obsolete items
    let maxIndex = obsoleteNotes.reduce((acc, curr) => Math.max(acc, curr.i), -1);
    if (maxIndex >= 0) {
      console.log(maxIndex, textItem.current)
      textItem.current[index] = line.slice(maxIndex+1);
      textItemOffset.current[index] += obsoleteNotes.reduce((acc, curr) => acc + curr.width + 10, 0);
    }
  }

  return (
    <>
      <canvas ref={canvasRef} height={screenHeight} width={screenWidth}>
      </canvas>
    </>
  );
}
