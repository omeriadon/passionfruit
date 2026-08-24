import Link from "next/link";
import { catalogCategories } from "@/lib/shared";

export default function HomePage() {
	return (
		<div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-6 py-20">
			<div className="max-w-2xl">
				<p className="mb-4 text-sm font-medium uppercase tracking-widest text-fd-primary">
					Apple Catalog
				</p>
				<h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
					A clearer way to compare Apple devices.
				</h1>
				<p className="mt-6 max-w-xl text-lg text-fd-muted-foreground">
					Structured specifications, source-backed images, and room for your own
					notes.
				</p>
				<Link
					href="/docs"
					className="mt-8 inline-flex rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
				>
					Browse the catalog
				</Link>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{catalogCategories.map((category) => (
					<Link
						key={category.slug}
						href={`/docs/${category.slug}`}
						className="rounded-2xl border border-fd-border bg-fd-card/60 p-5 transition-colors hover:bg-fd-accent"
					>
						<p className="font-medium">{category.title}</p>
						<p className="mt-1 text-sm text-fd-muted-foreground">
							{category.description}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
