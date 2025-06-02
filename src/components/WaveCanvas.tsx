import { useEffect, useRef } from "react";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const level = 0.7;

  function draw(ctx: CanvasRenderingContext2D | null, currentTime: number) {
    let phase = 1; // phase 1 = 2pi
    let wavelength = 200;
    let amplitude = 10;
    let period = 2;

    const k = (2 * Math.PI) / wavelength;
    const omega = (2 * Math.PI) / period;

    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let base = canvas.height * (1 - level);
    ctx.moveTo(0, Math.sin(phase * wavelength) * amplitude);
    for (let i = 0; i < canvas.width; i++) {
      const phaseRadians = phase * (2 * Math.PI);

      const y = amplitude *
        Math.sin(k * i + omega * currentTime + phaseRadians);

      ctx.lineTo(i, base + y);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath;
    ctx.fillStyle = "red";
    ctx.fill();
  }

  const lastTimeStamp = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let currentTime = 0;
    let animationFrameId: number;

    const render = (timestamp: DOMHighResTimeStamp) => {
      const deltaTime = timestamp - lastTimeStamp.current;
      currentTime += deltaTime / 1000;
      lastTimeStamp.current = timestamp;
      draw(ctx, currentTime);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full">
    </canvas>
  );
}
