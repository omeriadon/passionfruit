"use client";

import { useMemo, useState } from "react";
import {
	FinishSwatch,
	type FinishMaterial,
	type FinishRecord,
} from "@/components/catalog/FinishSwatch";

const MATERIALS: FinishMaterial[] = [
	"matte-aluminum",
	"brushed-titanium",
	"polished-titanium",
	"polished-steel",
	"ceramic",
	"glass",
	"fabric",
	"flat",
];

const PRESETS: Array<{ name: string; finish: FinishRecord }> = [
	{
		name: "Sky Blue (iPhone Air)",
		finish: { base: "#b9c9d6", material: "polished-titanium", shine: 0.6 },
	},
	{
		name: "Natural Titanium (Watch)",
		finish: { base: "#e3ddd7", material: "brushed-titanium" },
	},
	{
		name: "Midnight (HomePod fabric)",
		finish: { base: "#2c2d31", material: "fabric", weave: true, grain: 0.3 },
	},
	{
		name: "Jet Black (mirror glass)",
		finish: { base: "#101114", material: "glass", shine: 1 },
	},
	{
		name: "Pearl White (ceramic)",
		finish: { base: "#e9e5de", material: "ceramic", shine: 0.7 },
	},
	{
		name: "Dark Bronze",
		finish: { base: "#6b4423", material: "polished-titanium", shine: 0.4 },
	},
	{
		name: "Duo demo (case + band)",
		finish: {
			base: "#47423d",
			material: "brushed-titanium",
			duo: {
				base: "#8a6f5c",
				material: "matte-aluminum",
				split: { angle: 135, curve: 0.18, offset: 0 },
			},
		},
	},
];

function Slider({
	label,
	value,
	min,
	max,
	step,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
}) {
	return (
		<label style={{ display: "block", margin: "0.4rem 0", fontSize: "0.85rem" }}>
			<span style={{ display: "flex", justifyContent: "space-between" }}>
				<span>{label}</span>
				<span style={{ fontVariantNumeric: "tabular-nums" }}>
					{value.toFixed(step >= 0.1 ? 1 : 2)}
				</span>
			</span>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				style={{ width: "100%" }}
			/>
		</label>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section style={{ marginBottom: "1.25rem" }}>
			<h3 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7, margin: "0 0 0.5rem" }}>
				{title}
			</h3>
			{children}
		</section>
	);
}

export default function FinishPlayground() {
	const [finish, setFinish] = useState<FinishRecord>(PRESETS[0].finish);
	const [dark, setDark] = useState(true);
	const [copied, setCopied] = useState(false);
	const [size, setSize] = useState(144);

	const patch = (partial: Partial<FinishRecord>) => {
		setCopied(false);
		setFinish((prev) => ({ ...prev, ...partial }));
	};

	const json = useMemo(() => JSON.stringify(finish, null, "\t"), [finish]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(json);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	};

	const duo = finish.duo;
	const duoOn = Boolean(duo);

	return (
		<main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
			<p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>
				Playground
			</p>
			<h1 style={{ fontSize: "2rem", margin: "0 0 0.25rem" }}>Finish engine</h1>
			<p style={{ opacity: 0.7, marginTop: 0 }}>
				Tweak every parameter of the material swatch renderer live. Copy the
				JSON straight into a data file&apos;s <code>finish</code> record.
			</p>
			<div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) minmax(300px, 1.2fr)", gap: "2rem", marginTop: "1.5rem" }}>
				<div>
					<Section title="Preview">
						<div
							style={{
								background: dark ? "#000" : "#f4f4f5",
								borderRadius: "1rem",
								padding: "2rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div style={{ width: size, height: size }}>
								<FinishSwatch finish={finish} />
							</div>
						</div>
						<div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "0.75rem", flexWrap: "wrap" }}>
							{[24, 40, 64, 96, 144].map((option) => (
								<button
									key={option}
									type="button"
									onClick={() => setSize(option)}
									style={{
										border: option === size ? "2px solid #b46a46" : "1px solid currentColor",
										borderRadius: "999px",
										background: "transparent",
										color: "inherit",
										padding: "0.2rem 0.6rem",
										cursor: "pointer",
										fontSize: "0.8rem",
									}}
								>
									{option}
								</button>
							))}
							<button
								type="button"
								onClick={() => setDark((value) => !value)}
								style={{
									border: "1px solid currentColor",
									borderRadius: "999px",
									background: "transparent",
									color: "inherit",
									padding: "0.2rem 0.6rem",
									cursor: "pointer",
									fontSize: "0.8rem",
								}}
							>
								{dark ? "Light backdrop" : "Dark backdrop"}
							</button>
						</div>
					</Section>
					<Section title="Presets">
						<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
							{PRESETS.map((preset) => (
								<button
									key={preset.name}
									type="button"
									onClick={() => {
										setCopied(false);
										setFinish(preset.finish);
									}}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
										border: "1px solid currentColor",
										borderRadius: "999px",
										background: "transparent",
										color: "inherit",
										padding: "0.25rem 0.75rem 0.25rem 0.25rem",
										cursor: "pointer",
										fontSize: "0.8rem",
									}}
								>
									<span style={{ width: 24, height: 24, display: "inline-block" }}>
										<FinishSwatch finish={preset.finish} />
									</span>
									{preset.name}
								</button>
							))}
						</div>
					</Section>
					<Section title="JSON">
						<pre
							style={{
								fontSize: "0.8rem",
								padding: "1rem",
								borderRadius: "0.75rem",
								background: dark ? "#111" : "#eee",
								overflow: "auto",
								maxHeight: "320px",
							}}
						>
							{json}
						</pre>
						<button
							type="button"
							onClick={copy}
							style={{
								border: "1px solid currentColor",
								borderRadius: "999px",
								background: "transparent",
								color: "inherit",
								padding: "0.4rem 1rem",
								cursor: "pointer",
							}}
						>
							{copied ? "Copied" : "Copy JSON"}
						</button>
					</Section>
				</div>
				<div>
					<Section title="Base">
						<div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
							<input
								type="color"
								value={finish.base ?? "#d3d3d3"}
								onChange={(event) => patch({ base: event.target.value })}
								style={{ width: 48, height: 32, padding: 0, border: "none", background: "none", cursor: "pointer" }}
							/>
							<input
								type="text"
								value={finish.base ?? ""}
								onChange={(event) => patch({ base: event.target.value })}
								placeholder="#rrggbb"
								spellCheck={false}
								style={{ fontFamily: "monospace", padding: "0.35rem 0.5rem", borderRadius: "0.5rem", border: "1px solid currentColor", background: "transparent", color: "inherit", width: "7rem" }}
							/>
						</div>
					</Section>
					<Section title="Material">
						<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
							{MATERIALS.map((material) => (
								<button
									key={material}
									type="button"
									onClick={() => patch({ material })}
									style={{
										border: finish.material === material ? "2px solid #b46a46" : "1px solid currentColor",
										borderRadius: "0.5rem",
										background: "transparent",
										color: "inherit",
										padding: "0.3rem 0.6rem",
										cursor: "pointer",
										fontSize: "0.8rem",
									}}
								>
									{material}
								</button>
							))}
						</div>
					</Section>
					<Section title="Sheen (material default unless set)">
						<Slider label="Glare X" value={finish.sheen?.glareX ?? 34} min={0} max={100} step={1} onChange={(glareX) => patch({ sheen: { ...finish.sheen, glareX } })} />
						<Slider label="Glare Y" value={finish.sheen?.glareY ?? 26} min={0} max={100} step={1} onChange={(glareY) => patch({ sheen: { ...finish.sheen, glareY } })} />
						<Slider label="Intensity" value={finish.sheen?.intensity ?? 0.4} min={0} max={1} step={0.01} onChange={(intensity) => patch({ sheen: { ...finish.sheen, intensity } })} />
						<button
							type="button"
							onClick={() => {
								const next = { ...finish };
								delete next.sheen;
								setFinish(next);
							}}
							style={{ border: "1px solid currentColor", borderRadius: "999px", background: "transparent", color: "inherit", padding: "0.25rem 0.75rem", cursor: "pointer", fontSize: "0.8rem" }}
						>
							Reset to material default
						</button>
					</Section>
					<Section title="Surface">
						<Slider label="Shine (clearcoat hotspot)" value={finish.shine ?? 0.3} min={0} max={1} step={0.01} onChange={(shine) => patch({ shine })} />
						<Slider label="Grain (micro-noise)" value={finish.grain ?? 0} min={0} max={1} step={0.01} onChange={(grain) => patch({ grain })} />
						<label style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem", marginTop: "0.5rem" }}>
							<input type="checkbox" checked={finish.weave ?? false} onChange={(event) => patch({ weave: event.target.checked })} />
							Weave (fabric crosshatch)
						</label>
					</Section>
					<Section title="Duo split">
						<label style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
							<input
								type="checkbox"
								checked={duoOn}
								onChange={(event) => {
									if (event.target.checked) {
										patch({ duo: { base: "#8a6f5c", material: "matte-aluminum", split: {} } });
									} else {
										const next = { ...finish };
										delete next.duo;
										setFinish(next);
									}
								}}
							/>
							Two-tone split
						</label>
						{duo ? (
							<>
								<div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
									<input
										type="color"
										value={duo.base ?? "#8a6f5c"}
										onChange={(event) => patch({ duo: { ...duo, base: event.target.value } })}
										style={{ width: 48, height: 32, padding: 0, border: "none", background: "none", cursor: "pointer" }}
									/>
									<div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
										{MATERIALS.map((material) => (
											<button
												key={material}
												type="button"
												onClick={() => patch({ duo: { ...duo, material } })}
												style={{
													border: duo.material === material ? "2px solid #b46a46" : "1px solid currentColor",
													borderRadius: "0.5rem",
													background: "transparent",
													color: "inherit",
													padding: "0.2rem 0.5rem",
													cursor: "pointer",
													fontSize: "0.75rem",
												}}
											>
												{material}
											</button>
										))}
									</div>
								</div>
								<Slider label="Split angle" value={duo.split?.angle ?? 135} min={0} max={360} step={1} onChange={(angle) => patch({ duo: { ...duo, split: { ...duo.split, angle } } })} />
								<Slider label="Split curve" value={duo.split?.curve ?? 0.18} min={-0.3} max={0.3} step={0.01} onChange={(curve) => patch({ duo: { ...duo, split: { ...duo.split, curve } } })} />
								<Slider label="Split offset" value={duo.split?.offset ?? 0} min={-0.5} max={0.5} step={0.01} onChange={(offset) => patch({ duo: { ...duo, split: { ...duo.split, offset } } })} />
							</>
						) : null}
					</Section>
				</div>
			</div>
		</main>
	);
}
