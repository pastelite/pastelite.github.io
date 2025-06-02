import { useLayoutEffect, useRef, useState } from "react";
import "./TextCorouselNew.css"; // Make sure this CSS file exists
import CustomTextCorouselItemGenerator from "../utils/itemGenerator"; // Adjust path if needed
import { useAnimationTicker } from "../hooks/useAnimationTicker"; // Adjust path if needed
import { motion, useMotionValue } from "motion/react";

export interface ItemGenerator {
  getItem: () => TextCorouselItemData;
}

export interface TextCorouselItemData {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
}

export function generateId() {
  // Generate a slightly more robust random ID
  return `carousel-item-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}

interface TextCorouselNewProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number; // Pixels per second. positive for going left, negative going right.
  itemGenerator?: ItemGenerator;
  defaultItem?: TextCorouselItemData;
  assumedItemWidth?: number; // estimated size of each item. Too much there will not be enough item. Too little there will be too much item
  throttleTime?: number; // how often do we check the items? every "throttleTime" ms
}

export default function TextCorouselNew({
  gap = 10,
  speed = 100,
  itemGenerator = new CustomTextCorouselItemGenerator(),
  defaultItem = { children: "Default Item", id: generateId() },
  assumedItemWidth = 200,
  throttleTime = 1000, // ms
  ...props
}: TextCorouselNewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TextCorouselItemData[]>([defaultItem]);

  const offsetMotion = useMotionValue(0);

  // there was a flickering issue due to the item removal and offsetMotion setting
  // because offsetMotion was depend on dom instead of React
  // this kind of force to make offsetMotion depend on react
  const [removalCompensation, setRemovalCompensation] = useState({
    amount: 0,
    triggerId: 0, 
  });

  const checkItemTimerRef = useRef<number | null>(null);

  useAnimationTicker(
    (deltaTime) => {
      if (speed === 0 || !containerRef.current) return;

      const distanceToMove = (speed * deltaTime) / 1000;
      let offset = offsetMotion.get() - distanceToMove;

      offsetMotion.set(offset);
      
      // offsetRef.current -= distanceToMove;
      // offsetMotion.set(offsetMotion.get() - distanceToMove);

      if (checkItemTimerRef.current === null && speed !== 0) {
        let itemsToRemoveCount = 0;
        let widthOfItemsToRemove = 0;
        
        const children = containerRef.current.children;
        // Calculate how much content is off-screen based on the direction of movement
        const currentAbsoluteOffset = Math.abs(offset);

        for (let i = 0; i < children.length; i++) {
          const item = children[i] as HTMLDivElement;
          const itemWidth = item.offsetWidth + gap;
          if (widthOfItemsToRemove + itemWidth > currentAbsoluteOffset) break;
          widthOfItemsToRemove += itemWidth;
          itemsToRemoveCount++;
        }
        
        if (itemsToRemoveCount > 0) {
          const compensationAmount = (speed > 0 ? 1 : -1) * widthOfItemsToRemove;
          
          setRemovalCompensation((prev) => ({
            amount: compensationAmount,
            triggerId: prev.triggerId + 1,
          }));

          setItems((prev) => {
            const remaining = prev.slice(itemsToRemoveCount);
            return remaining.length > 0
              ? remaining
              : [{ children: "Fallback Item", id: generateId() }];
          });
        }

        checkItemTimerRef.current = window.setTimeout(() => {
          checkItemTimerRef.current = null;
        }, Math.random() * throttleTime+throttleTime/2);
      }
    },
    [speed, gap, throttleTime] // Dependencies for the animation ticker
  );

  // Apply offset before paint
  useLayoutEffect(() => {
    if (removalCompensation.triggerId > 0) {
      // offset += removalCompensation.amount;
      offsetMotion.set(offsetMotion.get() + removalCompensation.amount);
    }
  }, [removalCompensation, offsetMotion]);

  // Add items if necessary (e.g., on resize or when items list changes)
  useLayoutEffect(() => {
    const handleResizeOrItemsChange = () => {
      if (!containerRef.current || speed === 0) return;

      const screenWidth = document.documentElement.clientWidth;
      const currentContainerWidth = containerRef.current.offsetWidth;
      const bufferSpace = window.innerWidth; // How much content to pre-load off-screen

      let spaceToFill: number;

      if (speed > 0) { // Moving left (offsetRef.current is negative)
        spaceToFill = Math.max(0, screenWidth + bufferSpace + (-offsetMotion.get()) - currentContainerWidth);
      } else { // Moving right (offsetRef.current is positive)
         spaceToFill = Math.max(0, screenWidth + bufferSpace + offsetMotion.get() - currentContainerWidth);
      }

      // Add items only if a significant amount of space needs filling (e.g., more than half the buffer)
      if (spaceToFill > bufferSpace / 2) {
        const numItemsToAdd = Math.ceil(spaceToFill / assumedItemWidth) + 1; // +1 for good measure
        if (numItemsToAdd > 0) {
          setItems((prev) => [
            ...prev,
            ...Array(numItemsToAdd)
              .fill(0)
              .map(() => {
                const item = itemGenerator.getItem();
                return {
                  id: item.id || generateId(),
                  children: item.children,
                  props: item.props,
                };
              }),
          ]);
        }
      }
    };

    handleResizeOrItemsChange();
    window.addEventListener("resize", handleResizeOrItemsChange);
    return () => window.removeEventListener("resize", handleResizeOrItemsChange);
  }, [items, itemGenerator, speed, gap, assumedItemWidth]); // Runs when items change, or config changes

  return (
    <div className="corousel-container" {...props}>
      <motion.div
        className="corousel-flex"
        style={{
          x: offsetMotion,
          flexDirection: speed > 0 ? "row" : "row-reverse",
          ...(speed > 0 ? { left: 0 } : { right: 0 }), // Pin based on direction
        }}
        ref={containerRef}
      >
        {items.map((item) => {
          const { className: itemClassName, ...itemProps } = item.props || {};
          return (
            <div
              key={item.id}
              className={`corousel-item ${itemClassName || ""}`.trim()}
              {...itemProps}
            >
              {item.children}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}