import type { CatalogValue } from "@/lib/catalog/types";
import styles from "../catalog.module.css";

type StorageOptionsProps = {
	value: CatalogValue;
};

export function StorageOptions({ value }: StorageOptionsProps) {
	const options = Array.isArray(value)
		? value.flatMap((option) => {
				if (
					typeof option !== "object" ||
					option === null ||
					Array.isArray(option)
				) {
					return [];
				}
				const label = option.displayName;
				return typeof label === "string" ? [label] : [];
			})
		: [];

	return options.length > 0 ? (
		<ul className={styles.optionList} aria-label="Available storage capacities">
			{options.map((option) => (
				<li key={option}>{option}</li>
			))}
		</ul>
	) : (
		<p className={styles.mutedValue}>No storage options recorded</p>
	);
}
