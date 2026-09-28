"use client";

import { ArrowsOutSimpleIcon, MinusIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

// One question and Clarus's reply lines.
type Turn = { q: string; a: string[] };

const TRANSCRIPT: Turn[][] = [
	[
		{
			q: 'clarus ask "iPad Air vs iPad Pro?"',
			a: [
				"Case for the Pro: better display, M-series chip = more performance, Face ID.",
				"Case for the Air: cheaper, lighter, but still not a compromise for casual use.",
				"Verdict: Pro if you want a powerhouse, Air if you doomscroll.",
			],
		},
	],
	[
		{
			q: 'clarus ask "cheapest Mac with 16GB RAM?"',
			a: ["That would be the Mac Mini M4 starting at AUD 749."],
		},
	],
	[
		{
			q: 'clarus ask "Woof!"',
			a: ["Moof!"],
		},
	],
	[
		{
			q: 'clarus ask "What are you?"',
			a: ["I'm a cowdog."],
		},
	],
	[
		{
			q: 'clarus ask "Ive got to ask, id mostly be studying, and i like the idea of having a powerful machine.. but its so freaking expensive !!"',
			a: ["Would you be daily-ing any video games of sorts?"],
		},
		{
			q: 'clarus ask "maybe re4r once in a while, but nothing too intense id say"',
			a: [
				"Resident Evil 4 runs natively on iPadOS and Macs appear to be out of budget,",
				"Getting an iPad Air would let you leverage an Apple Pencil to take notes.",
			],
		},
		{
			q: 'clarus ask "oh rlly?"',
			a: ["Yes 👍"],
		},
	],
	[
		{
			q: 'clarus ask "pull up the display specs for the iphone 17 base and explain to me wth they did"',
			a: [
				"Yes.",
				"It's the first base model iPhone to feature a ProMotion display;",
				"i.e., it scales from 1Hz to 120Hz refresh rate. Higher Hz means a smoother and more responsive feel.",
			],
		},
		{
			q: 'clarus ask "why would i want it to go down then? i dont want it to go down. make it stop?"',
			a: [
				"No no, it's a good thing though.",
				"Here, a higher refresh rate can drain more energy from the battery, hence the phone will dynamically scale down to 1Hz when content is static to save battery.",
			],
		},
		{
			q: 'clarus ask "but wouldnt the display be off so it doesnt matter?"',
			a: [
				"It's not actually off. Since the 14 Pro lineup, ProMotion iPhones keep a dimmed lock screen lit all day, that being the always-on display.",
				"That's only possible because the panel can drop to 1Hz. At a constant 120Hz, it would drain the battery far faster.",
				"The base iPhone 17 now has the same panel, so it gets always-on too.",
			],
		},
	],
	[
		{
			q: 'clarus ask "should i get a macbook or a windows laptop"',
			a: [
				"Honestly, it depends.",
				"What's your usecase? Are you an engineering student? Or just looking for a casual browsing machine?",
			],
		},
		{
			q: 'clarus ask "lwk just tryna game"',
			a: [
				"なるほど...",
				"Well what kind of games are you planning on playing? Either way I'm leaning on recommending windows purely for compatability.",
			],
		},
		{
			q: 'clarus ask "wdym? i wanna be able to play anything tbh"',
			a: [
				"If you're looking for flexibility of games, I'd definetely suggest a Windows system.",
				"Though there are Windows-to-Mac game porting tools, not every game is supported and performance would generally be better native.",
				"Windows systems can also have dedicated GPUs, which are useful for demanding games (high-end gaming systems with good GPUS can outperform Macs in many games, but just because it has a dedicated GPU doesn't mean its inherently better).",
				"What's your budget looking like?",
			],
		},
		{
			q: 'clarus ask "idk, maybe 5k?"', // CLARUS WILL BE ABLE TO PULL LOCATION STATS ON USE, ADD TO PP
			a: [
				"It seems you're from Washington. I'll assume USD 5k, but correct me if I'm wrong.",
				"I'm assuming you're looking for a laptop since you're comparing it to a MacBook. There are some great options in your price range, particularly if gaming is your priority.",
			],
		},
	],
];

const TYPE_MS = 28;
const LINE_PAUSE_MS = 350;
const TURN_PAUSE_MS = 1100; // pause after an answer before the next question starts
const HOLD_MS = 1800; // pause after the final answer of a conversation
const CLEAR_MS = 400;

const sleep = (ms: number, signal: AbortSignal) =>
	new Promise<void>((resolve, reject) => {
		const t = setTimeout(resolve, ms);
		signal.addEventListener("abort", () => {
			clearTimeout(t);
			reject(new DOMException("aborted", "AbortError"));
		});
	});

export default function ClarusTerminal() {
	// Finished turns of the current conversation (stay on screen as scrollback).
	const [history, setHistory] = useState<Turn[]>([]);
	// The turn currently being played.
	const [promptText, setPromptText] = useState("");
	const [lines, setLines] = useState<string[]>([]);
	const [waitingReply, setWaitingReply] = useState(false);
	const runId = useRef(0);
	const bodyRef = useRef<HTMLDivElement>(null);

	// Keep the newest line in view once the conversation outgrows the box.
	useEffect(() => {
		const el = bodyRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [history, promptText, lines]);

	useEffect(() => {
		const id = ++runId.current;
		const controller = new AbortController();
		const signal = controller.signal;

		(async () => {
			let convoIndex = 0;
			try {
				while (runId.current === id) {
					const convo = TRANSCRIPT[convoIndex];

					setHistory([]);
					setLines([]);
					setWaitingReply(false);
					setPromptText("");

					for (let t = 0; t < convo.length; t++) {
						const turn = convo[t];

						for (let i = 1; i <= turn.q.length; i++) {
							setPromptText(turn.q.slice(0, i));
							await sleep(TYPE_MS, signal);
						}

						setWaitingReply(true);
						await sleep(LINE_PAUSE_MS, signal);
						setWaitingReply(false);

						for (const line of turn.a) {
							await sleep(LINE_PAUSE_MS, signal);
							setLines((prev) => [...prev, line]);
						}

						// More turns to come: bank this one as scrollback and open a fresh prompt.
						if (t < convo.length - 1) {
							await sleep(TURN_PAUSE_MS, signal);
							setHistory((prev) => [...prev, turn]);
							setPromptText("");
							setLines([]);
							await sleep(LINE_PAUSE_MS, signal);
						}
					}

					await sleep(HOLD_MS, signal);
					await sleep(CLEAR_MS, signal);

					convoIndex = (convoIndex + 1) % TRANSCRIPT.length;
				}
			} catch {
				// aborted on unmount/re-run — fine, just stop
			}
		})();

		return () => {
			runId.current++;
			controller.abort();
		};
	}, []);

	return (
		<div className="w-full max-w-xl rounded-xl border border-zinc-700 bg-zinc-950/90 shadow-lg overflow-hidden font-mono text-sm">
			<div className="group flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/90 px-4 py-2.5">
				<span className="relative flex size-3 items-center justify-center rounded-full bg-[#ff5f56]">
					<XIcon className="text-black size-2 opacity-0 group-hover:opacity-100" />
				</span>
				<span className="relative flex size-3 items-center justify-center rounded-full bg-[#ffbd2e]">
					<MinusIcon className="text-black size-2 opacity-0 group-hover:opacity-100" />
				</span>
				<span className="relative flex size-3 items-center justify-center rounded-full bg-[#27c93f]">
					<ArrowsOutSimpleIcon className="text-black size-2 opacity-0 group-hover:opacity-100" />
				</span>
				<span className="ml-2 text-xs text-zinc-500">clarus - cli</span>
			</div>

			{/* Fixed height so the card never resizes as the conversation grows;
			    the effect above keeps it scrolled to the newest line. */}
			<div
				ref={bodyRef}
				className="h-[260px] overflow-hidden px-4 py-4 leading-6 text-zinc-200"
			>
				{history.map((turn, ti) => (
					<div key={ti} className="mb-2">
						<div className="whitespace-pre-wrap break-words">
							<span className="text-[#63f398]">$</span> {turn.q}
						</div>
						{turn.a.map((l, i) => (
							<div key={i} className="flex gap-2 pl-4 text-zinc-400">
								<span className="text-zinc-600">{">"}</span>
								<span className="break-words">{l}</span>
							</div>
						))}
					</div>
				))}

				<div className="whitespace-pre-wrap break-words">
					<span className="text-[#63f398]">$</span> <span>{promptText}</span>
					<span
						className={`ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-zinc-400 ${
							lines.length === 0 && !waitingReply ? "opacity-100" : "opacity-0"
						}`}
					/>
				</div>

				{lines.map((l, i) => (
					<div key={i} className="flex gap-2 pl-4 text-zinc-400">
						<span className="text-zinc-600">{">"}</span>
						<span className="break-words">{l}</span>
					</div>
				))}
			</div>
		</div>
	);
}
