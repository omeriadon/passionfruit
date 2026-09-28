"use client";

import { useEffect, useRef, useState } from "react";

interface FastTextProps {
	children: string;
	className?: string;
	skewDeg?: number;
	durationMs?: number;
	trigger?: "hover" | "auto" | "loop";
	loopDelayMs?: number;
}

export default function FastText({
	children,
	className = "",
	skewDeg = -3,
	durationMs = 100,
	trigger = "hover",
	loopDelayMs = 2000,
}: FastTextProps) {
	const [active, setActive] = useState(trigger === "auto");
	const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

	useEffect(() => {
		if (trigger !== "loop") return;
		timerRef.current = setInterval(() => {
			setActive((a) => !a);
		}, loopDelayMs);
		return () => clearInterval(timerRef.current);
	}, [trigger, loopDelayMs]);

	const handlers =
		trigger === "hover"
			? {
					onMouseEnter: () => setActive(true),
					onMouseLeave: () => setActive(false),
				}
			: {};

	return (
		<span
			{...handlers}
			className={`relative inline-block will-change-transform ${className}`}
			style={{
				transform: active ? `skewX(${skewDeg}deg)` : "skewX(0deg)",
				transformOrigin: "bottom",
				transition: `transform ${durationMs}ms ease-out`,
			}}
		>
			<span
				className="absolute rounded-full pointer-events-none"
				style={{
					height: "0.125em",
					width: "1.4em",
					top: "40%",
					right: "100%",
					marginRight: "0.15em",
					opacity: 1,
					transform: active
						? "translateX(0) scaleX(1)"
						: "translateX(50%) scaleX(0)",
					transformOrigin: "right",
					background: "linear-gradient(to right, transparent, currentColor)",
					transition: `all ${durationMs * 0.45}ms ease-out`,
				}}
			/>

			<span
				className="absolute rounded-full pointer-events-none"
				style={{
					height: "0.125em",
					width: "1.4em",
					top: "55%",
					right: "100%",
					marginRight: "0.15em",
					opacity: 1,
					transform: active
						? "translateX(0) scaleX(1)"
						: "translateX(50%) scaleX(0)",
					transformOrigin: "right",
					background: "linear-gradient(to right, transparent, currentColor)",
					transition: `all ${durationMs * 0.45}ms ease-out`,
				}}
			/>

			<span
				className="relative z-10 block font-general-sans"
				style={{ fontStyle: active ? "italic" : "normal" }}
			>
				{children}
			</span>
		</span>
	);
}
