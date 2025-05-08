import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TextCorousel.style.css";

interface TextCorouselItemData {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  width: number;
}

interface TextCorouselProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number;
  fps?: number;
  itemGenerator?: () => TextCorouselItemData;
}

const PositionContext = createContext<any>(null);

function defaultItemGenerator(): TextCorouselItemData {
  let index = Math.floor(Math.random() * 100);
  return { children: `Item ${index}`, width: 0 };
}

function TextCorousel(
  {
    gap = 0,
    speed = 100,
    fps = 60,
    itemGenerator = defaultItemGenerator,
    className,
    ...props
  }: TextCorouselProps,
) {
  // let [containerRef, containerBound] = useMeasure({ polyfill: ResizeObserver });
  let containerRef = useRef<HTMLDivElement>(null);
  let [containerWidth, setContainerWidth] = useState(0);

  let [positionStore, setPositionStore] = useState<TextCorouselItemData[]>([
    itemGenerator(),
  ]);

  let [startPosition, setStartPosition] = useState(0); // basically what everything should start with

  let leftOffset = useMemo(() => {
    let acc = [startPosition];
    for (let i = 1; i < positionStore.length; i++) {
      acc.push(acc[i - 1] + positionStore[i - 1].width + gap);
    }
    return acc;
  }, [positionStore, startPosition, gap]);

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
  useEffect(() => {
    let timer: any;
    if (containerWidth > 0) {
      timer = setInterval(() => {
        setStartPosition((prev) => prev - (speed / fps));
      }, 1000 / fps);
    }
    return () => {
      clearInterval(timer);
    };
  }, [containerWidth, speed]);

  // add item if necessary
  useEffect(() => {
    let itemWidth = leftOffset[leftOffset.length - 1] +
      positionStore[positionStore.length - 1].width + gap;
    let lastItemStart = leftOffset[leftOffset.length - 1];
    // add item if necessary
    if (itemWidth < containerWidth) {
      setPositionStore([...positionStore, itemGenerator()]);
    }
    // remove item if necessary
    if (lastItemStart > containerWidth) {
      setPositionStore(positionStore.slice(0, -1));
    }
    // pop first item if necessary
    // x + y < 0
    if (leftOffset[0] + positionStore[0].width + gap < 0) {
      setPositionStore(positionStore.slice(1));
      setStartPosition(startPosition + positionStore[0].width + gap);
    }
  }, [containerWidth, positionStore, startPosition, gap]);

  return (
    <>
      <PositionContext.Provider value={[positionStore, setPositionStore]}>
        <div className={`text-bar-container ${className || ""}`} ref={containerRef} {...props}>
          {positionStore.map((item, i) => (
            <TextCorouselItem
              key={i}
              left={leftOffset[i]}
              itemId={i}
              {...item.props}
            >
              {item.children}
            </TextCorouselItem>
          ))}
        </div>
      </PositionContext.Provider>
      <button
        onClick={() => {
          setPositionStore([...positionStore, itemGenerator()]);
        }}
      >
        Add item
      </button>
      <button
        onClick={() => {
          setStartPosition(startPosition - speed);
        }}
      >
        Move
      </button>
    </>
  );
}

interface TextCorouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: number;
  // text?: string;
  left?: number;
  children?: React.ReactNode;
}

function TextCorouselItem(
  { itemId, children = "Hello", left = 0, style, className, ...props }:
    TextCorouselItemProps,
) {
  let [_, setStore] = useContext(PositionContext);
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateStore() {
      setStore((store: any) => {
        if (!ref.current) return store;
        const measuredWidth = ref.current.offsetWidth;

        // need to .map() to force update
        const newStore = store.map((item: any, index: number) => {
          if (index === itemId) {
            if (item.width !== measuredWidth) {
              return { ...item, width: measuredWidth };
            }
          }
          return item;
        });

        // prevent non-stop updates
        if (JSON.stringify(store) !== JSON.stringify(newStore)) {
          return newStore;
        } else {
          return store;
        }
      });
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
        left: `${left}px`,
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
