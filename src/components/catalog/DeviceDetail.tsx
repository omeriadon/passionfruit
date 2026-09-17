"use client";

import {
	BadgeCheck,
	Bookmark,
	Check,
	ChevronDown,
	ExternalLink,
} from "lucide-react";
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
import { FinishSwatch } from "./FinishSwatch";
import styles from "./catalog.module.css";
import type { DeviceNote } from "@/lib/device-notes";
import { IPhoneDetail } from "./detail/IPhoneDetail";

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
	const overviewImages = device.overviewImages;
	if (Array.isArray(overviewImages) && overviewImages.length > 0) {
		return overviewImages[0] as CatalogImage | undefined;
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

export function DeviceDetail({ category, device, note }: DeviceDetailProps) {
	const {
		actionError,
		isBookmarked,
		isLoading,
		isOwned,
		toggleBookmark,
		toggleOwned,
		user,
	} = useAuth();
	const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
		() => getColors(device)[0]?.id,
	);
	const bookmarked = isBookmarked(category, device.id);
	const owned = isOwned(category, device.id);
	const [optimisticBookmarked, setOptimisticBookmarked] = useState<boolean>();
	const [optimisticOwned, setOptimisticOwned] = useState<boolean>();
	const [bookmarkPending, setBookmarkPending] = useState(false);
	const [ownedPending, setOwnedPending] = useState(false);
	const [showSources, setShowSources] = useState(false);
	const colors = getColors(device);
	const selectedColor = useMemo(
		() => colors.find((color) => color.id === selectedColorId) ?? colors[0],
		[colors, selectedColorId],
	);
	const image = displayImage(device, selectedColor);
	const imageSource = getImageSource(image);
	const displayedBookmarked = user
		? (optimisticBookmarked ?? bookmarked)
		: false;
	const displayedOwned = user ? (optimisticOwned ?? owned) : false;

	async function handleBookmark() {
		if (!user) {
			await toggleBookmark(category, device.id);
			return;
		}
		const next = !displayedBookmarked;
		setOptimisticBookmarked(next);
		setBookmarkPending(true);
		try {
			await toggleBookmark(category, device.id);
		} finally {
			setOptimisticBookmarked(undefined);
			setBookmarkPending(false);
		}
	}

	async function handleOwned() {
		if (!user) {
			await toggleOwned(category, device.id);
			return;
		}
		const next = !displayedOwned;
		setOptimisticOwned(next);
		setOwnedPending(true);
		try {
			await toggleOwned(category, device.id);
		} finally {
			setOptimisticOwned(undefined);
			setOwnedPending(false);
		}
	}

	return (
		<article className={styles.detail} aria-labelledby={`${device.id}-title`}>
			<div className={styles.detailHero}>
				<div className={styles.detailCopy}>
					<h2 id={`${device.id}-title`} className={styles.detailTitle}>
						{device.name}
					</h2>
					<p className={styles.detailMeta}>
						{[
							typeof device.releaseYear === "number"
								? String(device.releaseYear)
								: null,
							typeof device.priceAud === "number"
								? `$${device.priceAud.toLocaleString("en-AU")}`
								: null,
						]
							.filter(Boolean)
							.join("\u00a0\u00a0\u00a0\u00a0")}
					</p>
					{note ? (
						<div className={styles.editorialNoteContainer}>
							<p>Editorial Note</p>
							<div className={styles.editorialNote}>
								{note.goodToBuyText ? (
									<span
										className={`${styles.noteBadge} ${styles[`noteBadge_${note.goodToBuy}`]}`}
									>
										{note.goodToBuyText}
									</span>
								) : null}
								<p>{note.editorial}</p>
							</div>
						</div>
					) : null}
					<div className={styles.detailActions}>
						<button
							type="button"
							className={`${styles.bookmarkButton} ${displayedBookmarked ? styles.bookmarked : ""}`}
							aria-pressed={displayedBookmarked}
							aria-label={
								displayedBookmarked
									? `Remove ${device.name} bookmark`
									: user
										? `Bookmark ${device.name}`
										: `Sign in to bookmark ${device.name}`
							}
							onClick={handleBookmark}
							disabled={bookmarkPending || isLoading}
						>
							<Bookmark aria-hidden="true" size={15} />

							{displayedBookmarked
								? "Bookmarked"
								: user
									? "Bookmark"
									: "Sign in"}
						</button>
						<button
							type="button"
							className={`${styles.bookmarkButton} ${displayedOwned ? styles.bookmarked : ""}`}
							aria-pressed={displayedOwned}
							aria-label={
								displayedOwned
									? `Remove ${device.name} from your devices`
									: user
										? `Mark ${device.name} as yours`
										: `Sign in to mark ${device.name} as yours`
							}
							onClick={handleOwned}
							disabled={ownedPending || isLoading}
						>
							<BadgeCheck aria-hidden="true" size={15} />
							{displayedOwned ? "Mine" : user ? "Mine" : "Sign in"}
						</button>
					</div>
					{actionError ? (
						<p role="alert" className={styles.bookmarkError}>
							{actionError}
						</p>
					) : null}
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
					<p className={styles.fieldLabel}>Finish</p>
					<div
						className={styles.colorOptions}
						role="radiogroup"
						aria-label="Choose a finish"
					>
						{colors.map((color) => {
							return (
								<button
									key={color.id ?? color.displayName}
									type="button"
									className={`${styles.swatchButton} ${selectedColor?.id === color.id ? styles.selectedSwatch : ""}`}
									role="radio"
									aria-checked={selectedColor?.id === color.id}
									aria-label={color.displayName ?? "Unnamed finish"}
									onClick={() => setSelectedColorId(color.id)}
								>
									<span className={styles.swatchVisual}>
										<FinishSwatch finish={color.finish} />
									</span>
									<span>{color.displayName ?? "Unnamed finish"}</span>
								</button>
							);
						})}
					</div>
				</div>
			) : null}

			{category === "iphone" ? (
				<IPhoneDetail device={device} showSources={showSources} />
			) : (
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
			)}

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
