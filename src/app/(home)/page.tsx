"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { toCanvas } from "html-to-image";

type WindowState = "normal" | "closed" | "minimized" | "expanded";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t: number) => t * t;

function WindowChrome({ theme, children }: { theme: "light" | "dark"; children: React.ReactNode }) {
  const [state, setState] = useState<WindowState>("normal");
  const [animating, setAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snapshotRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const preMinimizeState = useRef<WindowState>("normal");

  const dragOffset = useRef({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOrigin = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragBounds = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });

  const borderClass = theme === "light" ? "border-white/40 bg-white/90" : "border-zinc-700 bg-zinc-900";
  const barBorder = theme === "light" ? "border-zinc-200" : "border-zinc-700";

  const resetDragOffset = () => {
    dragOffset.current = { x: 0, y: 0 };
    if (windowRef.current) windowRef.current.style.transform = "";
  };

  const handleBarPointerDown = (e: React.PointerEvent) => {
    if (state !== "normal" || animating || isClosing || !windowRef.current) return;
    if ((e.target as HTMLElement).closest("button")) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragOrigin.current = { ...dragOffset.current };

    const parent = windowRef.current.parentElement;
    if (parent) {
      const winRect = windowRef.current.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      dragBounds.current = {
        minX: dragOrigin.current.x + (parentRect.left - winRect.left),
        maxX: dragOrigin.current.x + (parentRect.right - winRect.right),
        minY: dragOrigin.current.y + (parentRect.top - winRect.top),
        maxY: dragOrigin.current.y + (parentRect.bottom - winRect.bottom),
      };
    }

    windowRef.current.style.transition = "none";
    dragBarRef.current?.setPointerCapture(e.pointerId);
  };

  const handleBarPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !windowRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    const rawX = dragOrigin.current.x + dx;
    const rawY = dragOrigin.current.y + dy;

    const { minX, maxX, minY, maxY } = dragBounds.current;
    const clampedX = clamp(rawX, Math.min(minX, maxX), Math.max(minX, maxX));
    const clampedY = clamp(rawY, Math.min(minY, maxY), Math.max(minY, maxY));

    dragOffset.current = { x: clampedX, y: clampedY };
    windowRef.current.style.transform = `translate(${dragOffset.current.x}px, ${dragOffset.current.y}px)`;
  };

  const handleBarPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || !windowRef.current) return;
    isDragging.current = false;
    windowRef.current.style.transition = "";

    if (dragBarRef.current?.hasPointerCapture(e.pointerId)) {
      dragBarRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleClose = () => {
    if (animating || isClosing || state === "closed") return;

    if (windowRef.current) {
      windowRef.current.style.opacity = "";
      windowRef.current.style.pointerEvents = "";
    }

    setIsClosing(true);
    setTimeout(() => {
      setState("closed");
      setIsClosing(false);
    }, 300);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === "expanded" || animating || isClosing || !windowRef.current) return;

    resetDragOffset();

    const el = windowRef.current;
    const parent = el.parentElement;
    if (!parent) {
      setState("expanded");
      return;
    }

    setAnimating(true);

    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const top = elRect.top - parentRect.top;
    const left = elRect.left - parentRect.left;

    el.style.transition = "none";
    el.style.position = "absolute";
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.width = `${elRect.width}px`;
    el.style.height = `${elRect.height}px`;
    el.style.maxWidth = "none";

    void el.offsetHeight;

    el.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    el.style.top = "0px";
    el.style.left = "0px";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.borderRadius = "0px";

    setTimeout(() => {
      setState("expanded");
      if (windowRef.current) {
        windowRef.current.style.transition = "";
        windowRef.current.style.position = "";
        windowRef.current.style.top = "";
        windowRef.current.style.left = "";
        windowRef.current.style.width = "";
        windowRef.current.style.height = "";
        windowRef.current.style.maxWidth = "";
        windowRef.current.style.borderRadius = "";
      }
      setAnimating(false);
    }, 400);
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.getContext("2d")!.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const renderGenie = (snapshot: HTMLCanvasElement, t: number, reverse: boolean) => {
    const canvas = canvasRef.current, windowEl = windowRef.current;
    if (!canvas || !windowEl) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const rect = windowEl.getBoundingClientRect(), parent = windowEl.parentElement?.getBoundingClientRect();
    if (!parent) return;

    const targetX = parent.left + parent.width / 2, targetY = parent.bottom - 22;
    const { height } = rect;

    for (let y = 0; y < height; y++) {
      const r = y / height;
      const xStart = reverse ? r * 0.65 : (1 - r) * 0.65;
      const xEase = easeInOut(clamp((t - xStart) / (1 - xStart), 0, 1));
      const yStart = reverse ? r * 0.2 : (1 - r) * 0.2;
      const yEase = easeIn(clamp((t - yStart) / (1 - yStart), 0, 1));

      const left = reverse ? lerp(targetX, rect.left, xEase) : lerp(rect.left, targetX, xEase);
      const right = reverse ? lerp(targetX, rect.right, xEase) : lerp(rect.right, targetX, xEase);
      const destinationY = reverse ? lerp(targetY, rect.top + y, yEase) : lerp(rect.top + y, targetY, yEase);

      const rowWidth = right - left;
      if (rowWidth < 0.5) continue;
      ctx.drawImage(snapshot, 0, y, snapshot.width, 1, left, destinationY, rowWidth, 1);
    }
  };

  const animate = (snapshot: HTMLCanvasElement, reverse: boolean, done: () => void) => {
    cancelAnimationFrame(rafRef.current ?? 0);
    setupCanvas();
    const start = performance.now();
    const frame = (time: number) => {
      const t = clamp((time - start) / 500, 0, 1);
      renderGenie(snapshot, t, reverse);
      t < 1 ? (rafRef.current = requestAnimationFrame(frame)) : done();
    };
    rafRef.current = requestAnimationFrame(frame);
  };

  const minimize = async () => {
    if (animating || isClosing || state === "minimized" || !windowRef.current) return;

    preMinimizeState.current = state;
    setAnimating(true);

    try {
      const snapshot = await toCanvas(windowRef.current, { pixelRatio: 1, cacheBust: false });
      snapshotRef.current = snapshot;
      windowRef.current.style.opacity = "0";
      windowRef.current.style.pointerEvents = "none";
      canvasRef.current!.style.display = "block";
      canvasRef.current!.style.zIndex = "100";
      animate(snapshot, false, () => {
        setState("minimized");
        setAnimating(false);
        resetDragOffset();
      });
    } catch (e) {
      console.error("Failed to create Genie snapshot:", e);
      setAnimating(false);
    }
  };

  const restore = () => {
    if (animating || state !== "minimized" || !windowRef.current || !snapshotRef.current) return;
    setAnimating(true);
    animate(snapshotRef.current, true, () => {
      windowRef.current!.style.opacity = "";
      windowRef.current!.style.pointerEvents = "";
      canvasRef.current!.style.display = "none";
      setState(preMinimizeState.current === "expanded" ? "expanded" : "normal");
      setAnimating(false);
    });
  };

  return (
    <>
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            if (isClosing || animating) return;
            if (state === "minimized") restore();
            else if (state === "closed") {
              setState("normal");
              preMinimizeState.current = "normal";
              resetDragOffset();
            }
          }}
          className={`font-general-sans text-xs hover:underline underline-offset-4 cursor-pointer ${
            theme === "light" ? "text-zinc-700 hover:text-zinc-900" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          What on earth are you doing
        </button>
      </div>

      {state !== "closed" && (
        <div
          ref={windowRef}
          className={`relative z-10 flex flex-col overflow-hidden border shadow-xl backdrop-blur transition-all duration-300 ease-in-out ${borderClass} ${
            state === "expanded"
              ? "!absolute inset-0 z-20 h-full w-full rounded-none"
              : "w-full max-w-xs rounded-xl"
          } ${isClosing ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <div
            ref={dragBarRef}
            className={`group flex touch-none items-center gap-1.5 border-b px-3 py-2 ${barBorder} ${
              state === "normal" ? "cursor-grab active:cursor-grabbing" : ""
            }`}
            onPointerDown={handleBarPointerDown}
            onPointerMove={handleBarPointerMove}
            onPointerUp={handleBarPointerUp}
            onPointerCancel={handleBarPointerUp}
          >
            <button type="button" aria-label="Close window" onClick={(e) => { e.stopPropagation(); handleClose(); }} className="relative flex h-3 w-3 items-center justify-center rounded-full bg-red-400">
              <svg className="h-1.5 w-1.5 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="#7A1414" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>

            <button type="button" aria-label="Minimize window" onClick={(e) => { e.stopPropagation(); minimize(); }} className="relative flex h-3 w-3 items-center justify-center rounded-full bg-amber-400">
              <svg className="h-1.5 w-1.5 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 8 8" fill="none"><path d="M1 4H7" stroke="#8A5A00" strokeWidth="1.2" strokeLinecap="round" /></svg>
            </button>

            <button type="button" aria-label="Expand window" onClick={handleExpand} className="relative flex h-3 w-3 items-center justify-center rounded-full bg-green-400">
              <svg className="h-1.5 w-1.5 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 8 8" fill="none"><path d="M1 2.5V1H2.5M5.5 1H7V2.5M7 5.5V7H5.5M2.5 7H1V5.5" stroke="#14532D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 hidden" style={{ zIndex: 100 }} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-[300px] flex-col items-center justify-center">
        <h1 className="pb-4 text-center font-panchang text-5xl font-bold">Every Apple<br />In The Basket.</h1>
        <p className="w-[600px] pb-4 text-center font-general-sans">Every iPhone, every Mac, every Apple device. Every spec, and every price. Laid out for quick answers or for a midnight rabbit hole session.</p>
        <Link href="/docs" className="flex h-11 items-center justify-center rounded-lg bg-black px-6 text-sm text-white transition-all duration-200 ease-out hover:bg-zinc-700">See what's in our basket right now</Link>
      </div>

      <div className="flex flex-col gap-4 px-4 py-8">
        <section className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-black md:h-[340px] md:flex-row">
          <div className="flex flex-col justify-center px-8 py-10 md:w-1/2 md:px-14">
            <h2 className="font-panchang text-3xl font-bold leading-tight text-white">Just tell me<br />which one</h2>
            <p className="mt-4 max-w-sm font-general-sans text-sm leading-relaxed text-zinc-400">Tell us what you need it for, your budget, and any other deal breakers. We'll point you in the right direction.</p>
            <Link href="/docs/guide" className="mt-4 inline-flex w-fit items-center gap-1 font-general-sans text-sm font-medium text-blue-400 hover:text-blue-300">Have a chat with our model <span aria-hidden>→</span></Link>
          </div>

          <div className="relative hidden items-center justify-center p-6 md:flex md:w-1/2" style={{ background: "linear-gradient(135deg, #E8E1FF 0%, #C9B8FF 100%)" }}>
            <WindowChrome theme="light">
              <div className="flex-1 space-y-1.5 overflow-y-auto p-3">
                <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-zinc-900 px-2.5 py-1.5 font-general-sans text-[10px] leading-snug text-white">ill mostly be studying, and ig i like the idea of having a powerful machine.. but its so freaking expensive !!</div>
                <p className="max-w-[85%] font-general-sans text-[10px] leading-snug text-zinc-500">Would you be daily-ing any video games of sorts?</p>
                <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-zinc-900 px-2.5 py-1.5 font-general-sans text-[10px] leading-snug text-white">maybe re4r once in a while, but nothing too intense id say</div>
                <p className="max-w-[85%] font-general-sans text-[10px] leading-snug text-zinc-500">Since Resident Evil 4 runs natively on iPadOS, and Macs are out of your budget, you could leverage an Apple Pencil to make notes more accessible.</p>
                <div className="max-w-[85%] rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-2 font-general-sans text-[10px] text-zinc-600">
                  <p className="font-medium text-zinc-900">iPad, From A$749</p>
                  <p className="mt-0.5 text-zinc-500">A16 · 11" Liquid Retina · Apple Pencil support</p>
                </div>
                <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-sm bg-zinc-900 px-2.5 py-1.5 font-general-sans text-[10px] leading-snug text-white">oh wow</div>
              </div>
            </WindowChrome>
          </div>
        </section>

        <section className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-black md:h-[340px] md:flex-row">
          <div className="flex flex-col justify-center px-8 py-10 md:w-1/2 md:px-14">
            <h2 className="font-panchang text-3xl font-bold leading-tight text-white">Give me<br />everything</h2>
            <p className="mt-4 max-w-sm font-general-sans text-sm leading-relaxed text-zinc-400">Our notes brief and elaborate on information about any detail you could possibly need to delve into.</p>
            <Link href="/docs/iphone-16" className="mt-4 inline-flex w-fit items-center gap-1 font-general-sans text-sm font-medium text-orange-400 hover:text-orange-300">Navigate our full documentation <span aria-hidden>→</span></Link>
          </div>

          <div className="relative hidden items-center justify-center p-6 md:flex md:w-1/2" style={{ background: "linear-gradient(135deg, #2A2A2E 0%, #17181C 100%)" }}>
            <WindowChrome theme="dark">
              <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] text-zinc-300">
                {[["Display", '6.3" Super Retina XDR'], ["Chip", "A19"], ["AU price", "$1399"], ["UK price", "£699"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-zinc-800 py-1.5 last:border-0">
                    <span className="text-zinc-500">{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </div>
        </section>
      </div>
    </>
  );
}