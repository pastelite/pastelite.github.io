import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./TextCorouselNew.css";
import CustomTextCorouselItemGenerator from "../utils/itemGenerator";
import { useAnimationTicker } from "../hooks/useAnimationTicker";
import { motion, useMotionValue } from "motion/react";

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
  // let [offset, setOffset] = useState(0);
  let offsetRef = useRef(0);

  // const [{ offsetSpring }, api] = useSpring(() => ({
  //   offsetSpring: 0,
  //   config: { tension: 120, friction: 40 },
  // }));
  const offsetSpring = useMotionValue(0);

  useAnimationTicker((deltaTime) => {
    const distanceToMove = (speed * deltaTime) / 1000;
    const currentOffset = offsetRef.current;

    // offsetRef.current -= distanceToMove;

    let firstItemWidth = 0;
    if (containerRef.current) {
      if (containerRef.current.children.length === 0) return;
      let firstItem = containerRef.current.children[0] as HTMLDivElement;
      firstItemWidth = firstItem.offsetWidth + gap;
    }

    offsetRef.current = currentOffset - distanceToMove;

    if (speed > 0 && -offsetRef.current > firstItemWidth) {
      offsetRef.current += firstItemWidth;
      setItems((prev) => prev.slice(1));
      // api.start({ offsetSpring: offsetRef.current, immediate: true });
      offsetSpring.set(offsetRef.current);
    } else if (speed < 0 && offsetRef.current >= firstItemWidth) {
      offsetRef.current -= firstItemWidth;
      setItems((prev) => prev.slice(1));
      offsetSpring.set(offsetRef.current);
      // api.start({ offsetSpring: offsetRef.current, immediate: true });
    } else {
      offsetSpring.set(offsetRef.current);
      // api.start({ offsetSpring: offsetRef.current, immediate: true });
    }

    // remove items that are out of the screen
    // if (-offsetRef.current > 0 && -offsetRef.current > firstItemWidth) {
    //   offsetRef.current += firstItemWidth;
    //   api.start({ offsetSpring: offsetRef.current, immediate: true});
    //   setItems((prev) => prev.slice(1));
    // } else if (-offsetRef.current < 0 && offsetRef.current >= firstItemWidth) {
    //   offsetRef.current -= firstItemWidth;
    //   api.start({ offsetSpring: offsetRef.current, immediate: true});
    //   setItems((prev) => [...prev, itemGenerator.getItem()]);
    // } else {
    //   api.start({ offsetSpring: offsetRef.current});
    // }
  });

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
  // useEffect(() => {
  //   // remove items
  //   if (-offset > 0 && (-offset >= firstItemWidth.current)) {
  //     offsetRef.current = offset + firstItemWidth.current;
  //     setOffset(offset + firstItemWidth.current);
  //     setItems((prev) => prev.slice(1));
  //   } else if (-offset < 0 && offset >= firstItemWidth.current) {
  //     offsetRef.current = offset - firstItemWidth.current;
  //     setOffset(offset - firstItemWidth.current);
  //     setItems((prev) => prev.slice(1));
  //   }
  // }, [offset]);

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
      <motion.div
        className="corousel-flex"
        style={{
          // transform: `translateX(${offset}px)`,
          // transform: `translateX(calc(0px - ${offsetSpring}px))`,
          x: offsetSpring,
          flexDirection: speed > 0 ? "row" : "row-reverse",
          ...speed > 0 ? { left: 0 } : { right: 0 },
        }}
        // initial={{ x: 0 }}
        // animate={{
        //   x: offsetSpring,
        // }}
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
