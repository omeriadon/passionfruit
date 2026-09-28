import React, {
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode,
} from "react";
import "./GlideSelect.css";
import { useTheme } from "fumadocs-ui/provider/base";

export interface GlideSelectOption {
	value: string;
	label: ReactNode;
	tag?: string;
}

export interface GlideSelectProps {
	options?: (string | GlideSelectOption)[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string, option: GlideSelectOption) => void;
	onActiveItemChange?: (option: GlideSelectOption | null) => void;
	placeholder?: string;
	showTags?: boolean;
	alwaysOpen?: boolean;
	autoCycle?: boolean; // controlled by the parent: true while the parent's own cycle logic is running
	onAutoCycleInterrupt?: () => void; // fired when the user touches the list while autoCycle is true
	accentColour?: string; // overrides the theme palette when passed
	surfaceColour?: string; // overrides the theme palette when passed
	highlightColour?: string; // overrides the theme palette when passed
	textColour?: string; // overrides the theme palette when passed
	size?: "sm" | "md" | "lg";
	radius?: number;
	menuWidth?: number;
	placement?: "top" | "bottom";
	alignment?: "left" | "right";
	popDuration?: number;
	glideDuration?: number;
	rememberPosition?: boolean;
	disabled?: boolean;
	ariaLabel?: string;
	className?: string;
}

type Phase = "closed" | "open" | "closing";

const SIZES: Record<string, { chip: number; row: number; font: number }> = {
	sm: { chip: 28, row: 26, font: 12 },
	md: { chip: 32, row: 30, font: 13 },
	lg: { chip: 44, row: 40, font: 14 },
};

const PAD = 4;
const GAP = 1;
const MENU_GAP = 6;
const DEFAULT_OPTIONS: (string | GlideSelectOption)[] = ["One", "Two", "Three"];

const PALETTE_DARK = {
	accent: "#f5f5f5",
	surface: "#27272a",
	highlight: "#3f3f46",
	text: "#f5f5f5",
};

const PALETTE_LIGHT = {
	accent: "#18181b",
	surface: "#E2E2E2",
	highlight: "#B3BCBF",
	text: "#18181b",
};

const norm = (o: string | GlideSelectOption): GlideSelectOption =>
	typeof o === "string" ? { value: o, label: o } : o;
const textOf = (it: GlideSelectOption) =>
	typeof it.label === "string" ? it.label : it.value;
const typeaheadIndex = (
	items: GlideSelectOption[],
	from: number,
	ch: string,
) => {
	const c = ch.toLowerCase();
	const n = items.length;
	for (let k = 1; k <= n; k++) {
		const i = (from + k) % n;
		if (textOf(items[i]).toLowerCase().startsWith(c)) return i;
	}
	return from;
};

const GlideSelect: React.FC<GlideSelectProps> = ({
	options = DEFAULT_OPTIONS,
	value,
	defaultValue,
	onChange,
	onActiveItemChange,
	placeholder = "Select...",
	showTags = true,
	alwaysOpen = false,
	autoCycle = false,
	onAutoCycleInterrupt,
	accentColour,
	surfaceColour,
	highlightColour,
	textColour,
	size = "md",
	radius = 10,
	menuWidth = 176,
	placement = "bottom",
	alignment = "left",
	popDuration = 110,
	glideDuration = 250,
	rememberPosition = true,
	disabled = false,
	ariaLabel = "Select",
	className = "",
}) => {
	const { resolvedTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => setIsMounted(true), []);
	const isLight = isMounted && resolvedTheme === "light";
	const palette = isLight ? PALETTE_LIGHT : PALETTE_DARK;

	const items = options.map(norm);
	const [inner, setInner] = useState(defaultValue ?? "");
	const current = value ?? inner;
	const selected = items.findIndex((it) => it.value === current);
	const [phase, setPhase] = useState<Phase>(alwaysOpen ? "open" : "closed");
	const [active, setActive] = useState<number | null>(
		alwaysOpen ? (selected >= 0 ? selected : null) : null,
	);
	const [side, setSide] = useState<"top" | "bottom">(placement);
	const rootRef = useRef<HTMLDivElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const instant = useRef(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const scrub = useRef<{ id: number; top: number } | null>(null);
	const id = useId();
	const S = SIZES[size] ?? SIZES.md;
	const step = S.row + GAP;
	const popOut = Math.round((popDuration * 2) / 3);

	// While the parent is auto-cycling, it drives `value`. Keep the highlight
	// pill glued to whatever is currently selected so it glides along with it.
	useEffect(() => {
		if (!alwaysOpen || !autoCycle) return;
		setActive(selected >= 0 ? selected : null);
	}, [alwaysOpen, autoCycle, selected]);

	// Called from every genuine user interaction. The parent decides what
	// "interrupt" means (normally: stop its cycle timer).
	const interrupt = () => {
		if (autoCycle) onAutoCycleInterrupt?.();
	};

	// Whichever item is currently highlighted (hover/keyboard/auto-cycle), falling
	// back to the actual selection. Reported upward so the parent can render
	// whatever it wants alongside the dropdown (e.g. a preview image) without
	// this component knowing anything about that.
	const highlightIndex = active ?? selected;
	const highlightItem = highlightIndex >= 0 ? items[highlightIndex] : null;

	useEffect(() => {
		onActiveItemChange?.(highlightItem);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [highlightItem?.value]);

	useLayoutEffect(() => {
		if (phase !== "open") return;
		const el = menuRef.current;
		const root = rootRef.current;
		if (!el || !root) return;
		if (!alwaysOpen) {
			const r = root.getBoundingClientRect();
			const need = el.offsetHeight + MENU_GAP;
			setSide(
				placement === "bottom" && r.bottom + need > window.innerHeight
					? "top"
					: placement === "top" && r.top - need < 0
						? "bottom"
						: placement,
			);
		}
		el.style.transitionDuration = instant.current ? "0ms" : "";
		el.dataset.state = "closed";
		void el.offsetHeight;
		el.dataset.state = "open";
		const p = pillRef.current;
		if (p) {
			p.style.transition = "none";
			p.style.transform = `translateY(${Math.max(0, selected) * step}px)`;
			p.style.opacity = "0";
			void p.offsetHeight;
			p.style.transform = "";
			p.style.transition = "";
		}
	}, [phase]);

	useLayoutEffect(() => {
		const p = pillRef.current;
		if (!p || phase !== "open") return;
		if (active === null) {
			p.style.opacity = "0";
			return;
		}
		const jump = instant.current || p.style.opacity !== "1";
		p.style.transitionDuration = jump ? "0ms, 150ms" : "";
		p.style.transform = `translateY(${active * step}px)`;
		p.style.opacity = "1";
		instant.current = false;
	}, [active, phase, step]);

	const open = (viaKey: boolean) => {
		if (disabled) return;
		clearTimeout(closeTimer.current);
		instant.current = true;
		setActive(selected >= 0 ? selected : viaKey ? 0 : null);
		setPhase("open");
	};

	const close = (mode: "instant" | "pop") => {
		if (alwaysOpen) return;
		setActive(null);
		clearTimeout(closeTimer.current);
		const el = menuRef.current;
		if (mode === "instant" || !el) {
			setPhase("closed");
			return;
		}
		el.style.transitionDuration = "";
		el.dataset.state = "closed";
		setPhase("closing");
		closeTimer.current = setTimeout(() => setPhase("closed"), popOut + 20);
	};

	const pick = (i: number, viaKey: boolean) => {
		const it = items[i];
		if (!it) {
			close("instant");
			return;
		}
		if (it.value !== current) {
			if (value === undefined) setInner(it.value);
			onChange?.(it.value, it);
			if (!viaKey && rootRef.current) rootRef.current.dataset.swap = "";
		}
		close("instant");
		triggerRef.current?.focus({ preventScroll: true });
	};

	const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		interrupt();
		const k = e.key;
		const n = items.length;
		const cur = active ?? Math.max(0, selected);

		if (phase !== "open") {
			if (k === "Enter" || k === " " || k === "ArrowDown" || k === "ArrowUp") {
				e.preventDefault();
				open(true);
			}
			return;
		}

		const go = (i: number) => {
			e.preventDefault();
			instant.current = true;
			setActive(Math.min(n - 1, Math.max(0, i)));
		};

		if (k === "ArrowDown" || k === "ArrowUp")
			go(active === null ? cur : cur + (k === "ArrowDown" ? 1 : -1));
		else if (k === "Home" || k === "End") go(k === "Home" ? 0 : n - 1);
		else if (k === "Enter" || k === " ") {
			e.preventDefault();
			pick(cur, true);
		} else if (k === "Escape" || k === "Tab") {
			if (k === "Escape") e.preventDefault();
			close("instant");
		} else if (k.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey)
			go(typeaheadIndex(items, cur, k));
	};

	useEffect(() => {
		if (alwaysOpen || phase === "closed") return undefined;
		const onDown = (e: PointerEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node))
				close("pop");
		};
		document.addEventListener("pointerdown", onDown, true);
		return () => document.removeEventListener("pointerdown", onDown, true);
	}, [phase, alwaysOpen]);

	useEffect(() => () => clearTimeout(closeTimer.current), []);

	const rowAt = (y: number) => {
		const s = scrub.current;
		if (!s) return null;
		const i = Math.floor((y - s.top - PAD) / step);
		return i >= 0 && i < items.length ? i : null;
	};

	const onListDown = (e: React.PointerEvent<HTMLDivElement>) => {
		interrupt();
		if (scrub.current) return;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {}
		scrub.current = {
			id: e.pointerId,
			top: e.currentTarget.getBoundingClientRect().top,
		};
		instant.current = true;
		setActive(rowAt(e.clientY));
	};

	const onListMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!scrub.current || scrub.current.id !== e.pointerId) return;
		const i = rowAt(e.clientY);
		if (i !== active) setActive(i);
	};

	const onListUp = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!scrub.current || scrub.current.id !== e.pointerId) return;
		const i = e.type === "pointerup" ? rowAt(e.clientY) : null;
		scrub.current = null;
		if (i !== null) pick(i, false);
		else if (!rememberPosition) setActive(null);
	};

	const onListOver = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.pointerType === "touch" || scrub.current) return;

		const row = (e.target as HTMLElement).closest<HTMLElement>("[data-index");
		if (!row) return;

		interrupt();
		const i = Number(row.dataset.index);

		if (i !== active) {
			setActive(i);

			const it = items[i];
			if (it && it.value !== current) {
				if (value === undefined) setInner(it.value);
				onChange?.(it.value, it);
			}
		}
	};

	const origin = `${side === "bottom" ? "top" : "bottom"} ${alignment}`;

	return (
		<div
			ref={rootRef}
			className={`glide-select${alwaysOpen ? " glide-select--inline" : ""}${className ? ` ${className}` : ""}`}
			data-size={size}
			data-disabled={disabled ? `` : undefined}
			style={
				{
					"--gs-accent": accentColour ?? palette.accent,
					"--gs-surface": surfaceColour ?? palette.surface,
					"--gs-highlight": highlightColour ?? palette.highlight,
					"--gs-text": textColour ?? palette.text,
					"--gs-radius": `${radius}px`,
					"--gs-inner-radius": `${Math.max(3, radius - 4)}px`,
					"--gs-chip": `${S.chip}px`,
					"--gs-row": `${S.row}px`,
					"--gs-font": `${S.font}px`,
					"--gs-menu-w": `${menuWidth}px`,
					"--gs-pop": `${popDuration}ms`,
					"--gs-pop-out": `${popOut}ms`,
					"--gs-glide": `${glideDuration}ms`,
					"--gs-origin": origin,
				} as CSSProperties
			}
			onAnimationEnd={(e) => {
				if (e.animationName === "gs-swap" && rootRef.current)
					delete rootRef.current.dataset.swap;
			}}
		>
			{!alwaysOpen && (
				<button
					ref={triggerRef}
					type="button"
					role="combobox"
					aria-haspopup="listbox"
					aria-expanded={phase === "open"}
					aria-controls={`${id}-list`}
					aria-activedescendant={
						active !== null ? `${id}-${active}` : undefined
					}
					aria-label={ariaLabel}
					disabled={disabled}
					className="glide-select__trigger"
					onPointerDown={(e) => {
						if (e.button !== 0 || disabled) return;
						e.currentTarget.focus({ preventScroll: true });
						if (phase === "open") close("pop");
						else open(false);
					}}
					onKeyDown={onTriggerKey}
				>
					<span
						className="glide-select__label font-general-sans"
						key={current}
						data-empty={selected < 0 ? "" : undefined}
					>
						{selected >= 0 ? items[selected].label : placeholder}
					</span>
				</button>
			)}
			{alwaysOpen || phase !== "closed" ? (
				<div
					ref={menuRef}
					className="glide-select__menu"
					data-state="open"
					data-side={side}
					data-align={alignment}
				>
					<div
						id={`${id}-list`}
						role="listbox"
						aria-label={ariaLabel}
						className="glide-select__list"
						data-live={active !== null ? "" : undefined}
						onPointerOver={onListOver}
						onPointerLeave={() => {
							if (!scrub.current && !rememberPosition) setActive(null);
						}}
						onPointerDown={onListDown}
						onPointerMove={onListMove}
						onPointerUp={onListUp}
						onPointerCancel={onListUp}
						onLostPointerCapture={onListUp}
					>
						<span
							ref={pillRef}
							className="glide-select__pill"
							aria-hidden="true"
						/>
						{items.map((it, i) => (
							<div
								key={it.value}
								id={`${id}-${i}`}
								role="option"
								aria-selected={i === selected}
								data-index={i}
								className="glide-select__option"
							>
								<span className="glide-select__name">{it.label}</span>
								{showTags && it.tag ? (
									<span className="glide-select__tag">{it.tag}</span>
								) : null}
								<span
									className="glide-select__check"
									data-on={i === selected ? "" : undefined}
									aria-hidden="true"
								></span>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default GlideSelect;
