import type { CatalogDevice, CatalogValue } from "@/lib/catalog/types";
import {
	formatCatalogValue,
	getImageSource,
	humanizeKey,
} from "@/lib/catalog/types";
import styles from "../catalog.module.css";
import { StorageOptions } from "./StorageOptions";

type IPhoneDetailProps = {
	device: CatalogDevice;
	showSources: boolean;
};

type RecordValue = { [key: string]: CatalogValue };

function records(value: CatalogValue | undefined): RecordValue[] {
	return Array.isArray(value)
		? value.filter(
				(item): item is RecordValue =>
					typeof item === "object" && item !== null && !Array.isArray(item),
			)
		: [];
}

function record(value: CatalogValue | undefined): RecordValue | undefined {
	return typeof value === "object" && value !== null && !Array.isArray(value)
		? value
		: undefined;
}

function text(value: CatalogValue | undefined) {
	return typeof value === "string" || typeof value === "number"
		? String(value)
		: undefined;
}

function yesNo(value: CatalogValue | undefined) {
	return typeof value === "boolean" ? (value ? "Yes" : "No") : "Not recorded";
}

function Section({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className={styles.detailSection}>
			<h2 id={id}>{title}</h2>
			<div className={styles.detailValue}>{children}</div>
		</section>
	);
}

function SummaryList({
	items,
}: {
	items: Array<[string, string | undefined]>;
}) {
	const visibleItems = items.filter((item): item is [string, string] =>
		Boolean(item[1]),
	);
	return visibleItems.length > 0 ? (
		<dl className={styles.specList}>
			{visibleItems.map(([label, value]) => (
				<div className={styles.specRow} key={label}>
					<dt>{label}</dt>
					<dd>{value}</dd>
				</div>
			))}
		</dl>
	) : (
		<p className={styles.mutedValue}>Not recorded</p>
	);
}

function NamedItems({
	value,
	kind,
}: {
	value: CatalogValue | undefined;
	kind: "chip" | "display" | "camera";
}) {
	const items = records(value);
	return items.length > 0 ? (
		<ul className={styles.summaryCards}>
			{items.map((item, index) => {
				const title =
					text(item.displayName) ??
					text(item.technology) ??
					humanizeKey(text(item.role) ?? `${kind} ${index + 1}`);
				const facts =
					kind === "chip"
						? [
								text(item.cpuCoreConfiguration),
								text(item.gpuCores)
									? `${text(item.gpuCores)}-core GPU`
									: undefined,
								text(item.neuralEngineCores)
									? `${text(item.neuralEngineCores)}-core Neural Engine`
									: undefined,
							]
						: kind === "display"
							? [
									text(item.sizeIn) ? `${text(item.sizeIn)}-inch` : undefined,
									text(item.resolutionWidthPx) && text(item.resolutionHeightPx)
										? `${text(item.resolutionWidthPx)} × ${text(item.resolutionHeightPx)}`
										: undefined,
									text(item.refreshRateHz)
										? `${text(item.refreshRateHz)}Hz`
										: undefined,
								]
							: [
									text(item.megapixels)
										? `${text(item.megapixels)}MP`
										: undefined,
									text(item.opticalZoomMultiplier)
										? `${text(item.opticalZoomMultiplier)}×`
										: undefined,
									text(item.apertureFNumber)
										? `ƒ/${text(item.apertureFNumber)}`
										: undefined,
								];
				return (
					<li key={`${title}-${index}`}>
						<strong>{title}</strong>
						{facts.filter(Boolean).length > 0 ? (
							<span>{facts.filter(Boolean).join(" · ")}</span>
						) : null}
					</li>
				);
			})}
		</ul>
	) : (
		<p className={styles.mutedValue}>Not recorded</p>
	);
}

export function IPhoneDetail({ device, showSources }: IPhoneDetailProps) {
	const memoryGb = typeof device.memoryGb === "number"
		? `${device.memoryGb} GB`
		: undefined;
	const overviewImages = records(device.overviewImages);
	const audio = record(device.audio);
	const battery = record(device.batteryAndPower);
	const charging = record(battery?.charging);
	const runtime = records(battery?.runtimeHours);
	const connectivity = record(device.connectivity);
	const ports = records(connectivity?.ports);
	const wifi = record(connectivity?.wifi);
	const bluetooth = record(connectivity?.bluetooth);
	const cellular = record(connectivity?.cellular);
	const uwb = record(connectivity?.uwb);
	const thread = record(connectivity?.thread);
	const infrared = record(connectivity?.infrared);
	const nfc = record(connectivity?.nearFieldCommunication);
	const gps = record(connectivity?.gps);
	const authentication = record(device.authentication);
	const physical = record(device.physical);
	const weights = records(physical?.weights);
	const dimensions = records(physical?.dimensions);
	const components = records(physical?.components);
	const resistance = record(device.resistance);
	const software = record(device.software);

	return (
		<div className={styles.detailSections}>
			<Section id="storage" title="Storage">
				<StorageOptions value={device.storageOptions ?? null} />
			</Section>
			<Section id="memory" title="Memory">
				<p>{memoryGb || "Not recorded"}</p>
			</Section>
			<Section id="design-and-compatibility" title="Design and compatibility">
				<SummaryList
					items={[
						["Folding design", yesNo(device.isFolding)],
						["Ceramic Shield front", text(device.ceramicShieldFront)],
						["Ceramic Shield back", text(device.ceramicShieldBack)],
						["Apple Pencil support", yesNo(device.applePencilSupport)],
					]}
				/>
			</Section>
			<Section id="overview-images" title="Overview images">
				{overviewImages.length > 0 ? (
					<div className={styles.overviewImages}>
						{overviewImages.map((image, index) => {
							const source = getImageSource(image);
							return source ? (
								<img
									key={source}
									src={source}
									alt={`${device.name} overview ${index + 1}`}
								/>
							) : null;
						})}
					</div>
				) : (
					<p className={styles.mutedValue}>No overview images recorded</p>
				)}
			</Section>
			<Section id="chip" title="Chip">
				<NamedItems value={device.chips} kind="chip" />
			</Section>
			<Section id="display" title="Display">
				<NamedItems value={device.displays} kind="display" />
			</Section>
			<Section id="cameras" title="Cameras">
				<NamedItems value={device.cameras} kind="camera" />
			</Section>
			<Section id="audio" title="Audio">
				<SummaryList
					items={[
						["Speaker", text(audio?.speakerConfiguration)],
						["Microphone", text(audio?.microphoneConfiguration)],
					]}
				/>
			</Section>
			<Section id="battery-and-power" title="Battery and power">
				<SummaryList
					items={[
						...runtime.map(
							(item) =>
								[
									text(item.activity) ?? "Runtime",
									text(item.hours) ? `${text(item.hours)} hours` : undefined,
								] as [string, string | undefined],
						),
						["Fast charging", yesNo(charging?.wiredFastCharge)],
						["Wireless charging", yesNo(charging?.wirelessCharging)],
						[
							"Wireless standards",
							Array.isArray(charging?.wirelessStandards)
								? charging.wirelessStandards.map(formatCatalogValue).join(", ")
								: undefined,
						],
					]}
				/>
			</Section>
			<Section id="connectivity" title="Connectivity">
				<SummaryList
					items={[
						[
							"Ports",
							ports
								.map((port) =>
									[text(port.kind), text(port.standard)]
										.filter(Boolean)
										.join(" · "),
								)
								.filter(Boolean)
								.join(", ") || undefined,
						],
						[
							"Wi-Fi",
							Array.isArray(wifi?.standards)
								? wifi.standards.map(formatCatalogValue).join(", ")
								: undefined,
						],
						["Bluetooth", text(bluetooth?.version)],
						[
							"Cellular",
							Array.isArray(cellular?.technologies)
								? cellular.technologies.map(formatCatalogValue).join(", ")
								: undefined,
						],
						["Ultra Wideband", text(uwb?.chip)],
						["Thread", thread ? yesNo(thread.supported) : undefined],
						["Infrared", infrared ? yesNo(infrared.present) : undefined],
						["NFC", nfc ? yesNo(nfc.present) : undefined],
						[
							"Location systems",
							Array.isArray(gps?.systems)
								? gps.systems.map(formatCatalogValue).join(", ")
								: undefined,
						],
					]}
				/>
			</Section>
			<Section id="authentication" title="Authentication">
				<SummaryList
					items={[
						[
							"Methods",
							Array.isArray(authentication?.methods)
								? authentication.methods.map(formatCatalogValue).join(", ")
								: undefined,
						],
						["Primary method", text(authentication?.primaryMethod)],
					]}
				/>
			</Section>
			<Section id="physical" title="Physical">
				<SummaryList
					items={[
						...weights.map(
							(item) =>
								[
									humanizeKey(text(item.qualifier) ?? "Weight"),
									[text(item.value), text(item.unit)].filter(Boolean).join(" "),
								] as [string, string],
						),
						...dimensions.map(
							(item) =>
								[
									humanizeKey(text(item.qualifier) ?? "Dimension"),
									[text(item.value), text(item.unit)].filter(Boolean).join(" "),
								] as [string, string],
						),
						[
							"Construction",
							components
								.map((item) => text(item.displayName))
								.filter(Boolean)
								.join(", ") || undefined,
						],
					]}
				/>
			</Section>
			<Section id="resistance" title="Resistance">
				<SummaryList
					items={[
						["IP rating", text(resistance?.ipRating)],
						[
							"Water depth",
							text(resistance?.waterDepthM)
								? `${text(resistance?.waterDepthM)} m`
								: undefined,
						],
						[
							"Splash pressure",
							text(resistance?.splashPressureAtm)
								? `${text(resistance?.splashPressureAtm)} atm`
								: undefined,
						],
						[
							"Dust protected",
							resistance ? yesNo(resistance.dustProtected) : undefined,
						],
						[
							"Sweat resistant",
							resistance ? yesNo(resistance.sweatResistant) : undefined,
						],
					]}
				/>
			</Section>
			<Section id="software" title="Software">
				<SummaryList
					items={[
						["Operating system", text(software?.operatingSystem)],
						[
							"Version at launch",
							text(software?.operatingSystemVersionAtLaunch),
						],
						[
							"Built-in apps",
							Array.isArray(software?.builtInApps)
								? software.builtInApps.map(formatCatalogValue).join(", ") ||
									"None recorded"
								: undefined,
						],
					]}
				/>
			</Section>
			<Section id="accessories" title="Accessories">
				<p>
					{Array.isArray(device.accessories)
						? device.accessories.map(formatCatalogValue).join(", ") ||
							"None recorded"
						: "Not recorded"}
				</p>
			</Section>
			{showSources ? (
				<Section id="source-notes" title="Source notes">
					<p>{text(device.sourceNotes) ?? "Not recorded"}</p>
				</Section>
			) : null}
		</div>
	);
}

export function getIPhoneTableOfContents(device: CatalogDevice) {
	const entries = [
		["Storage", "#storage"],
		["Configurations", "#configurations"],
		["Memory", "#memory"],
		["Design and compatibility", "#design-and-compatibility"],
		["Overview images", "#overview-images"],
		["Chip", "#chip"],
		["Display", "#display"],
		["Cameras", "#cameras"],
		["Audio", "#audio"],
		["Battery and power", "#battery-and-power"],
		["Connectivity", "#connectivity"],
		["Authentication", "#authentication"],
		["Physical", "#physical"],
		["Resistance", "#resistance"],
		["Software", "#software"],
		["Accessories", "#accessories"],
	] as const;
	return entries.map(([title, url]) => ({ title, url, depth: 2 }));
}
