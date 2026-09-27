"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HoverHintProps {
	visible: boolean;
	x: number;
	y: number;
	text?: string;
	subtext?: string;
}

export default function HoveringHint({
	visible,
	x,
	y,
	text = "Explore device",
	subtext = "(just click anywhere)",
}: HoverHintProps) {
	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					data-hover-hint
					initial={{
						opacity: 0,
						scale: 0.8,
						x,
						y: y + 6,
					}}
					animate={{
						opacity: 1,
						scale: 1,
						x,
						y,
					}}
					exit={{
						opacity: 0,
						scale: 0.9,
						transition: {
							duration: 0.12,
							ease: "easeOut",
						},
					}}
					transition={{
						opacity: {
							duration: 0.18,
							ease: "easeOut",
						},
						scale: {
							type: "spring",
							stiffness: 600,
							damping: 25,
						},
						x: {
							type: "spring",
							stiffness: 900,
							damping: 45,
							mass: 0.15,
						},
						y: {
							type: "spring",
							stiffness: 900,
							damping: 45,
							mass: 0.15,
						},
					}}
					className="pointer-events-none absolute left-0 top-0 z-10"
				>
					<div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/60 px-3 py-1.5 font-general-sans shadow-lg backdrop-blur-md">
						<div className="flex flex-col">
							<span className="font-medium text-white text-[2rem] mb-[-4px]">
								{text}
							</span>
							<span className="font-mono text-center text-zinc-400 text-[0.7rem] mb-[4px]">
								{subtext}
							</span>
						</div>
						<ArrowUpRight size={20} />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
