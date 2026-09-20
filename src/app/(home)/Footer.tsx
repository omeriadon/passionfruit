import Link from "next/link";

const links = [
	{ href: "https://thirdspace.hackclub.com/", label: "third space <<" },
	{ href: "https://github.com/omeriadon/passionfruit", label: "Github" },
	{ href: "/docs", label: "Docs" },
	{ href: "/clarus", label: "Clarus" },
];

export default function Footer() {
	return (
		<footer className="group w-full border-t border-zinc-200 dark:border-zinc-800">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-start font-general-sans">
				<p className="">
					Passionfruit is not affiliated with or endorsed by{" "}
					<a href="https://apple.com/au" className="hover:underline">
						Apple Inc.
					</a>
					<br />
					Made with{" "}
					<span className="inline-block motion-safe:group-hover:animate-heartbeat">
						🫀
					</span>{" "}
					by Adon and Dylan.
				</p>
				<nav className="flex gap-6">
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className="transition-none hover:underline hover:text-blue-500"
						>
							{l.label}
						</Link>
					))}
				</nav>
			</div>
		</footer>
	);
}
