import type { CatalogValue } from "@/lib/catalog/types";
import styles from "../catalog.module.css";

type ConfigurationsProps = {
	value: CatalogValue;
};

export function Configurations({ value }: ConfigurationsProps) {
	const configurations = Array.isArray(value)
		? value.flatMap((configuration) => {
				if (
					typeof configuration !== "object" ||
					configuration === null ||
					Array.isArray(configuration)
				) {
					return [];
				}
				const name = configuration.displayName;
				const storage = configuration.storageId;
				const price = configuration.priceAud;
				if (typeof name !== "string") return [];
				return [
					{
						name,
						storage:
							typeof storage === "string" ? storage.toUpperCase() : undefined,
						price: typeof price === "number" ? price : undefined,
					},
				];
			})
		: [];

	return configurations.length > 0 ? (
		<ul className={styles.configurationList}>
			{configurations.map((configuration) => (
				<li key={configuration.name}>
					<div>
						<strong>{configuration.name}</strong>
						{configuration.storage ? (
							<span>{configuration.storage}</span>
						) : null}
					</div>
					{configuration.price === undefined ? null : (
						<span>AU${configuration.price.toLocaleString("en-AU")}</span>
					)}
				</li>
			))}
		</ul>
	) : (
		<p className={styles.mutedValue}>No configurations recorded</p>
	);
}
