import Link from "next/link";
import { formatCatalogValue, type CatalogValue } from "@/lib/catalog/types";
import styles from "./catalog.module.css";

type OtherProduct = {
	id: string;
	displayName: string;
	[key: string]: unknown;
};

export function OtherCatalog({
	section,
	products,
	detailId,
}: {
	section: string;
	products: OtherProduct[];
	detailId?: string;
}) {
	const detail = products.find((product) => product.id === detailId);
	return (
		<section
			className={styles.catalogCategory}
			aria-labelledby={`${section}-title`}
		>
			{detail ? (
				<dl className={styles.specList}>
					{Object.entries(detail)
						.filter(([key]) => !["id", "displayName", "images"].includes(key))
						.map(([key, value]) => (
							<div className={styles.specRow} key={key}>
								<dt>{key.replaceAll(/([a-z])([A-Z])/g, "$1 $2")}</dt>
								<dd>{formatCatalogValue(value as CatalogValue)}</dd>
							</div>
						))}
				</dl>
			) : (
				<>
					<div className={styles.sectionIntro}>
						<p className={styles.eyebrow}>Other Apple products</p>
						<h2 id={`${section}-title`} className={styles.sectionTitle}>
							{section.replaceAll("-", " ")}
						</h2>
					</div>
					<div className={styles.deviceCards}>
						{products.map((product) => (
							<Link
								className={styles.deviceCard}
								href={`/docs/other/${section}/${product.id}`}
								key={product.id}
							>
								<strong>{product.displayName}</strong>
								<span>Open details</span>
							</Link>
						))}
					</div>
				</>
			)}
		</section>
	);
}
