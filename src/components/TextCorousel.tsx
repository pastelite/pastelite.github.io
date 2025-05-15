import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TextCorousel.style.css";

export interface TextCorouselItemData {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  width: number;
  id: string;
}

export interface ItemGenerator {
  getItem: () => TextCorouselItemData;
}

interface TextCorouselProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number;
  fps?: number;
  // itemGenerator?: () => TextCorouselItemData;
  itemGenerator?: ItemGenerator;
  defaultItem?: TextCorouselItemData;
}

const PositionContext = createContext<any>(null);

// function defaultItemGenerator(): TextCorouselItemData {
//   let index = Math.floor(Math.random() * 100);
//   return { children: `Item ${index}`, width: 0 };
// }

class DefaultItemGenerator implements ItemGenerator {
  getItem() {
    let index = Math.floor(Math.random() * 100);
    return { children: `Item ${index}`, width: 0, id: generateId() };
  }
}

function TextCorousel(
  {
    gap = 0,
    speed = 100,
    fps = 144,
    itemGenerator = new DefaultItemGenerator(),
    className,
    style,
    defaultItem = { children: "", width: 0, id: "item-0" },
    ...props
  }: TextCorouselProps,
) {
  // let [containerRef, containerBound] = useMeasure({ polyfill: ResizeObserver });
  let containerRef = useRef<HTMLDivElement>(null);
  let [containerWidth, setContainerWidth] = useState(0);

  let [positionStore, setPositionStore] = useState<TextCorouselItemData[]>([
    defaultItem,
  ]);

  let [startPosition, setStartPosition] = useState(0); // basically what everything should start with

  let leftOffset = useMemo(() => {
    let acc = [0];
    for (let i = 1; i < positionStore.length; i++) {
      acc.push(acc[i - 1] + positionStore[i - 1].width + gap);
    }
    return acc;
  }, [positionStore, gap]);

  // update size
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // timer and speed
  // useEffect(() => {
  //   let timer: any;
  //   if (containerWidth > 0) {
  //     timer = setInterval(() => {
  //       setStartPosition((prev) => prev - (Math.abs(speed) / fps));
  //     }, 1000 / fps);
  //   }
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [containerWidth, speed]);
  const animationFrameId = useRef<number>(0);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    if (containerWidth === 0) return;

    const animate = (time: number) => {
      if (!lastTime.current) {
        lastTime.current = time;
      }

      const deltaTime = time - lastTime.current;
      const distanceToMove = (Math.abs(speed) * deltaTime) / 1000; // speed is in pixels per second
      const timeThreshold = 500;
      if (time - lastTime.current > timeThreshold) {
        // if it too long, just don't move
        // this prevent bugs where distanceToMove is too big and everything just disappear
        lastTime.current = time;
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      setStartPosition((prev) => prev - distanceToMove);

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
  }, [containerWidth, speed]);

  // add item if necessary
  useEffect(() => {
    // add in case of screen turn off. i have no idea why but it's just needed
    let itemWidth = leftOffset[leftOffset.length - 1] +
      positionStore[positionStore.length - 1].width + gap + startPosition;
    
    // add item if necessary
    if (itemWidth < containerWidth) {
      setPositionStore([...positionStore, itemGenerator.getItem()]);
    }
    
    // pop first item if necessary
    if (leftOffset[0] + startPosition + positionStore[0].width + gap < 0) {
      setPositionStore(positionStore.slice(1));
      setStartPosition(prevStart => (prevStart + positionStore[0].width + gap));
      return;
    }
  }, [containerWidth, positionStore, startPosition, gap]);

  const updateItemWidth = useCallback((id: string, width: number) => {
    setPositionStore((prevStore) => {
      let newStore = prevStore.map((item) =>
        item.id === id && item.width !== width ? { ...item, width } : item
      );

      if (JSON.stringify(prevStore) !== JSON.stringify(newStore)) {
        return newStore;
      } else {
        return prevStore;
      }
    });
  }, []);

  return (
    <>
      <PositionContext.Provider value={[positionStore, updateItemWidth]}>
        <div
          className={`text-bar-container ${className || ""}`}
          ref={containerRef}
          style={{
            ...style,
          }}
          {...props}
        >
          {positionStore.map((item, i) => (
            <TextCorouselItem
              key={item.id}
              left={leftOffset[i] + startPosition}
              itemId={item.id}
              reverse={speed < 0}
              {...item.props}
            >
              {item.children}
            </TextCorouselItem>
          ))}
        </div>
      </PositionContext.Provider>
    </>
  );
}

interface TextCorouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string;
  // text?: string;
  left?: number;
  children?: React.ReactNode;
  reverse?: boolean;
}

function TextCorouselItem(
  {
    itemId,
    children = "Hello",
    left = 0,
    style,
    className,
    reverse = false,
    ...props
  }: TextCorouselItemProps,
) {
  let [_, updateItemWidth] = useContext(PositionContext);
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateStore() {
      updateItemWidth(itemId, ref.current?.offsetWidth || 0);
    }

    updateStore();
    window.addEventListener("resize", updateStore);
    return () => {
      window.removeEventListener("resize", updateStore);
    };
  });

  return (
    <div
      className={`text-bar-item ${className || ""}`}
      style={{
        ...(reverse ? { right: `${left}px` } : { left: `${left}px` }),
        ...style,
      }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

export default TextCorousel;
export { TextCorouselItem };

export const generateId = () =>
  `carousel-item-${Math.random().toString(36).substr(2, 9)}`;
