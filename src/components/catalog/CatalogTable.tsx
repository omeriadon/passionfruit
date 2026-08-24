"use client";

import Link from "next/link";
import {
	ArrowDown,
	ArrowUp,
	Columns3,
	Search,
	SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { catalogConfigs } from "@/lib/catalog/config";
import {
	formatCatalogValue,
	humanizeKey,
	type CatalogCategory,
	type CatalogColumn,
	type CatalogDevice,
} from "@/lib/catalog/types";
import styles from "./catalog.module.css";

type SortDirection = "ascending" | "descending";

type CatalogTableProps = {
	category: CatalogCategory;
	devices: CatalogDevice[];
	detailBasePath?: string;
};

function columnText(column: CatalogColumn, device: CatalogDevice) {
	return formatCatalogValue(column.getValue(device));
}

export function CatalogTable({
	category,
	devices,
	detailBasePath = "/docs",
}: CatalogTableProps) {
	const config = catalogConfigs[category];
	const [search, setSearch] = useState("");
	const [sortId, setSortId] = useState("releaseYear");
	const [sortDirection, setSortDirection] =
		useState<SortDirection>("descending");
	const [visibleIds, setVisibleIds] = useState(() =>
		config.columns.map((column) => column.id),
	);
	const [showColumnMenu, setShowColumnMenu] = useState(false);

	const visibleColumns = config.columns.filter((column) =>
		visibleIds.includes(column.id),
	);
	const filteredDevices = useMemo(() => {
		const query = search.trim().toLowerCase();
		const matching = query
			? devices.filter((device) => {
					const values = config.columns.map((column) =>
						columnText(column, device),
					);
					return [device.name, device.id, ...values]
						.join(" ")
						.toLowerCase()
						.includes(query);
				})
			: devices;

		const column =
			config.columns.find((item) => item.id === sortId) ?? config.columns[0];
		return [...matching].sort((left, right) => {
			const leftValue = column.sortValue?.(left) ?? columnText(column, left);
			const rightValue = column.sortValue?.(right) ?? columnText(column, right);
			const result =
				typeof leftValue === "number" && typeof rightValue === "number"
					? leftValue - rightValue
					: String(leftValue).localeCompare(String(rightValue), undefined, {
							numeric: true,
						});
			return sortDirection === "ascending" ? result : -result;
		});
	}, [config.columns, devices, search, sortDirection, sortId]);

	function changeSort(column: CatalogColumn) {
		if (sortId === column.id) {
			setSortDirection((current) =>
				current === "ascending" ? "descending" : "ascending",
			);
			return;
		}
		setSortId(column.id);
		setSortDirection("ascending");
	}

	function toggleColumn(id: string) {
		setVisibleIds((current) => {
			if (current.includes(id)) {
				return current.length === 1
					? current
					: current.filter((item) => item !== id);
			}
			return [...current, id];
		});
	}

	return (
		<section
			className={styles.tableSection}
			aria-labelledby={`${category}-table-title`}
		>
			<div className={styles.tableHeader}>
				<div>
					<p className={styles.eyebrow}>Compare</p>
					<h2 id={`${category}-table-title`} className={styles.sectionTitle}>
						Every {config.label} model
					</h2>
				</div>
				<div className={styles.tableActions}>
					<label className={styles.searchField}>
						<Search aria-hidden="true" size={16} />
						<span className="sr-only">Search {config.label}</span>
						<input
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Filter models"
							type="search"
						/>
					</label>
					<div className={styles.columnControl}>
						<button
							className={styles.controlButton}
							type="button"
							aria-expanded={showColumnMenu}
							aria-controls={`${category}-columns`}
							onClick={() => setShowColumnMenu((current) => !current)}
						>
							<Columns3 aria-hidden="true" size={16} />
							Columns
						</button>
						{showColumnMenu ? (
							<div id={`${category}-columns`} className={styles.columnMenu}>
								<p className={styles.menuLabel}>Visible columns</p>
								{config.columns.map((column) => (
									<label key={column.id} className={styles.menuOption}>
										<input
											type="checkbox"
											checked={visibleIds.includes(column.id)}
											onChange={() => toggleColumn(column.id)}
										/>
										{column.label}
									</label>
								))}
								<button
									className={styles.restoreButton}
									type="button"
									onClick={() =>
										setVisibleIds(config.columns.map((column) => column.id))
									}
								>
									<SlidersHorizontal aria-hidden="true" size={14} />
									Restore all columns
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>

			<div className={styles.tableSummary}>
				<span>
					Showing {filteredDevices.length} of {devices.length} models
				</span>
				<span>Click a column heading to sort</span>
			</div>
			<div className={styles.tableScroll} tabIndex={0}>
				<table className={styles.table}>
					<caption className="sr-only">
						Sortable {config.label} comparison table
					</caption>
					<thead>
						<tr>
							{visibleColumns.map((column) => {
								const active = sortId === column.id;
								return (
									<th key={column.id} scope="col">
										<button
											type="button"
											className={styles.sortButton}
											onClick={() => changeSort(column)}
											aria-label={`Sort by ${column.label}`}
										>
											{column.label}
											{active ? (
												<span aria-hidden="true">
													{sortDirection === "ascending" ? (
														<ArrowUp size={14} />
													) : (
														<ArrowDown size={14} />
													)}
												</span>
											) : null}
										</button>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{filteredDevices.map((device) => (
							<tr key={device.id}>
								{visibleColumns.map((column, index) => (
									<td key={column.id}>
										{index === 0 ? (
											<Link
												href={`${detailBasePath}/${category}/${device.id}`}
												className={styles.deviceLink}
											>
												<span>{device.name}</span>
												<span className={styles.deviceId}>{device.id}</span>
											</Link>
										) : (
											<span className={styles.cellText}>
												{columnText(column, device)}
											</span>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{filteredDevices.length === 0 ? (
					<div className={styles.emptyState}>
						<p>No models match “{search}”.</p>
						<button
							type="button"
							className={styles.textButton}
							onClick={() => setSearch("")}
						>
							Clear filter
						</button>
					</div>
				) : null}
			</div>
		</section>
	);
}
