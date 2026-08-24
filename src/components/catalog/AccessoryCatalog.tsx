"use client";

import Link from "next/link";
import { DeviceDetail } from "./DeviceDetail";
import type { CatalogDevice } from "@/lib/catalog/types";
import styles from "./catalog.module.css";

type Accessory = {
	id: string;
	displayName: string;
	[key: string]: unknown;
};

type AccessoryCatalogProps = {
	accessory: string;
	accessories: Accessory[];
	detailId?: string;
};

export function AccessoryCatalog({
	accessory,
	accessories,
	detailId,
}: AccessoryCatalogProps) {
	const detail = accessories.find((item) => item.id === detailId);
	const devices = accessories.map(
		(item) =>
			({
				...item,
				name: item.displayName,
			} as CatalogDevice),
	);

	return (
		<section className={styles.catalogCategory} aria-labelledby={`${accessory}-title`}>
			<div className={styles.sectionIntro}>
				<p className={styles.eyebrow}>iPad accessories</p>
				<h2 id={`${accessory}-title`} className={styles.sectionTitle}>
					{accessory.replaceAll("-", " ")}
				</h2>
			</div>
			<div className={styles.deviceCards}>
				{devices.map((device) => (
					<Link
						className={styles.deviceCard}
						href={`/docs/ipad/accessories/${accessory}/${device.id}`}
						key={device.id}
					>
						<strong>{device.name}</strong>
						<span>Open details</span>
					</Link>
				))}
			</div>
			{detail ? (
				<>
					<div className={styles.divider} aria-hidden="true" />
						<DeviceDetail
							category="ipad"
							device={detail as unknown as CatalogDevice}
						/>
				</>
			) : null}
		</section>
	);
}
