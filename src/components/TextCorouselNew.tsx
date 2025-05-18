import { useLayoutEffect, useRef, useState } from "react";
import "./TextCorouselNew.css";
import CustomTextCorouselItemGenerator from "../utils/itemGenerator";
import { useAnimationTicker } from "../hooks/useAnimationTicker";
import { motion, useMotionValue } from "motion/react";

interface TextCorouselNewProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number;
  itemGenerator?: ItemGenerator;
  defaultItem?: TextCorouselItemData;
}

export interface ItemGenerator {
  getItem: () => TextCorouselItemData;
}

export interface TextCorouselItemData {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
}

export function generateId() {
  return `carousel-item-${Math.random().toString(36)}`;
}

/**
 * Variables
 *
 * @param {number} gap: gap between items
 * @param {number} speed: speed of the animation, pixels per second
 * @param {TextCorouselItemData} defaultItem: default item to display
 */
export default function TextCorouselNew(
  {
    gap = 10,
    speed = 100,
    itemGenerator = new CustomTextCorouselItemGenerator(),
    defaultItem = { children: "", id: generateId() },
    ...props
  }: TextCorouselNewProps,
) {
  let containerRef = useRef<HTMLDivElement>(null);
  let [items, setItems] = useState<TextCorouselItemData[]>([
    defaultItem,
  ]);

  let offsetRef = useRef(0);
  const offsetMotion = useMotionValue(0);

  useAnimationTicker((deltaTime) => {
    const distanceToMove = (speed * deltaTime) / 1000;
    let offset = offsetRef.current;

    let firstItemWidth = 0;
    if (containerRef.current) {
      if (containerRef.current.children.length === 0) return;
      let firstItem = containerRef.current.children[0] as HTMLDivElement;
      firstItemWidth = firstItem.offsetWidth + gap;
    }

    offset -= distanceToMove; //need to be negative because of my shitty decision

    if (speed > 0 && -offset > firstItemWidth) {
      offset += firstItemWidth;
      setItems((prev) => prev.slice(1));
    } else if (speed < 0 && offset >= firstItemWidth) {
      offset -= firstItemWidth;
      setItems((prev) => prev.slice(1));
    }

    offsetRef.current = offset;
    offsetMotion.set(offset);
  }, [speed]);

  // adding item if item/screen width change
  useLayoutEffect(() => {
    const assumedItemWidth = 200;

    function handleResize() {
      // basically how much space we reserve before adding new items
      const justInCaseSpace = window.innerWidth;
      const screenWidth = document.documentElement.clientWidth;
      const containerWidth = containerRef.current?.offsetWidth || 0;

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
      if (spaceToAdd > justInCaseSpace / 2 && numItemsToAdd > 0) {
        setItems((
          prev,
        ) => [
          ...prev,
          ...Array(numItemsToAdd).fill(0).map(() => {
            let item = itemGenerator.getItem();
            return {
              id: item.id || generateId(),
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
    <div className="corousel-container" {...props}>
      <motion.div
        className="corousel-flex"
        style={{
          x: offsetMotion,
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
      </motion.div>
    </div>
  );
}
