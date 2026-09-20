"use client";

// Vercel so mean :(
// I need to clean this code bruh

import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type PointerEvent as ReactPointerEvent,
	type RefObject,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "fumadocs-ui/provider/base";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Strands from "../../components/ui/Strands/Strands";
import Footer from "./Footer";
import useTimer from "@/components/ui/Timer/Timer";

const clarusInputPlaceholder = [
	"Clarus awaits your enquiry...",
	"Ask Clarus anything (Passionfruit related)...",
	"Coffee and Clarus time?",
	"Clarus is omnipotent regarding Apple",
	"Moof!",
	"Woof!",
	"Yip yap!",
	"Please Clarus, I need this. My Mac is kinda homeless, I live with my iPad.",
	"Clarus ponders on how she can can aid you on your quest...",
	"Did you know that you can message Clarus right here?",
	"Don't ask about actual passionfruits...",
	"Passionfruits taste good 👍",
];

// Never call this during render: the server and the client would pick different strings (hydration mismatch).
const pickPlaceholder = () =>
	clarusInputPlaceholder[
		Math.floor(Math.random() * clarusInputPlaceholder.length)
	];

// The chat page reads `?q=` and sends it as the first message.
// THIS IS NOT CONFIRMED YET AS I HAVEN'T FINISHED CLARUS YET
const CHAT_PATH = "/clarus/chat";
const CHIP_COUNT = 3;
const TYPING_IDLE_MS = 900; // stop counting as "typing" after this long without a keystroke
const GLASS_SIZE = 0.85; // shared with <Strands glassSize>, so chips can clear the orb
const ORB_BOX_H = 400; // px; keep in sync with the orb box's h-[400px]
const ORB_RADIUS = 0.46 * GLASS_SIZE * ORB_BOX_H; // px; same maths as RADIUS in Strands
const ASK_SCROLL_PX_PER_S = 25; // placeholder marquee speed (constant), used when the text is wider than the field
const ASK_SCROLL_PAUSE_MS = 1000; // how long the marquee holds still at each end
const FLOAT_MIN_WIDTH = 820; // narrower than this, chips sit under the orb instead

// Forcefield: chips slow down hard inside the soft zone and can never cross the rect edge.
const FIELD_WIDTH_RATIO = 0.45; // field edge distance from centre, as fraction of width
const FIELD_HEIGHT_RATIO = 0.5; // field edge distance from centre, as fraction of height
const FIELD_SOFTNESS = 200; // depth of the slowing zone (px)
const FIELD_DRAG_STRENGTH = 14; // free-motion outward damping at full depth (lower = fast throws reach the wall)
const FIELD_DRAG_GRAB = 0.1; // how much a dragged chip is slowed at full depth (0-1)
const FIELD_TANGENT_DRAG = 10; // sideways slowdown while touching a field edge (stops wall sliding)
const MAGNET_RADIUS = 330; // px from the orb centre; past this the orb pulls a chip back (same for every chip)
const MAGNET_PULL = 4; // orb pull strength per px of excess
const COAST_END_SPEED = 20; // px/s; a thrown chip counts as "stopped" below this, then the magnet may act
const CHIP_BOUNCE = 0.75; // chip-vs-chip restitution (1 = perfectly bouncy)
const FIELD_BOUNCE = 0.5; // share of speed kept when a chip hits the forcefield's hard edge
const FIELD_BOUNCE_MIN_SPEED = 60; // px/s; slower than this just stops at the edge (no jitter)
const CHIP_PADDING = 1.5; // extra px around each chip's hitbox
const HIDE_CHIPS_WHEN_OPEN = true; // true = quick-question chips fade out while the input chip is open

// When Adon finishes comparisons, then we can create queries to quick fire the docs page
const QUICK_QUESTIONS = [
	"iPhone 18 Pro vs iPhone Duo",
	"Cheapest Mac with 16GB RAM?",
	"Which AirPods have noise cancelling?",
	"How much is the latest iPad Pro?",
	"Does the iPad Air support Apple Pencil Pro?",
	"How long does the Apple Watch battery last?",
	"How much does the Vision Pro cost?",
	"iPad Air vs iPad Pro?",
	"iOS 27 vs iOS 26",
];

const coloursListDark = [
	"text-[#ff8993]",
	"text-[#efb8c6]",
	"text-[#fcf6ee]",
	"text-[#f2c747]",
];

const coloursListLight = [
	"text-[#ff8993]",
	"text-[#efb8c6]",
	"text-[#3B1438]",
	"text-[#f2c747]",
];

const words = [
	"Apple",
	"iPhone",
	"Macbook",
	"iPad",
	"Watch",
	"Airpod",
	"Vision",
	"Macintosh",
	"Homepod",
	"Display",
	"AppleTV",
];

const chipClass =
	"w-max max-w-[220px] rounded-full border border-zinc-300 bg-white/60 px-4 py-2 text-center text-sm leading-snug font-general-sans backdrop-blur transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/60 dark:hover:bg-zinc-800";

const ARMED_TIMEOUT_MS = 5000; // armed chip returns to its question after this long
const ARMED_LABEL = "Navigate to docs";
// Shared by the quick chips and the input chip so both fade at exactly the same rate.
// Important: chipClass has transition-colors, which would otherwise win and skip the fade.
const FADE_MS = 500; // keep in sync with duration-500 below
const FADE_CLASS = "!transition-all !duration-500 !ease-out";
const armedClass = "!border-blue-500 !bg-blue-500/15 text-blue-500";

// Where chips hover around the orb. sx = side (-1 left, 1 right), sy = height in orb radii
// (negative = above centre), gap = px between the orb's edge and the chip.
const SLOTS = [
	{ sx: -1, sy: -0.85, gap: 20 },
	{ sx: 1, sy: -0.8, gap: 24 },
	{ sx: -1, sy: 0.0, gap: 44 },
	{ sx: 1, sy: 0.1, gap: 44 },
	{ sx: -1, sy: 0.85, gap: 20 },
	{ sx: 1, sy: 0.8, gap: 24 },
];

// The input chip's home: centred, slightly below the orb's centre (sy = orb radii below centre).
const INPUT_SLOT = { sx: 0, sy: 0.6, gap: 0 };

// Every per-chip physics field at its starting value. ChipState is derived from this.
const BLANK_CHIP = {
	ox: 0,
	oy: 0,
	vx: 0,
	vy: 0, // offset from the anchor + velocity
	tx: 0,
	ty: 0, // drag target offset
	ox0: 0,
	oy0: 0,
	px0: 0,
	py0: 0, // where the current drag started
	lastPointerX: 0,
	lastPointerY: 0,
	lastPointerTime: 0,
	rx: 0,
	ry: 0, // last rendered centre (hitbox position)
	rhw: 0,
	rhh: 0, // last half size (0 until first frame)
	lvx: 0,
	lvy: 0, // measured on-screen velocity (used for dragged chips)
	bx0: 0,
	bx1: 0,
	by0: 0,
	by1: 0, // allowed centre range this frame (forcefield + box)
	drift: 1,
	dragging: false,
	moved: false,
	hover: false,
	coasting: false, // true from release/impact until the chip has lost its momentum
	knocked: false, // hit by another chip: skips the sludge so it reaches the edge and bounces
	active: true, // false while the chip is not shown (closed input chip, faded-out quick chips)
};

type ChipState = typeof BLANK_CHIP & {
	slot: (typeof SLOTS)[number];
	jx: number;
	jy: number; // fixed random nudge so the layout isn't rigid
	ph: number[];
	om: number[]; // idle-drift phases / speeds
};

// The pointer handlers the physics container hands to every chip (quick chips and the input chip alike).
type ChipPointer = {
	onPointerDown: (e: ReactPointerEvent<HTMLElement>) => void;
	onPointerMove: (e: ReactPointerEvent<HTMLElement>) => void;
	onPointerUp: () => void;
	onPointerCancel: () => void;
	onPointerEnter: () => void;
	onPointerLeave: () => void;
};

const clamp = (v: number, lo: number, hi: number) =>
	Math.min(Math.max(v, lo), Math.max(lo, hi));

// 0 at the start of the soft zone, 1 at the rect edge (smoothstep).
const fieldDepth = (distance: number, max: number) => {
	const start = max - FIELD_SOFTNESS;
	if (distance <= start) return 0;
	const p = clamp((distance - start) / FIELD_SOFTNESS, 0, 1);
	return p * p * (3 - 2 * p);
};

// Both labels share one grid cell, so the chip is always sized to the larger one
// and never changes size; the labels crossfade.
function ChipLabel({ text, armed }: { text: string; armed: boolean }) {
	return (
		<span className="grid">
			<span
				aria-hidden={armed}
				className={`col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-300 ${
					armed ? "opacity-0" : "opacity-100"
				}`}
			>
				{text}
			</span>
			<span
				aria-hidden={!armed}
				className={`col-start-1 row-start-1 flex items-center justify-center transition-opacity duration-300 ${
					armed ? "opacity-100" : "opacity-0"
				}`}
			>
				{ARMED_LABEL}
			</span>
		</span>
	);
}

// Text field + send button, shared by the floating input chip and the bar under the orb.
function AskField({
	value,
	onChange,
	inputRef,
	placeholder,
}: {
	value: string;
	onChange: (v: string) => void;
	inputRef: RefObject<HTMLInputElement | null>;
	placeholder: string;
}) {
	const boxRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLSpanElement>(null);
	const showPlaceholder = !value;

	// A placeholder wider than the field slowly scrolls to its end and back.
	// (Typed text already scrolls by itself, so only the placeholder needs this.)
	useEffect(() => {
		const box = boxRef.current;
		const text = textRef.current;
		if (!box || !text) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let anim: Animation | undefined;

		const start = () => {
			anim?.cancel();
			anim = undefined;
			const overflow = text.offsetWidth - box.clientWidth;
			if (overflow <= 1 || reduceMotion) return;

			// Linear travel at a fixed speed with fixed holds at each end (no easing anywhere).
			// "alternate" plays the keyframes backwards on every other pass, so a hold at the end of
			// one pass plus a hold at the start of the next add up: each pass holds half the pause.
			const holdMs = ASK_SCROLL_PAUSE_MS / 1.2;
			const travelMs = (overflow / ASK_SCROLL_PX_PER_S) * 2500;
			const duration = travelMs + 2 * holdMs;
			const f = holdMs / duration;
			anim = text.animate(
				[
					{ transform: "translateX(0)", offset: 0 },
					{ transform: "translateX(0)", offset: f },
					{ transform: `translateX(-${overflow}px)`, offset: 1 - f },
					{ transform: `translateX(-${overflow}px)`, offset: 1 },
				],
				{
					duration,
					iterations: Infinity,
					direction: "alternate",
					easing: "linear",
				},
			);
		};

		const ro = new ResizeObserver(start);
		ro.observe(box);
		start();
		return () => {
			ro.disconnect();
			anim?.cancel();
		};
	}, [placeholder, showPlaceholder]);

	return (
		<>
			<div ref={boxRef} className="relative min-w-0 flex-1 overflow-hidden">
				<input
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onPointerDown={(e) => e.stopPropagation()}
					aria-label={placeholder}
					maxLength={300}
					autoComplete="off"
					className="w-full min-w-0 cursor-text select-text bg-transparent text-sm font-general-sans outline-none"
				/>
				{showPlaceholder && (
					<span
						aria-hidden
						className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
					>
						<span
							ref={textRef}
							className="whitespace-nowrap text-sm font-general-sans text-zinc-400 will-change-transform"
						>
							{placeholder}
						</span>
					</span>
				)}
			</div>
			<button
				type="submit"
				aria-label="Send to Clarus"
				disabled={!value.trim()}
				onPointerDown={(e) => e.stopPropagation()}
				className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white transition-opacity disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
			>
				<ArrowRightIcon size={16} weight="bold" />
			</button>
		</>
	);
}

// One quick-question chip. The wrapper div is what the physics loop moves around;
// the button inside fades and scales in and out.
function QuickChip({
	text,
	armed,
	hidden,
	ready,
	pointer,
	setRef,
	onClick,
}: {
	text: string;
	armed: boolean;
	hidden: boolean; // faded out (the input chip is open)
	ready: boolean; // first frame has run, so the chip may fade in
	pointer: ChipPointer;
	setRef: (el: HTMLDivElement | null) => void;
	onClick: () => void;
}) {
	return (
		<div
			ref={setRef}
			inert={hidden}
			className="absolute left-0 top-0 will-change-transform"
		>
			<button
				type="button"
				{...pointer}
				onClick={onClick}
				data-chip
				className={`${chipClass} ${
					armed ? armedClass : ""
				} cursor-grab touch-none select-none active:cursor-grabbing ${FADE_CLASS} ${
					ready && !hidden
						? "pointer-events-auto scale-100 opacity-100"
						: "pointer-events-none scale-90 opacity-0"
				}`}
			>
				<ChipLabel text={text} armed={armed} />
			</button>
		</div>
	);
}

// The chip you type into. It behaves like the quick chips (same physics) but is only shown while `open`.
function InputChip({
	open,
	ready,
	pointer,
	setRef,
	value,
	onChange,
	onSubmit,
	inputRef,
	placeholder,
}: {
	open: boolean;
	ready: boolean;
	pointer: ChipPointer;
	setRef: (el: HTMLDivElement | null) => void;
	value: string;
	onChange: (v: string) => void;
	onSubmit: () => void;
	inputRef: RefObject<HTMLInputElement | null>;
	placeholder: string;
}) {
	return (
		<div
			ref={setRef}
			inert={!open}
			className="absolute left-0 top-0 will-change-transform"
		>
			<form
				aria-hidden={!open}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				{...pointer}
				className={`flex h-12 w-[340px] max-w-[80vw] cursor-grab touch-none select-none items-center gap-2 rounded-full border border-zinc-300 bg-white/70 pl-5 pr-2 backdrop-blur ${FADE_CLASS} active:cursor-grabbing dark:border-zinc-700 dark:bg-zinc-900/70 ${
					ready && open
						? "pointer-events-auto scale-100 opacity-100"
						: "pointer-events-none scale-90 opacity-0"
				}`}
			>
				<AskField
					value={value}
					onChange={onChange}
					inputRef={inputRef}
					placeholder={placeholder}
				/>
			</form>
		</div>
	);
}

// The container: owns the physics for all chips and lays them out. The chips themselves are QuickChip / InputChip.
function FloatingChips({
	chips,
	hidden,
	armed,
	onPick,
	input,
}: {
	chips: string[];
	hidden: boolean;
	armed: string | null;
	onPick: (q: string) => void;
	input: {
		open: boolean;
		value: string;
		onChange: (v: string) => void;
		onSubmit: () => void;
		inputRef: RefObject<HTMLInputElement | null>;
		placeholder: string;
	};
}) {
	const boxRef = useRef<HTMLDivElement>(null);
	const refs = useRef<(HTMLDivElement | null)[]>([]);
	const states = useRef<ChipState[]>([]);
	const inputOpenRef = useRef(input.open);
	inputOpenRef.current = input.open;
	const hiddenRef = useRef(hidden);
	hiddenRef.current = hidden;
	const activePointer = useRef<{
		index: number;
		pointerId: number;
	} | null>(null);

	const [ready, setReady] = useState(false);

	useEffect(() => {
		const id = requestAnimationFrame(() => {
			setReady(true);
		});

		return () => cancelAnimationFrame(id);
	}, []);

	// Ends a drag. The chip keeps its momentum, so the magnet waits until it has slowed down.
	const release = useCallback((i: number) => {
		const s = states.current[i];
		if (!s) return;
		s.dragging = false;
		s.coasting = true;
		if (activePointer.current?.index === i) activePointer.current = null;
	}, []);

	useEffect(() => {
		const box = boxRef.current;
		if (!box) return;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const rnd = (a: number, b: number) => a + Math.random() * (b - a);

		const picked = [...SLOTS]
			.sort(() => Math.random() - 0.5)
			.slice(0, chips.length);

		// One extra state at the end: the input chip.
		states.current = Array.from(
			{ length: chips.length + 1 },
			(_, i): ChipState => {
				const isInput = i === chips.length;
				return {
					...BLANK_CHIP,
					slot: isInput ? INPUT_SLOT : picked[i],
					jx: isInput ? 0 : rnd(-10, 10),
					jy: isInput ? 0 : rnd(-10, 10),
					ph: [rnd(0, 6.28), rnd(0, 6.28), rnd(0, 6.28), rnd(0, 6.28)],
					om: [rnd(0.45, 0.8), rnd(0.4, 0.75)],
				};
			},
		);

		// A release anywhere in the window ends the active drag.
		const onWindowRelease = (e: PointerEvent) => {
			const active = activePointer.current;
			if (active && active.pointerId === e.pointerId) release(active.index);
		};

		window.addEventListener("pointerup", onWindowRelease);
		window.addEventListener("pointercancel", onWindowRelease);

		let last = performance.now();
		let raf = 0;

		const tick = (now: number) => {
			raf = requestAnimationFrame(tick);
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;

			if (dt <= 0) return;

			const t = now / 1000;
			const W = box.clientWidth;
			const H = box.clientHeight;

			const FIELD_HALF_WIDTH = W * FIELD_WIDTH_RATIO;
			const FIELD_HALF_HEIGHT = H * FIELD_HEIGHT_RATIO;

			states.current.forEach((s, i) => {
				const el = refs.current[i];
				if (!el) return;

				const hw = el.offsetWidth / 2;
				const hh = el.offsetHeight / 2;
				const isInput = i === chips.length;

				const R = 0.46 * GLASS_SIZE * H;
				const ay = H / 2 + s.slot.sy * R + s.jy;
				const yNear = Math.max(0, Math.abs(s.slot.sy * R) - hh);
				const half = yNear < R ? Math.sqrt(R * R - yNear * yNear) : 0;
				const ax = clamp(
					W / 2 + s.slot.sx * (half + s.slot.gap + hw) + s.jx,
					hw + 4,
					W - hw - 4,
				);

				// Forcefield limits for the chip centre.
				const maxX = Math.min(FIELD_HALF_WIDTH - hw, W / 2 - hw);
				const maxY = Math.min(FIELD_HALF_HEIGHT - hh, H / 2 - hh);

				if (s.dragging) {
					// Target can never sit outside the rect.
					const tgtX = clamp(ax + s.tx, W / 2 - maxX, W / 2 + maxX) - ax;
					const tgtY = clamp(ay + s.ty, H / 2 - maxY, H / 2 + maxY) - ay;

					const cx = ax + s.ox;
					const cy = ay + s.oy;

					const outX = tgtX - s.ox;
					const outY = tgtY - s.oy;
					const outwardX = cx > W / 2 ? outX > 0 : outX < 0;
					const outwardY = cy > H / 2 ? outY > 0 : outY < 0;

					const depthX = fieldDepth(Math.abs(cx - W / 2), maxX);
					const depthY = fieldDepth(Math.abs(cy - H / 2), maxY);

					const baseFollow = 1 - Math.exp(-dt * 40);
					const followX =
						baseFollow * (outwardX ? 1 - depthX * FIELD_DRAG_GRAB : 1);
					const followY =
						baseFollow * (outwardY ? 1 - depthY * FIELD_DRAG_GRAB : 1);

					s.ox += outX * followX;
					s.oy += outY * followY;
				} else {
					// Free physics
					const speed = Math.hypot(s.vx, s.vy);
					const friction = speed < 30 ? 5.5 : 1.7;
					const damping = Math.exp(-friction * dt);

					s.vx *= damping;
					s.vy *= damping;

					s.ox += s.vx * dt;
					s.oy += s.vy * dt;

					const centerX = ax + s.ox;
					const centerY = ay + s.oy;

					// Forcefield: heavy outward damping inside the soft zone. Sideways motion
					// is slowed too, so a chip thrown at an edge cannot slide along it.
					const depthX = fieldDepth(Math.abs(centerX - W / 2), maxX);
					if (depthX > 0) {
						const outward = centerX > W / 2 ? s.vx > 0 : s.vx < 0;
						if (outward && !s.knocked)
							s.vx *= Math.exp(-depthX * FIELD_DRAG_STRENGTH * dt);
						s.vy *= Math.exp(-depthX * FIELD_TANGENT_DRAG * dt);
					}

					const depthY = fieldDepth(Math.abs(centerY - H / 2), maxY);
					if (depthY > 0) {
						const outward = centerY > H / 2 ? s.vy > 0 : s.vy < 0;
						if (outward && !s.knocked)
							s.vy *= Math.exp(-depthY * FIELD_DRAG_STRENGTH * dt);
						s.vx *= Math.exp(-depthY * FIELD_TANGENT_DRAG * dt);
					}

					// The magnet stays off while a throw still has momentum.
					if (s.coasting && Math.hypot(s.vx, s.vy) < COAST_END_SPEED)
						s.coasting = false;
					if (s.knocked && Math.hypot(s.vx, s.vy) < COAST_END_SPEED)
						s.knocked = false;

					// MAGNETIC ORB ATTRACTION: gentle pull back once a chip wanders too far from the orb.
					const orbDx = W / 2 - (ax + s.ox);
					const orbDy = H / 2 - (ay + s.oy);
					const distToOrbCenter = Math.hypot(orbDx, orbDy);

					if (!s.coasting && distToOrbCenter > MAGNET_RADIUS) {
						const excess = distToOrbCenter - MAGNET_RADIUS;

						s.vx += (orbDx / distToOrbCenter) * excess * MAGNET_PULL * dt;
						s.vy += (orbDy / distToOrbCenter) * excess * MAGNET_PULL * dt;

						// Extra lazy drag while pulling so the glide is smooth.
						s.vx *= Math.exp(-1.5 * dt);
						s.vy *= Math.exp(-1.5 * dt);
					}
				}

				// HARD LIMIT: never past the rect, drag or not.
				const hcx = ax + s.ox;
				const hcy = ay + s.oy;
				const clx = clamp(hcx, W / 2 - maxX, W / 2 + maxX);
				const cly = clamp(hcy, H / 2 - maxY, H / 2 + maxY);

				// The only place the forcefield bounces a chip: hitting the hard edge.
				const wall = (v: number) =>
					s.dragging || Math.abs(v) < FIELD_BOUNCE_MIN_SPEED
						? 0
						: -v * FIELD_BOUNCE;

				if (clx !== hcx) {
					s.ox += clx - hcx;
					if ((clx > W / 2 && s.vx > 0) || (clx < W / 2 && s.vx < 0)) {
						s.vx = wall(s.vx);
						s.knocked = false;
					}
				}
				if (cly !== hcy) {
					s.oy += cly - hcy;
					if ((cly > H / 2 && s.vy > 0) || (cly < H / 2 && s.vy < 0)) {
						s.vy = wall(s.vy);
						s.knocked = false;
					}
				}

				// Idle Drift
				const idleSpeed = Math.hypot(s.vx, s.vy);
				const shouldDrift =
					!s.dragging && !s.hover && !reduceMotion && idleSpeed < 12;
				s.drift += ((shouldDrift ? 1 : 0) - s.drift) * (1 - Math.exp(-dt * 4));

				const dx =
					Math.sin(t * s.om[0] + s.ph[0]) * 5 +
					Math.sin(t * s.om[1] * 1.7 + s.ph[1]) * 2;
				const dy =
					Math.sin(t * s.om[1] + s.ph[2]) * 4 +
					Math.sin(t * s.om[0] * 1.6 + s.ph[3]) * 2;

				const x = clamp(
					ax + s.ox + dx * s.drift,
					Math.max(hw, W / 2 - maxX),
					Math.min(W - hw, W / 2 + maxX),
				);
				const y = clamp(
					ay + s.oy + dy * s.drift,
					Math.max(hh, H / 2 - maxY),
					Math.min(H - hh, H / 2 + maxY),
				);

				if (s.rhw) {
					s.lvx = clamp((x - s.rx) / dt, -3000, 3000);
					s.lvy = clamp((y - s.ry) / dt, -3000, 3000);
				}
				s.rx = x;
				s.ry = y;
				s.rhw = hw;
				s.rhh = hh;
				s.bx0 = Math.max(hw, W / 2 - maxX);
				s.bx1 = Math.min(W - hw, W / 2 + maxX);
				s.by0 = Math.max(hh, H / 2 - maxY);
				s.by1 = Math.min(H - hh, H / 2 + maxY);
				s.active = isInput ? inputOpenRef.current : !hiddenRef.current;
			});

			// Chip-vs-chip collisions on this frame's final positions, so chips never overlap.
			const list = states.current;
			const ITERATIONS = 6;
			for (let it = 0; it < ITERATIONS; it++) {
				const lastIt = it === ITERATIONS - 1;

				for (let a = 0; a < list.length; a++) {
					for (let b = a + 1; b < list.length; b++) {
						const A = list[a];
						const B = list[b];
						if (!A.rhw || !B.rhw || !A.active || !B.active) continue;
						if (A.dragging && B.dragging) continue;

						const cdx = B.rx - A.rx;
						const cdy = B.ry - A.ry;
						const overlapX = A.rhw + B.rhw + CHIP_PADDING - Math.abs(cdx);
						const overlapY = A.rhh + B.rhh + CHIP_PADDING - Math.abs(cdy);
						if (overlapX <= 0 || overlapY <= 0) continue;

						// Resolve along the axis with the smaller overlap.
						const alongX = overlapX < overlapY;
						const nx = alongX ? (cdx >= 0 ? 1 : -1) : 0;
						const ny = alongX ? 0 : cdy >= 0 ? 1 : -1;
						const pen = alongX ? overlapX : overlapY;

						// A dragged chip is immovable, except on the last pass: whatever still
						// overlaps then is a chip pinned against a wall, so the dragged chip yields.
						let wa = A.dragging ? 0 : 1;
						let wb = B.dragging ? 0 : 1;
						if (lastIt) {
							if (A.dragging) {
								wa = 1;
								wb = 0;
							} else if (B.dragging) {
								wa = 0;
								wb = 1;
							}
						}
						const wsum = wa + wb;

						const dAx = (-nx * pen * wa) / wsum;
						const dAy = (-ny * pen * wa) / wsum;
						const dBx = (nx * pen * wb) / wsum;
						const dBy = (ny * pen * wb) / wsum;
						A.ox += dAx;
						A.oy += dAy;
						A.rx += dAx;
						A.ry += dAy;
						B.ox += dBx;
						B.oy += dBy;
						B.rx += dBx;
						B.ry += dBy;

						// Bounce.
						const avx = A.dragging ? A.lvx : A.vx;
						const avy = A.dragging ? A.lvy : A.vy;
						const bvx = B.dragging ? B.lvx : B.vx;
						const bvy = B.dragging ? B.lvy : B.vy;
						const rv = (bvx - avx) * nx + (bvy - avy) * ny;

						if (rv < 0) {
							const freeSum = (A.dragging ? 0 : 1) + (B.dragging ? 0 : 1);
							const j = (-(1 + CHIP_BOUNCE) * rv) / freeSum;
							if (!A.dragging) {
								A.vx = clamp(A.vx - j * nx, -3000, 3000);
								A.vy = clamp(A.vy - j * ny, -3000, 3000);
								A.coasting = true;
								A.knocked = true;
							}
							if (!B.dragging) {
								B.vx = clamp(B.vx + j * nx, -3000, 3000);
								B.vy = clamp(B.vy + j * ny, -3000, 3000);
								B.coasting = true;
								B.knocked = true;
							}
						}
					}
				}

				// Keep every chip inside the forcefield rect after being pushed.
				list.forEach((c) => {
					if (!c.rhw || !c.active) return;
					const nxp = clamp(c.rx, c.bx0, c.bx1);
					const nyp = clamp(c.ry, c.by0, c.by1);
					c.ox += nxp - c.rx;
					c.oy += nyp - c.ry;
					c.rx = nxp;
					c.ry = nyp;
				});
			}

			// Render.
			list.forEach((s, i) => {
				const el = refs.current[i];
				if (el)
					el.style.transform = `translate(${s.rx}px, ${s.ry}px) translate(-50%, -50%)`;
			});
		};

		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointerup", onWindowRelease);
			window.removeEventListener("pointercancel", onWindowRelease);
		};
	}, [chips, release]);

	// Input chip appears at its home spot every time it opens.
	useEffect(() => {
		if (!input.open) return;
		const s = states.current[chips.length];
		if (!s) return;
		s.ox = 0;
		s.oy = 0;
		s.vx = 0;
		s.vy = 0;
		s.tx = 0;
		s.ty = 0;
		s.dragging = false;
		s.coasting = false;

		// Focus after the chip is no longer inert, so typing works straight away.
		const id = requestAnimationFrame(() =>
			input.inputRef.current?.focus({ preventScroll: true }),
		);
		return () => cancelAnimationFrame(id);
	}, [input.open, input.inputRef, chips.length]);

	const down = (i: number, e: ReactPointerEvent<HTMLElement>) => {
		const s = states.current[i];
		if (!s || (e.pointerType === "mouse" && e.button !== 0)) return;

		s.vx = 0;
		s.vy = 0;
		s.knocked = false;
		s.dragging = true;
		s.moved = false;
		s.px0 = e.clientX;
		s.py0 = e.clientY;
		s.ox0 = s.ox;
		s.oy0 = s.oy;
		s.tx = s.ox;
		s.ty = s.oy;

		s.lastPointerX = e.clientX;
		s.lastPointerY = e.clientY;
		s.lastPointerTime = e.timeStamp;

		activePointer.current = { index: i, pointerId: e.pointerId };
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const move = (i: number, e: ReactPointerEvent<HTMLElement>) => {
		const s = states.current[i];
		if (!s?.dragging) return;

		const dx = e.clientX - s.px0;
		const dy = e.clientY - s.py0;
		if (Math.hypot(dx, dy) > 5) s.moved = true;

		const elapsed = (e.timeStamp - s.lastPointerTime) / 1000;

		if (elapsed > 0 && elapsed < 0.1) {
			const pointerVx = (e.clientX - s.lastPointerX) / elapsed;
			const pointerVy = (e.clientY - s.lastPointerY) / elapsed;
			const velocityBlend = 0.8;

			s.vx = s.vx * (1 - velocityBlend) + pointerVx * velocityBlend;
			s.vy = s.vy * (1 - velocityBlend) + pointerVy * velocityBlend;
			s.vx = clamp(s.vx, -3000, 3000);
			s.vy = clamp(s.vy, -3000, 3000);
		}

		s.lastPointerX = e.clientX;
		s.lastPointerY = e.clientY;
		s.lastPointerTime = e.timeStamp;

		s.tx = s.ox0 + dx;
		s.ty = s.oy0 + dy;
	};

	// Pointer handlers shared by the quick chips (i < chips.length) and the input chip (i === chips.length).
	const bind = (i: number) => ({
		onPointerDown: (e: ReactPointerEvent<HTMLElement>) => down(i, e),
		onPointerMove: (e: ReactPointerEvent<HTMLElement>) => move(i, e),
		onPointerUp: () => release(i),
		onPointerCancel: () => release(i),
		onPointerEnter: () => {
			const s = states.current[i];
			if (s) s.hover = true;
		},
		onPointerLeave: () => {
			const s = states.current[i];
			if (s) s.hover = false;
		},
	});

	// Each chip registers its wrapper element here so the physics loop can move it.
	const refFor = (i: number) => (el: HTMLDivElement | null) => {
		refs.current[i] = el;
	};

	return (
		<div ref={boxRef} className="pointer-events-none absolute inset-0">
			{chips.map((q, i) => (
				<QuickChip
					key={q}
					text={q}
					armed={armed === q}
					hidden={hidden}
					ready={ready}
					pointer={bind(i)}
					setRef={refFor(i)}
					onClick={() => {
						const s = states.current[i];
						if (s?.moved) {
							s.moved = false; // that was a drag, not a click
							return;
						}
						onPick(q);
					}}
				/>
			))}

			<InputChip
				open={input.open}
				ready={ready}
				pointer={bind(chips.length)}
				setRef={refFor(chips.length)}
				value={input.value}
				onChange={input.onChange}
				onSubmit={input.onSubmit}
				inputRef={input.inputRef}
				placeholder={input.placeholder}
			/>
		</div>
	);
}

export default function HomePage() {
	const seconds = useTimer();

	const router = useRouter();
	const { resolvedTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	const coloursList =
		isMounted && resolvedTheme === "light" ? coloursListLight : coloursListDark;
	const [order, setOrder] = useState([0, 1, 2, 3]);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const colours = order.map((i) => coloursList[i]);

	const [chips, setChips] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const typingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const orbBoxRef = useRef<HTMLDivElement>(null);
	const [floating, setFloating] = useState(false);
	const [armed, setArmed] = useState<string | null>(null);
	// Starts as a fixed string so the server HTML matches the client; re-rolled after mount and every time the input closes.
	const [placeholder, setPlaceholder] = useState(clarusInputPlaceholder[0]);

	// Hint under the orb: fades in after 5s, and is gone for good once the user touches the orb or a chip.
	const [interacted, setInteracted] = useState(false);
	const showHint = seconds >= 5 && !open && !interacted;

	useEffect(() => {
		setCurrentWordIndex(Math.floor(Math.random() * words.length));
		setOrder([0, 1, 2, 3].sort(() => Math.random() - 0.5));
		setChips(
			[...QUICK_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, CHIP_COUNT),
		);
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const el = orbBoxRef.current;
		if (!el) return;
		const measure = () => setFloating(el.clientWidth >= FLOAT_MIN_WIDTH);
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const toggle = useCallback(() => setOpen((o) => !o), []);

	useEffect(() => {
		if (open) {
			inputRef.current?.focus();
			setArmed(null);
			return;
		}
		clearTimeout(typingTimer.current);
		setIsTyping(false);

		// Swap the placeholder only once the input has fully faded out (also runs once after mount).
		const id = setTimeout(
			() => setPlaceholder(pickPlaceholder()),
			FADE_MS + 100,
		);
		return () => clearTimeout(id);
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	useEffect(() => () => clearTimeout(typingTimer.current), []);

	const handleChange = (value: string) => {
		setQuery(value);
		setIsTyping(true);
		clearTimeout(typingTimer.current);
		typingTimer.current = setTimeout(() => setIsTyping(false), TYPING_IDLE_MS);
	};

	const send = (q: string) => {
		const text = q.trim();
		if (!text) return;
		router.push(`${CHAT_PATH}?q=${encodeURIComponent(text)}`);
	};

	// First click arms the chip (label changes), second click sends.
	const pickChip = (q: string) => {
		if (armed === q) {
			setArmed(null);
			send(q);
		} else {
			setArmed(q);
		}
	};

	useEffect(() => {
		if (!armed) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!(e.target as HTMLElement | null)?.closest("[data-chip]"))
				setArmed(null);
		};
		document.addEventListener("pointerdown", onPointerDown);
		const timer = setTimeout(() => setArmed(null), ARMED_TIMEOUT_MS);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			clearTimeout(timer);
		};
	}, [armed]);

	const energy = open ? (isTyping ? 1 : 0.4) : 0;

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-12 py-12 min-h-[90vh]">
				<h1 className="pb text-center font-panchang text-5xl font-bold">
					Every{" "}
					<span className="relative inline-flex justify-start max-w-[355px] font-sprite text-7xl">
						{(isMounted ? words[currentWordIndex] : words[0])
							.split("")
							.map((letter, index) => (
								<span key={index} className={colours[index % colours.length]}>
									{letter}
								</span>
							))}
					</span>
					<br />
					In The Basket.
				</h1>

				<div ref={wrapRef} className="flex w-full flex-col items-center gap-2">
					<div
						ref={orbBoxRef}
						onPointerDownCapture={() => setInteracted(true)}
						className="relative h-[400px] w-full overflow-x-clip"
					>
						<Strands
							colors={["#ffffff", "#63f398", "#5379ff", "#f3c44c", "#f09a78"]}
							glass
							draggable
							stretchIntensity={0.1}
							dragSensitivity={0.4}
							liquidWobble={0.06}
							liquidSpeed={1}
							refraction={1.7}
							dispersion={4}
							glassSize={GLASS_SIZE}
							hueShift={0}
							energy={energy}
							onTap={toggle}
						/>

						{/* Hint sits just under the orb's bottom edge (orb centre + radius). */}
						<p
							aria-hidden={!showHint}
							className={`pointer-events-none absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-center font-mono text-xs text-zinc-500 pt-2 transition-opacity duration-[1100ms] ease-out ${
								showHint ? "opacity-100" : "opacity-0"
							}`}
							style={{ top: `calc(50% + ${ORB_RADIUS}px + 12px)` }}
						>
							Stretch the orb, play with the chips. Press the orb to chat with
							Clarus.
						</p>

						{floating && chips.length > 0 && (
							<FloatingChips
								chips={chips}
								hidden={HIDE_CHIPS_WHEN_OPEN && open}
								armed={armed}
								onPick={pickChip}
								input={{
									open,
									value: query,
									onChange: handleChange,
									onSubmit: () => send(query),
									inputRef,
									placeholder,
								}}
							/>
						)}

						<button
							type="button"
							onClick={toggle}
							aria-expanded={open}
							className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-2 focus:-translate-x-1/2 focus:rounded-md focus:bg-zinc-800 focus:px-3 focus:py-1 focus:text-sm focus:text-white"
						>
							{open ? "Close Clarus input" : "Ask Clarus"}
						</button>
					</div>

					{!floating && (
						<div className="relative h-28 w-full max-w-2xl sm:h-14">
							<div
								inert={open}
								aria-hidden={open}
								className={`absolute inset-0 flex flex-wrap content-center items-center justify-center gap-2 transition-all duration-300 ${
									open
										? "pointer-events-none translate-y-2 opacity-0"
										: "opacity-100"
								}`}
							>
								{chips.map((q) => (
									<button
										key={q}
										type="button"
										data-chip
										onClick={() => pickChip(q)}
										className={`${chipClass} ${armed === q ? armedClass : ""}`}
									>
										<ChipLabel text={q} armed={armed === q} />
									</button>
								))}
							</div>

							<form
								inert={!open}
								aria-hidden={!open}
								onSubmit={(e) => {
									e.preventDefault();
									send(query);
								}}
								className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
									open
										? "opacity-100"
										: "pointer-events-none -translate-y-2 opacity-0"
								}`}
							>
								<div className="flex h-12 w-full max-w-lg items-center gap-2 rounded-full border border-zinc-300 bg-white/70 pl-5 pr-2 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/70">
									<AskField
										value={query}
										onChange={handleChange}
										inputRef={inputRef}
										placeholder={placeholder}
									/>
								</div>
							</form>
						</div>
					)}
				</div>

				<div className="flex flex-col items-center justify-left">
					<p className="w-[500px] pb-4 text-center font-general-sans">
						Every Apple device. Every spec. Every price. All laid out and
						documented for quick answers from{" "}
						<a
							href={CHAT_PATH}
							className="group relative inline-flex items-center gap-1 align-baseline text-blue-500
                after:absolute after:inset-x-0 after:bottom-[3px] after:h-[2px] after:bg-current
                after:opacity-0 hover:after:opacity-100"
						>
							Clarus
							<ArrowRightIcon
								className="transition-transform duration-100 group-hover:-rotate-45"
								size={20}
								weight="bold"
							/>
						</a>{" "}
						or for a journey down this concerningly deep rabbit hole.
					</p>

					<div className="inline-flex gap-4 p-4">
						<Link
							href="/docs"
							className="flex h-11 items-center justify-center rounded-lg bg-[#ff8993] dark:text-black text-white hover:bg-[#D06D75] px-6 text-sm transition-all duration-200 ease-out"
						>
							Explore our basket
						</Link>
						<Link
							href="https://github.com/omeriadon/passionfruit"
							className="flex h-11 items-center justify-center rounded-lg dark:text-zinc-900 hover:bg-zinc-500 dark:bg-white bg-zinc-800 text-white dark:hover:bg-zinc-300 px-6 text-sm transition-all duration-200 ease-out"
						>
							View on Github
						</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4 px-4 py-8"></div>

			<Footer />
		</>
	);
}
