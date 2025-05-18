import { useEffect, useRef } from "react";

type Subscriber = (deltaTime: number) => void;
const threshold = 500;

class AnimationTicker {
  private subscribers: Set<Subscriber> = new Set();
  private lastTime = 0;
  private rafId: number | null = null;

  private tick = (time: number) => {
    if (!this.lastTime) this.lastTime = time;
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    if (deltaTime > threshold) {
      this.lastTime = time;
      this.rafId = requestAnimationFrame(this.tick);
      return;
    }

    this.subscribers.forEach((fn) => fn(deltaTime));
    // console.log("updated", this.subscribers.size, "times this tick");
    this.rafId = requestAnimationFrame(this.tick);
  };

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);

    // Start ticker if not running
    if (this.rafId === null) {
      this.lastTime = 0;
      this.rafId = requestAnimationFrame(this.tick);
    }

    // Unsubscribe logic
    return () => {
      this.subscribers.delete(fn);

      // Stop ticker if no subscribers
      if (this.subscribers.size === 0 && this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
        this.lastTime = 0;
      }
    };
  }
}

const animationTicker = new AnimationTicker();

/**
 * Hook to subscribe to a shared global animation frame ticker.
 * @param callback - function to run every frame with deltaTime
 */
export function useAnimationTicker(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsubscribe = animationTicker.subscribe((deltaTime) => {
      callbackRef.current(deltaTime);
    });
    return unsubscribe;
  }, deps);
}