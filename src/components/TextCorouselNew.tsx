import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./TextCorouselNew.css";
import CustomTextCorouselItemGenerator from "../utils/itemGenerator";
import { useAnimationTicker } from "../hooks/useAnimationTicker";

interface TextCorouselNewProps {
  gap?: number;
  speed?: number;
  timeThreshold?: number;
  itemGenerator?: ItemGenerator;
  // defaultItem?: TextCorouselItemData;
}

export interface ItemGenerator {
  getItem: () => TextCorouselItemData;
}

export interface TextCorouselItemData {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
}

export function generateId(item: TextCorouselItemData) {
  return `carousel-item-${Math.random().toString(36)}`;
}

/**
 * Variables
 *
 * @param {number} gap: gap between items
 * @param {number} speed: speed of the animation, pixels per second
 * @param {number} timeThreshold: how long to wait before stopping the animation
 */
export default function TextCorouselNew(
  {
    gap = 10,
    speed = 100,
    timeThreshold = 500,
    itemGenerator = new CustomTextCorouselItemGenerator(),
  }: TextCorouselNewProps,
) {
  let containerRef = useRef<HTMLDivElement>(null);
  let [items, setItems] = useState<TextCorouselItemData[]>([
    { children: "", id: generateId({ children: "" }) },
  ]);
  let [offset, setOffset] = useState(0);
  let offsetRef = useRef(0);

  // ticker
  // const animationFrameId = useRef<number>(0);
  // const lastTime = useRef<number>(0);

  useAnimationTicker((deltaTime) => {
    const distanceToMove = (speed * deltaTime) / 1000;

    setOffset((prev) => {
      const nextOffset = prev - distanceToMove;
      offsetRef.current = nextOffset;
      return nextOffset;
    });
  });

  // useEffect(() => {
  //   const animate = (time: number) => {
  //     if (!lastTime.current) {
  //       lastTime.current = time;
  //     }

  //     const deltaTime = time - lastTime.current;
  //     const distanceToMove = (speed * deltaTime) / 1000; // speed is in pixels per second

  //     if (time - lastTime.current > timeThreshold) {
  //       // if it too long, just don't move
  //       // this prevent bugs where distanceToMove is too big and everything just disappear
  //       lastTime.current = time;
  //       animationFrameId.current = requestAnimationFrame(animate);
  //       return;
  //     }

  //     setOffset((prev) => {
  //       offsetRef.current = prev - distanceToMove;
  //       return prev - distanceToMove;
  //     });

  //     lastTime.current = time;
  //     animationFrameId.current = requestAnimationFrame(animate);
  //   };

  //   animationFrameId.current = requestAnimationFrame(animate);

  //   return () => {
  //     if (animationFrameId.current) {
  //       cancelAnimationFrame(animationFrameId.current);
  //     }
  //     lastTime.current = 0; // Reset lastTime on cleanup
  //   };
  // }, [speed]);

  // get first item width
  let firstItemWidth = useRef(0);
  useLayoutEffect(() => {
    if (containerRef.current) {
      if (containerRef.current.children.length === 0) return;
      let firstItem = containerRef.current.children[0] as HTMLDivElement;
      firstItemWidth.current = firstItem.offsetWidth + gap;
    }
  }, [items]);

  // remove items if necessary, this is also to trigger adding new items without
  // having to check the width every offset change
  useEffect(() => {
    // remove items
    if (-offset > 0 && (-offset >= firstItemWidth.current)) {
      offsetRef.current = offset + firstItemWidth.current;
      setOffset(offset + firstItemWidth.current);
      setItems((prev) => prev.slice(1));
    } else if (-offset < 0 && offset >= firstItemWidth.current) {
      offsetRef.current = offset - firstItemWidth.current;
      setOffset(offset - firstItemWidth.current);
      setItems((prev) => prev.slice(1));
    }
  }, [offset]);

  // adding item if item/screen width change
  useLayoutEffect(() => {
    const assumedItemWidth = 200;

    function handleResize() {
      let justInCaseSpace = window.innerWidth; // basically how much space we reserve before adding new items
      let screenWidth = document.documentElement.clientWidth;
      let containerWidth = containerRef.current?.offsetWidth || 0;

      let spaceToAdd = (speed > 0)
        ? Math.max(
          0,
          screenWidth + justInCaseSpace + (-offsetRef.current) - containerWidth,
        )
        : Math.max(
          0,
          screenWidth + justInCaseSpace + offsetRef.current - containerWidth,
        );
      let numItemsToAdd = Math.ceil(
        spaceToAdd / assumedItemWidth,
      );
      // divide 2 to reduce the constant addition
      if (numItemsToAdd > 0 && spaceToAdd > justInCaseSpace / 2) {
        setItems((
          prev,
        ) => [
          ...prev,
          ...Array(numItemsToAdd).fill(0).map(() => {
            let item = itemGenerator.getItem();
            return {
              id: item.id || generateId(item),
              ...item,
            };
          }),
        ]);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [items]);

  return (
    <div className="corousel-container">
      <div
        className="corousel-flex"
        style={{
          transform: `translateX(${offset}px)`,
          flexDirection: speed > 0 ? "row" : "row-reverse",
          ...speed > 0 ? { left: 0 } : { right: 0 },
        }}
        ref={containerRef}
      >
        {items.map((item, _) => {
          let { className, ...props } = item.props || {};
          return (
            <div
              key={item.id}
              className={`corousel-item ${className}`}
              {...props}
            >
              {item.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}
