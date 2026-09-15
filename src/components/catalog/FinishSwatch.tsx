import { useId } from "react";

export type FinishMaterial =
	| "matte-aluminum"
	| "brushed-titanium"
	| "polished-titanium"
	| "polished-steel"
	| "ceramic"
	| "glass"
	| "fabric"
	| "flat";

export type FinishSheen = {
	glareX?: number;
	glareY?: number;
	intensity?: number;
};

export type FinishSplit = {
	angle?: number;
	curve?: number;
	offset?: number;
};

export type FinishRecord = {
	base?: string;
	material?: FinishMaterial;
	sheen?: FinishSheen;
	/** Crisp clearcoat hotspot + rim light. 0 none, 1 full glass-like pop. */
	shine?: number;
	/** Micro-noise overlay (parametric turbulence, no assets). */
	grain?: number;
	/** Parametric crosshatch overlay for woven fabric. */
	weave?: boolean;
	duo?: {
		base?: string;
		material?: FinishMaterial;
		split?: FinishSplit;
	};
};

type Recipe = {
	/** Luminosity spread 0..1 around the base hex. */
	spread: number;
	/** Directional base angle in degrees (ignored for radial bases). */
	angle: number;
	/** Radial base (center glow fading to a darker rim) instead of directional. */
	radialBase: boolean;
	/**
	 * Auto two-tone: derive a near-tone second side by darkening the base by
	 * this amount (0 = off). Explicit duo records in data always win.
	 */
	subtleDuo: number;
	glareX: number;
	glareY: number;
	glareOpacity: number;
	shine: number;
	grain: number;
	weave: boolean;
	flat: boolean;
};

const RECIPES: Record<FinishMaterial, Recipe> = {
	"matte-aluminum": {
		spread: 0.1,
		angle: 160,
		radialBase: true,
		subtleDuo: 0,
		glareX: 34,
		glareY: 26,
		glareOpacity: 0.35,
		shine: 0.15,
		grain: 0.12,

		weave: false,
		flat: false,
	},
	"brushed-titanium": {
		spread: 0.16,
		angle: 135,
		radialBase: false,
		subtleDuo: 0,
		glareX: 33,
		glareY: 25,
		glareOpacity: 0.4,
		shine: 0.3,
		grain: 0.3,

		weave: false,
		flat: false,
	},
	"polished-titanium": {
		spread: 0.22,
		angle: 135,
		radialBase: false,
		subtleDuo: 0.14,
		glareX: 32,
		glareY: 24,
		glareOpacity: 0.5,
		shine: 0.6,
		grain: 0.1,

		weave: false,
		flat: false,
	},
	"polished-steel": {
		spread: 0.3,
		angle: 135,
		radialBase: false,
		subtleDuo: 0,
		glareX: 32,
		glareY: 24,
		glareOpacity: 0.6,
		shine: 0.8,
		grain: 0,

		weave: false,
		flat: false,
	},
	ceramic: {
		spread: 0.12,
		angle: 150,
		radialBase: true,
		subtleDuo: 0.12,
		glareX: 36,
		glareY: 28,
		glareOpacity: 0.5,
		shine: 0.7,
		grain: 0.05,

		weave: false,
		flat: false,
	},
	glass: {
		spread: 0.25,
		angle: 135,
		radialBase: false,
		subtleDuo: 0,
		glareX: 35,
		glareY: 28,
		glareOpacity: 0.5,
		shine: 0.9,
		grain: 0,

		weave: false,
		flat: false,
	},
	fabric: {
		spread: 0,
		angle: 135,
		radialBase: false,
		subtleDuo: 0,
		glareX: 34,
		glareY: 26,
		glareOpacity: 0,
		shine: 0,
		grain: 0.3,

		weave: true,
		flat: true,
	},
	flat: {
		spread: 0,
		angle: 135,
		radialBase: false,
		subtleDuo: 0,
		glareX: 34,
		glareY: 26,
		glareOpacity: 0,
		shine: 0,
		grain: 0,

		weave: false,
		flat: true,
	},
};

const SIZE = 32;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2;

function clamp(value: number | undefined, fallback: number) {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function parseHex(hex: string): [number, number, number] | undefined {
	const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
	if (!match) return undefined;
	const int = Number.parseInt(match[1], 16);
	return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function toHex(r: number, g: number, b: number) {
	const channel = (value: number) =>
		Math.round(Math.min(255, Math.max(0, value)))
			.toString(16)
			.padStart(2, "0");
	return `#${channel(r)}${channel(g)}${channel(b)}`;
}

/** amount -1..1: negative darkens toward black, positive lightens toward white. */
function shade(hex: string, amount: number) {
	const rgb = parseHex(hex);
	if (!rgb) return hex;
	const target = amount >= 0 ? 255 : 0;
	const mix = Math.abs(amount);
	return toHex(
		rgb[0] + (target - rgb[0]) * mix,
		rgb[1] + (target - rgb[1]) * mix,
		rgb[2] + (target - rgb[2]) * mix,
	);
}

function radialStops(base: string, spread: number): Array<[number, string]> {
	if (spread <= 0) return [[0, base]];
	return [
		[0, shade(base, spread)],
		[55, base],
		[100, shade(base, -spread * 1.2)],
	];
}

function gradientStops(base: string, spread: number): Array<[number, string]> {
	if (spread <= 0) return [[0, base]];
	// Cosine profile sampled densely: SVG interpolates linearly between stops,
	// so sparse stops show as visible bands. 13 samples of a smooth curve read
	// as one continuous cylindrical sheen.
	const stops: Array<[number, string]> = [];
	const samples = 12;
	for (let i = 0; i <= samples; i++) {
		const t = i / samples;
		stops.push([
			Math.round(t * 100),
			shade(base, spread * Math.cos(t * Math.PI * 2)),
		]);
	}
	return stops;
}

type Point = { x: number; y: number };

/**
 * Closed path for the B side of a duo split. Endpoints are antipodal, so the
 * closing arc is sampled point-by-point through the B side instead of using
 * arc flags (which are easy to get backwards).
 */
function splitPath(split: FinishSplit): string {
	const angle = ((clamp(split.angle, 135) % 360) * Math.PI) / 180;
	const curve = clamp(split.curve, 0.18);
	const offset = clamp(split.offset, 0);
	const dx = Math.cos(angle);
	const dy = Math.sin(angle);
	// Divider normal. B side is the half containing center + normal * radius.
	const nx = -dy;
	const ny = dx;
	const mid = {
		x: CENTER + nx * offset * RADIUS,
		y: CENTER + ny * offset * RADIUS,
	};
	const p1 = { x: mid.x + dx * RADIUS, y: mid.y + dy * RADIUS };
	const p2 = { x: mid.x - dx * RADIUS, y: mid.y - dy * RADIUS };
	const control = {
		x: mid.x + nx * curve * 2 * RADIUS,
		y: mid.y + ny * curve * 2 * RADIUS,
	};
	// Walk the circle from p2 back to p1 passing through the B-side direction.
	const startA = Math.atan2(p2.y - CENTER, p2.x - CENTER);
	const endA = Math.atan2(p1.y - CENTER, p1.x - CENTER);
	const throughA = Math.atan2(
		CENTER + ny * RADIUS - CENTER,
		CENTER + nx * RADIUS - CENTER,
	);
	const tau = Math.PI * 2;
	const norm = (a: number) => ((a % tau) + tau) % tau;
	const start = norm(startA);
	const end = norm(endA);
	const through = norm(throughA);
	const forward = (through - start + tau) % tau <= (end - start + tau) % tau;
	const steps = 28;
	let d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Q ${control.x.toFixed(2)} ${control.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
	for (let i = 1; i < steps; i++) {
		const t = i / steps;
		const a = forward
			? start + ((end - start + tau) % tau) * t
			: start - ((start - end + tau) % tau) * t;
		const point: Point = {
			x: CENTER + Math.cos(a) * RADIUS,
			y: CENTER + Math.sin(a) * RADIUS,
		};
		d += ` L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
	}
	return `${d} Z`;
}

function GradientDef({
	id,
	base,
	recipe,
	glareX,
	glareY,
}: {
	id: string;
	base: string;
	recipe: Recipe;
	glareX: number;
	glareY: number;
}) {
	if (recipe.radialBase) {
		const stops = radialStops(base, recipe.spread);
		return (
			<radialGradient
				id={id}
				cx={glareX / 100}
				cy={glareY / 100}
				r="0.75"
			>
				{stops.map(([offset, color]) => (
					<stop key={offset} offset={`${offset}%`} stopColor={color} />
				))}
			</radialGradient>
		);
	}
	const stops = gradientStops(base, recipe.spread);
	return (
		<linearGradient
			id={id}
			x1="0"
			y1="0"
			x2="1"
			y2="1"
			gradientTransform={`rotate(${recipe.angle} 0.5 0.5)`}
		>
			{stops.map(([offset, color]) => (
				<stop key={offset} offset={`${offset}%`} stopColor={color} />
			))}
		</linearGradient>
	);
}

export function FinishSwatch({ finish }: { finish?: FinishRecord }) {
	const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
	const base = finish?.base ?? "#d3d3d3";
	const material: FinishMaterial = finish?.material ?? "flat";
	const recipe = RECIPES[material] ?? RECIPES.flat;
	const glareX = finish?.sheen?.glareX ?? recipe.glareX;
	const glareY = finish?.sheen?.glareY ?? recipe.glareY;
	const glareOpacity = finish?.sheen?.intensity ?? recipe.glareOpacity;
	const shine = clamp(finish?.shine, recipe.shine);
	const grain = clamp(finish?.grain, recipe.grain);
	const weave = finish?.weave ?? recipe.weave;
	// Explicit duo records always win. Otherwise polished materials get an
	// automatic near-tone second side (same preset, only base differs).
	const effectiveDuo =
		finish?.duo ??
		(recipe.subtleDuo > 0
			? {
					base: shade(base, -recipe.subtleDuo),
					material,
				}
			: undefined);
	const duoRecipe: Recipe =
		effectiveDuo?.material && RECIPES[effectiveDuo.material]
			? RECIPES[effectiveDuo.material]
			: recipe;
	const duoBase = effectiveDuo?.base ?? base;

	const clipId = `fc-${uid}`;
	const gradAId = `fa-${uid}`;
	const gradBId = `fb-${uid}`;
	const specId = `fp-${uid}`;
	const hotId = `fh-${uid}`;
	const noiseId = `fn-${uid}`;
	const weaveId = `fw-${uid}`;
	const sideId = `fd-${uid}`;
	const glareCX = (glareX / 100) * SIZE;
	const glareCY = (glareY / 100) * SIZE;

	return (
		<svg
			width="100%"
			height="100%"
			viewBox={`0 0 ${SIZE} ${SIZE}`}
			role="presentation"
			aria-hidden="true"
		>
			<defs>
				<clipPath id={clipId}>
					<circle cx={CENTER} cy={CENTER} r={RADIUS} />
				</clipPath>
				<GradientDef
					id={gradAId}
					base={base}
					recipe={recipe}
					glareX={glareX}
					glareY={glareY}
				/>
				{effectiveDuo ? (
					<GradientDef
						id={gradBId}
						base={duoBase}
						recipe={duoRecipe}
						glareX={glareX}
						glareY={glareY}
					/>
				) : null}
				{effectiveDuo ? (
					<clipPath id={sideId}>
						<path d={splitPath(effectiveDuo.split ?? {})} />
					</clipPath>
				) : null}
				{/* Feathered speculars: radial fades to transparent so the glow
				    melts into the base instead of reading as stacked discs. */}
				<radialGradient id={specId} cx="0.5" cy="0.5" r="0.5">
					<stop offset="0%" stopColor="#ffffff" stopOpacity={0.95} />
					<stop offset="55%" stopColor="#ffffff" stopOpacity={0.3} />
					<stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
				</radialGradient>
				<radialGradient id={hotId} cx="0.5" cy="0.5" r="0.5">
					<stop offset="0%" stopColor="#ffffff" stopOpacity={0.95} />
					<stop offset="40%" stopColor="#ffffff" stopOpacity={0.45} />
					<stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
				</radialGradient>
				<filter id={noiseId} x="0" y="0" width="100%" height="100%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.9"
						numOctaves="2"
						stitchTiles="stitch"
					/>
					<feColorMatrix type="saturate" values="0" />
				</filter>
				<pattern
					id={weaveId}
					width="4"
					height="4"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(45)"
				>
					<rect width="4" height="4" fill="transparent" />
					<line
						x1="0"
						y1="0"
						x2="0"
						y2="4"
						stroke={shade(base, -0.25)}
						strokeWidth="1"
						opacity="0.55"
					/>
					<line
						x1="2"
						y1="0"
						x2="2"
						y2="4"
						stroke={shade(base, 0.3)}
						strokeWidth="1"
						opacity="0.5"
					/>
				</pattern>
			</defs>
			<g clipPath={`url(#${clipId})`}>
				{recipe.flat && !effectiveDuo ? (
					<rect width={SIZE} height={SIZE} fill={base} />
				) : (
					<rect width={SIZE} height={SIZE} fill={`url(#${gradAId})`} />
				)}
				{effectiveDuo ? (
					<rect
						width={SIZE}
						height={SIZE}
						fill={duoRecipe.flat ? duoBase : `url(#${gradBId})`}
						clipPath={`url(#${sideId})`}
					/>
				) : null}
				{weave ? (
					<rect width={SIZE} height={SIZE} fill={`url(#${weaveId})`} />
				) : null}
				{glareOpacity > 0 ? (
					<ellipse
						cx={glareCX}
						cy={glareCY}
						rx={SIZE * 0.45}
						ry={SIZE * 0.34}
						fill={`url(#${specId})`}
						opacity={glareOpacity}
					/>
				) : null}
				{shine > 0 ? (
					<ellipse
						cx={glareCX}
						cy={glareCY}
						rx={SIZE * 0.16}
						ry={SIZE * 0.12}
						fill={`url(#${hotId})`}
						opacity={Math.min(1, shine)}
					/>
				) : null}
				{grain > 0 ? (
					<rect
						width={SIZE}
						height={SIZE}
						filter={`url(#${noiseId})`}
						opacity={grain * 0.5}
						style={{ mixBlendMode: "overlay" }}
					/>
				) : null}
			</g>
			<circle
				cx={CENTER}
				cy={CENTER}
				r={RADIUS - 0.5}
				fill="none"
				stroke="rgba(0,0,0,0.18)"
				strokeWidth="1"
			/>
		</svg>
	);
}
