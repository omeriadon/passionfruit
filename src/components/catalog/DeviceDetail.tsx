"use client";

import { Bookmark, Check, ChevronDown, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
	formatCatalogValue,
	getColors,
	getImageSource,
	humanizeKey,
	imageForColor,
	type CatalogCategory,
	type CatalogColor,
	type CatalogDevice,
	type CatalogImage,
	type CatalogValue,
} from "@/lib/catalog/types";
import { catalogConfigs } from "@/lib/catalog/config";
import styles from "./catalog.module.css";
import type { DeviceNote } from "@/lib/device-notes";

type DeviceDetailProps = {
	category: CatalogCategory;
	device: CatalogDevice;
	note?: DeviceNote;
};

function isRecord(
	value: CatalogValue,
): value is { [key: string]: CatalogValue } {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function displayImage(
	device: CatalogDevice,
	color: CatalogColor | undefined,
): CatalogImage | undefined {
	if (color) return imageForColor(color);
	const images = device.images;
	if (Array.isArray(images)) {
		return (images.find(
			(image) =>
				isRecord(image) &&
				String(image.label ?? "")
					.toLowerCase()
					.includes("large"),
		) ?? images[0]) as CatalogImage | undefined;
	}
	return undefined;
}

function DataValue({
	value,
	depth = 0,
}: {
	value: CatalogValue;
	depth?: number;
}) {
	if (value === null || typeof value !== "object") {
		return (
			<span className={value === null ? styles.mutedValue : undefined}>
				{formatCatalogValue(value)}
			</span>
		);
	}
	if (Array.isArray(value)) {
		if (value.length === 0)
			return <span className={styles.mutedValue}>None recorded</span>;
		return (
			<ul className={styles.valueList}>
				{value.map((item, index) => (
					<li
						key={`${index}-${typeof item === "object" && item !== null && !Array.isArray(item) ? String(item.id ?? index) : String(item)}`}
					>
						{typeof item === "object" &&
						item !== null &&
						!Array.isArray(item) ? (
							<DataObject value={item} depth={depth + 1} />
						) : (
							<DataValue value={item} depth={depth + 1} />
						)}
					</li>
				))}
			</ul>
		);
	}
	return <DataObject value={value} depth={depth} />;
}

function DataObject({
	value,
	depth,
}: {
	value: { [key: string]: CatalogValue };
	depth: number;
}) {
	return (
		<div className={depth > 0 ? styles.nestedObject : styles.dataObject}>
			{Object.entries(value).map(([key, item]) => (
				<div className={styles.dataRow} key={key}>
					<span className={styles.dataTerm}>{humanizeKey(key)}</span>
					<div className={styles.dataDefinition}>
						<DataValue value={item} depth={depth} />
					</div>
				</div>
			))}
		</div>
	);
}

function detailSections(device: CatalogDevice) {
	return Object.entries(device).filter(
		([key]) =>
			!["id", "name", "colors", "images", "overviewImages"].includes(key),
	);
}

export function DeviceDetail({
	category,
	device,
	note,
}: DeviceDetailProps) {
	const { actionError, isBookmarked, isLoading, toggleBookmark, user } = useAuth();
	const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
		() => getColors(device)[0]?.id,
	);
	const bookmarked = isBookmarked(category, device.id);
	const [bookmarkPending, setBookmarkPending] = useState(false);
	const [showSources, setShowSources] = useState(false);
	const config = catalogConfigs[category];
	const colors = getColors(device);
	const selectedColor = useMemo(
		() => colors.find((color) => color.id === selectedColorId) ?? colors[0],
		[colors, selectedColorId],
	);
	const image = displayImage(device, selectedColor);
	const imageSource = getImageSource(image);

	async function handleBookmark() {
		setBookmarkPending(true);
		await toggleBookmark(category, device.id);
		setBookmarkPending(false);
	}

	return (
		<article className={styles.detail} aria-labelledby={`${device.id}-title`}>
			<div className={styles.detailHero}>
				<div className={styles.detailCopy}>
					<p className={styles.eyebrow}>{config.label}</p>
					<h2 id={`${device.id}-title`} className={styles.detailTitle}>
						{device.name}
					</h2>
					<p className={styles.detailMeta}>
						{typeof device.releaseYear === "number"
							? `Released ${device.releaseYear}`
							: "Release year not recorded"}
						{typeof device.priceAud === "number"
							? ` · From $${device.priceAud.toLocaleString("en-AU")}`
							: ""}
					</p>
					{note ? (
						<div className={styles.editorialNote}>
							<span className={`${styles.noteBadge} ${styles[`noteBadge_${note.goodToBuy}`]}`}>
								{note.goodToBuy === "unknown" ? "Buy status not set" : `Good to buy: ${note.goodToBuy}`}
							</span>
							<p>{note.editorial}</p>
						</div>
					) : null}
					<button
						type="button"
						className={`${styles.bookmarkButton} ${bookmarked ? styles.bookmarked : ""}`}
						aria-pressed={bookmarked}
						aria-label={
							bookmarked
								? `Remove ${device.name} bookmark`
								: `Bookmark ${device.name}`
						}
						onClick={handleBookmark}
						disabled={bookmarkPending || isLoading}
					>
						{bookmarked ? (
							<Check aria-hidden="true" size={16} />
						) : (
							<Bookmark aria-hidden="true" size={16} />
						)}
						{bookmarkPending ? "Saving…" : bookmarked ? "Bookmarked" : user ? "Bookmark" : "Sign in to bookmark"}
					</button>
					{actionError ? <p role="alert" className={styles.bookmarkError}>{actionError}</p> : null}
				</div>
				<div className={styles.productVisual}>
					{imageSource ? (
						<img
							src={imageSource}
							alt={
								selectedColor
									? `${device.name} in ${selectedColor.displayName}`
									: device.name
							}
						/>
					) : (
						<div
							className={styles.imagePlaceholder}
							aria-label="No product image recorded"
						>
							Image not recorded
						</div>
					)}
				</div>
			</div>

			{colors.length > 0 ? (
				<div className={styles.colorPicker}>
					<div>
						<p className={styles.fieldLabel}>Finish</p>
						<p className={styles.selectedColor}>
							{selectedColor?.displayName ?? "Select a finish"}
						</p>
					</div>
					<div
						className={styles.colorOptions}
						role="radiogroup"
						aria-label="Choose a finish"
					>
						{colors.map((color) => {
							const swatch =
								typeof color.swatch === "string"
									? color.swatch
									: color.swatch?.value;
							return (
								<button
									key={color.id ?? color.displayName}
									type="button"
									className={`${styles.swatchButton} ${selectedColor?.id === color.id ? styles.selectedSwatch : ""}`}
									style={
										swatch
											? ({ "--swatch": swatch } as CSSProperties)
											: undefined
									}
									role="radio"
									aria-checked={selectedColor?.id === color.id}
									aria-label={color.displayName ?? "Unnamed finish"}
									onClick={() => setSelectedColorId(color.id)}
								/>
							);
						})}
					</div>
				</div>
			) : null}

			<div className={styles.detailSections}>
				{detailSections(device).map(([key, value]) => {
					const isSource = key === "sourceNotes";
					if (isSource && !showSources) return null;
					return (
						<section className={styles.detailSection} key={key}>
							<h3>{humanizeKey(key)}</h3>
							<div className={styles.detailValue}>
								<DataValue value={value} />
							</div>
						</section>
					);
				})}
			</div>

			{Object.prototype.hasOwnProperty.call(device, "sourceNotes") ? (
				<button
					type="button"
					className={styles.sourcesToggle}
					onClick={() => setShowSources((current) => !current)}
				>
					<ExternalLink aria-hidden="true" size={15} />
					{showSources ? "Hide source notes" : "Show source notes"}
					<ChevronDown
						aria-hidden="true"
						size={15}
						className={showSources ? styles.rotated : undefined}
					/>
				</button>
			) : null}
		</article>
	);
}
