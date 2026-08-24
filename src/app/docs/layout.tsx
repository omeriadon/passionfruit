import { getCatalogPageTree } from "@/lib/source";
import { GlassLayout } from "fumadocs-ui/layouts/glass";
import { baseOptions } from "@/lib/layout.shared";
import { catalogCategories } from "@/lib/shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
	return (
		<GlassLayout
			tree={getCatalogPageTree()}
			tabs={catalogCategories.map((category) => ({
				title: category.title,
				description: category.description,
				url: `/docs/${category.slug}`,
			}))}
			{...baseOptions()}
		>
			{children}
		</GlassLayout>
	);
}
