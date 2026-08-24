"use client";

import { CatalogTable } from "./CatalogTable";
import { DeviceDetail } from "./DeviceDetail";
import { sortDevices } from "@/lib/catalog/config";
import {
	formatCatalogValue,
	type CatalogCategory,
	type CatalogDevice,
} from "@/lib/catalog/types";
import styles from "./catalog.module.css";
import type { DeviceNote } from "@/lib/device-notes";

type CatalogCategoryProps = {
	category: CatalogCategory;
	devices: CatalogDevice[];
	detailDevice?: CatalogDevice;
	detailNote?: DeviceNote;
	detailBasePath?: string;
};

export function CatalogCategory({
	category,
	devices,
	detailDevice,
	detailNote,
	detailBasePath = "/docs",
}: CatalogCategoryProps) {
	const orderedDevices = sortDevices(devices);

	return (
		<div className={styles.catalogCategory}>
			<CatalogTable
				category={category}
				devices={orderedDevices}
				detailBasePath={detailBasePath}
			/>
			<div className={styles.divider} aria-hidden="true" />
			<section
				className={styles.deviceSection}
				aria-labelledby={`${category}-models-title`}
			>
				<div className={styles.sectionIntro}>
					<p className={styles.eyebrow}>Explore the range</p>
					<h2 id={`${category}-models-title`} className={styles.sectionTitle}>
						Models, from newest to smallest
					</h2>
				</div>
				<div className={styles.deviceCards}>
					{orderedDevices.map((device) => (
						<a
							className={styles.deviceCard}
							href={`${detailBasePath}/${category}/${device.id}`}
							key={device.id}
						>
							<span className={styles.cardYear}>
								{formatCatalogValue(device.releaseYear ?? null)}
							</span>
							<strong>{device.name}</strong>
							<span>
								{typeof device.priceAud === "number"
									? `$${device.priceAud.toLocaleString("en-AU")}`
									: formatCatalogValue(device.priceAud ?? null)}
							</span>
						</a>
					))}
				</div>
			</section>
			{detailDevice ? (
				<>
					<div className={styles.divider} aria-hidden="true" />
				<DeviceDetail
					category={category}
					device={detailDevice}
					note={detailNote}
				/>
				</>
			) : null}
		</div>
	);
}
