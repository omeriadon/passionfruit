import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from "ogl";
import { useEffect, useRef, type CSSProperties } from "react";

import "./styles.css";

const MAX_STRANDS = 12;
const MAX_COLORS = 8;
const RADIUS = 0.46;
const HOLD_MS = 20; // press shorter than this = tap (pop on release), longer = hold (grow while held)
const PULSE_PEAK_MS = 110; // how long a tap pushes toward peak before springing back

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Shared by both shaders: stretch along the pull, compress across it.
const STRETCH = `
vec2 stretch(vec2 p, vec2 pull, float amt, float fall) {
  float m = length(pull);
  vec2 d = m > 0.0001 ? pull / m : vec2(0.0);
  float k = (1.0 - exp(-m * 1.8)) * amt * fall;
  float a = dot(p, d);
  return d * (a / (1.0 + k * 1.5)) + (p - d * a) * (1.0 + k * 0.85);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime, uPhase, uAmplitude, uWaviness, uThickness, uGlow, uTaper, uSpread, uHueShift;
uniform float uIntensity, uOpacity, uScale, uSaturation, uGlassRadius, uStretchIntensity;
uniform vec2 uResolution, uPull;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount, uStrandCount;
out vec4 fragColor;
const float PI = 3.14159265;
${STRETCH}

vec3 strandColor(float t) {
  if (uColorCount <= 0) return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
  float s = fract(t) * float(uColorCount);
  int i = int(floor(s));
  return mix(uColors[i], uColors[i + 1 >= uColorCount ? 0 : i + 1], fract(s));
}

void main() {
  vec2 rawUv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float falloff = 1.0 - smoothstep(0.0, max(uGlassRadius * 2.5, 0.0001), length(rawUv));
  vec2 uv = stretch(rawUv, uPull, uStretchIntensity, falloff) / max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);
  vec3 col = vec3(0.0);

  for (int i = 0; i < ${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;
    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;
    float tt = uPhase;

    float w = sin(uv.x * freq + tt * spd + ph) * 0.60 + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;
    float y = w * (0.1 + 0.02 * e) * env * uAmplitude;

    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (abs(uv.y - y) + thick * 0.45);
    g *= g;

    col += strandColor(fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float alpha = clamp(max(max(col.r, col.g), col.b), 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * uOpacity, alpha);
}
`;

const GLASS_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uScene;
uniform vec2 uResolution, uPull;
uniform float uRadius, uRefraction, uDispersion, uStretchIntensity, uTime, uLiquidWobble, uLiquidSpeed, uTint;
out vec4 fragColor;
${STRETCH}

vec2 toUv(vec2 p) { return p * (uResolution.y / uResolution) + 0.5; }

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  vec2 pMask = stretch(p, uPull, uStretchIntensity, 1.0);
  float d = length(pMask);

  float angle = atan(pMask.y, pMask.x);
  float t = uTime * uLiquidSpeed;
  float wobble = (
    sin(angle * 3.0 + t * 0.6) * 0.45 +
    sin(angle * 5.0 - t * 0.42 + 1.7) * 0.25 +
    sin(angle * 2.0 + t * 0.27 + 0.4) * 0.30
  ) / 2.45;

  float rEff = uRadius * (1.0 + wobble * uLiquidWobble * 0.65);
  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(rEff - edge, rEff + edge, d);
  if (mask <= 0.0) { fragColor = vec4(0.0); return; }

  float z = sqrt(max(rEff * rEff - d * d, 0.0)) / rEff;
  float nd = d / rEff;
  vec2 rdir = d > 0.0 ? pMask / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -rdir * lens * uRefraction * 0.15;
  vec2 disp = -rdir * lens * uDispersion * 0.012;

  vec3 light = vec3(
    texture(uScene, toUv(p + offset - disp)).r,
    texture(uScene, toUv(p + offset)).g,
    texture(uScene, toUv(p + offset + disp)).b
  );

  float fres = pow(1.0 - z, 3.0);
  float spec = pow(max(dot(pMask / max(rEff, 1e-4), normalize(vec2(-0.55, 0.6))), 0.0), 6.0);
  spec *= smoothstep(rEff, rEff * 0.55, d);

  vec3 emissive = light + vec3(fres * 0.18 + spec * 0.4);
  float ea = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // Dark tinted body: black at uTint opacity darkens whatever is behind the orb.
  float bodyA = uTint + fres * 0.05;
  float outA = ea + bodyA * (1.0 - ea);

  fragColor = vec4(emissive * mask, outA * mask);
}
`;

export interface StrandsProps {
	colors?: string[];
	count?: number;
	speed?: number;
	amplitude?: number;
	waviness?: number;
	thickness?: number;
	glow?: number;
	taper?: number;
	spread?: number;
	hueShift?: number;
	intensity?: number;
	saturation?: number;
	opacity?: number;
	scale?: number;
	glass?: boolean;
	refraction?: number;
	dispersion?: number;
	glassSize?: number;
	draggable?: boolean;
	stretchIntensity?: number;
	dragSensitivity?: number;
	smoothing?: number;
	liquidWobble?: number;
	liquidSpeed?: number;
	/** Glass: how dark the orb body is (0 = clear, 1 = solid black). */
	glassTint?: number;
	/** Fixed soft shadow under the orb (0 = off, opacity 0-1). Doesn't react to drag, click or wobble. */
	shadow?: number;
	/** 0-1 excitement. Eases in/out: faster, wavier, more saturated strands (e.g. while the user types). */
	energy?: number;
	/** Fires on any press-and-release on the orb that wasn't a drag (works for long presses too). */
	onTap?: () => void;
	/** How much bigger it grows on click/hold (0.2 = +20%). */
	clickScale?: number;
	/** Extra saturation added at the peak of the click pulse. */
	clickSaturation?: number;
	/** Spring stiffness. Higher = snappier. */
	clickStiffness?: number;
	/** Damping ratio. ~0.6 = tiny bounce, 1 = no bounce, lower = more bounce. */
	clickDamping?: number;
	className?: string;
	style?: CSSProperties;
}

type Props = Required<Omit<StrandsProps, "className" | "style">>;

const DEFAULTS: Props = {
	colors: ["#ffffff", "#63f398", "#5379ff", "#f3c44c", "#f09a78"],
	count: 5,
	speed: 0.4,
	amplitude: 0.7,
	waviness: 1.1,
	thickness: 0.7,
	glow: 1.6,
	taper: 3,
	spread: 1,
	hueShift: 0,
	intensity: 0.6,
	saturation: 1,
	opacity: 1,
	scale: 1.1,
	glass: true,
	refraction: 1,
	dispersion: 1,
	glassSize: 1,
	glassTint: 0.4,
	shadow: 0.35,
	energy: 0,
	onTap: () => {},
	draggable: true,
	stretchIntensity: 2,
	dragSensitivity: 2,
	smoothing: 0.18,
	liquidWobble: 0.1,
	liquidSpeed: 5,
	clickScale: 0.08,
	clickSaturation: 1.65,
	clickStiffness: 275,
	clickDamping: 0.6,
};

// uniform name -> prop that feeds it directly
const STRAND_UNIFORMS: Record<string, keyof Props> = {
	uAmplitude: "amplitude",
	uWaviness: "waviness",
	uThickness: "thickness",
	uGlow: "glow",
	uTaper: "taper",
	uSpread: "spread",
	uHueShift: "hueShift",
	uIntensity: "intensity",
	uOpacity: "opacity",
	uStretchIntensity: "stretchIntensity",
};
const GLASS_UNIFORMS: Record<string, keyof Props> = {
	uRefraction: "refraction",
	uDispersion: "dispersion",
	uStretchIntensity: "stretchIntensity",
	uLiquidWobble: "liquidWobble",
	uLiquidSpeed: "liquidSpeed",
	uTint: "glassTint",
};

const zeros = (names: string[]) =>
	Object.fromEntries(names.map((n) => [n, { value: 0 }]));

const sync = (prog: Program, map: Record<string, keyof Props>, c: Props) => {
	for (const u in map) prog.uniforms[u].value = c[map[u]];
};

const buildPalette = (colors: string[]) =>
	Array.from({ length: MAX_COLORS }, (_, i) => {
		const c = new Color(colors[i] ?? colors[colors.length - 1] ?? "#ffffff");
		return [c.r, c.g, c.b];
	});

export default function Strands({
	className = "",
	style,
	...rest
}: StrandsProps) {
	// Explicit `undefined` props fall back to defaults.
	const props = {
		...DEFAULTS,
		...Object.fromEntries(
			Object.entries(rest).filter(([, v]) => v !== undefined),
		),
	} as Props;

	const propsRef = useRef(props);
	propsRef.current = props;

	const ctnDom = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctn = ctnDom.current;
		if (!ctn) return;

		const renderer = new Renderer({
			alpha: true,
			premultipliedAlpha: true,
			antialias: true,
		});
		const gl = renderer.gl;
		gl.clearColor(0, 0, 0, 0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.canvas.style.backgroundColor = "transparent";

		const geometry = new Triangle(gl);
		if (geometry.attributes.uv) delete geometry.attributes.uv;

		let lastColors = propsRef.current.colors;

		const program = new Program(gl, {
			vertex: VERT,
			fragment: FRAG,
			uniforms: {
				...zeros([
					...Object.keys(STRAND_UNIFORMS),
					"uTime",
					"uPhase",
					"uScale",
					"uSaturation",
					"uColorCount",
					"uStrandCount",
					"uGlassRadius",
				]),
				uResolution: { value: [1, 1] },
				uColors: { value: buildPalette(lastColors) },
				uPull: { value: [0, 0] },
			},
		});
		const mesh = new Mesh(gl, { geometry, program });

		const rt = new RenderTarget(gl, {
			width: ctn.offsetWidth,
			height: ctn.offsetHeight,
		});

		const glassProgram = new Program(gl, {
			vertex: VERT,
			fragment: GLASS_FRAG,
			uniforms: {
				...zeros([...Object.keys(GLASS_UNIFORMS), "uRadius", "uTime"]),
				uScene: { value: rt.texture },
				uResolution: { value: [1, 1] },
				uPull: { value: [0, 0] },
			},
		});
		const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

		ctn.appendChild(gl.canvas);

		const resize = () => {
			const w = ctn.offsetWidth;
			const h = ctn.offsetHeight;
			renderer.setSize(w, h);
			rt.setSize(w, h);
			program.uniforms.uResolution.value =
				glassProgram.uniforms.uResolution.value = [w, h];
		};
		window.addEventListener("resize", resize);
		resize();

		// ---- pointer state ----
		type V = { x: number; y: number };
		const pull: V = { x: 0, y: 0 };
		let target: V = { x: 0, y: 0 };
		let dir: V = { x: 0, y: 0 }; // kept stable so orbiting the orb doesn't spin the deformation
		let hasDir = false;
		let dragStart: V = { x: 0, y: 0 };
		let dragging = false;
		let cand: V | null = null; // press start, while it can still become a tap
		let pressPos: V | null = null; // press start for onTap; only cleared by release/cancel
		let dragged = false;
		let pressActive = false;
		let holdActive = false;
		let pressStart = 0;
		let holdUntil = 0;
		const spring = { pos: 0, vel: 0 };

		const toShaderSpace = (x: number, y: number): V => {
			const r = ctn.getBoundingClientRect();
			return {
				x: (x - r.left - r.width / 2) / r.height,
				y: -(y - r.top - r.height / 2) / r.height,
			};
		};
		const idleCursor = () =>
			(ctn.style.cursor = propsRef.current.draggable ? "grab" : "");

		// Ends any press/drag (also used for cancel and lost capture).
		const endPress = () => {
			cand = pressPos = null;
			pressActive = holdActive = false;
			if (!dragging) return;
			dragging = hasDir = false;
			target = { x: 0, y: 0 };
			idleCursor();
		};

		const down = (e: PointerEvent) => {
			const p = toShaderSpace(e.clientX, e.clientY);
			const inside =
				Math.hypot(p.x, p.y) <= RADIUS * propsRef.current.glassSize;

			cand = inside ? p : null;
			pressPos = inside ? p : null;
			dragged = false;
			pressActive = inside;
			holdActive = false;
			pressStart = performance.now();

			if (!propsRef.current.draggable || !inside) return;
			dragStart = p;
			hasDir = false;
			target = { x: 0, y: 0 };
			dragging = true;
			ctn.setPointerCapture(e.pointerId);
			ctn.style.cursor = "grabbing";
		};

		const move = (e: PointerEvent) => {
			if (!cand && !dragging && !pressPos) return;
			const p = toShaderSpace(e.clientX, e.clientY);
			if (pressPos && Math.hypot(p.x - pressPos.x, p.y - pressPos.y) > 0.02)
				dragged = true;

			// Moved too far to be a tap: it's a drag, so grow and stay grown.
			if (cand && Math.hypot(p.x - cand.x, p.y - cand.y) > 0.02) {
				cand = null;
				holdActive = true;
			}
			if (!dragging) return;

			const dx = p.x - dragStart.x;
			const dy = p.y - dragStart.y;
			const dist = Math.hypot(dx, dy);
			if (dist < 0.002) {
				target = { x: 0, y: 0 };
				return;
			}

			let nx = dx / dist;
			let ny = dy / dist;
			if (hasDir) {
				nx = dir.x + (nx - dir.x) * 0.08;
				ny = dir.y + (ny - dir.y) * 0.08;
				const l = Math.hypot(nx, ny);
				if (l > 0.0001) {
					nx /= l;
					ny /= l;
				}
			}
			hasDir = true;
			dir = { x: nx, y: ny };

			const c = propsRef.current;
			const pd = Math.min(dist * c.dragSensitivity, 8 * c.glassSize);
			target = { x: nx * pd, y: ny * pd };
		};

		const up = (e: PointerEvent) => {
			const now = performance.now();
			if (cand && !holdActive && now - pressStart < HOLD_MS)
				holdUntil = now + PULSE_PEAK_MS; // tap
			const tapped = !!pressPos && !dragged;
			endPress();
			try {
				ctn.releasePointerCapture(e.pointerId);
			} catch {}
			if (tapped) propsRef.current.onTap();
		};

		const events: [string, EventListener][] = [
			["pointerdown", down as EventListener],
			["pointermove", move as EventListener],
			["pointerup", up as EventListener],
			["pointercancel", endPress],
			["lostpointercapture", endPress],
		];
		events.forEach(([k, f]) => ctn.addEventListener(k, f));
		idleCursor();

		// ---- render loop ----
		let raf = 0;
		let phase = 0;
		let energy = 0;
		let last = performance.now();

		const update = (t: number) => {
			raf = requestAnimationFrame(update);

			const c = propsRef.current;
			const time = t * 0.001;
			const now = performance.now();
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;

			// Ease toward the target energy so typing starts/stops feel smooth.
			energy +=
				(Math.min(Math.max(c.energy, 0), 1) - energy) * (1 - Math.exp(-dt * 5));
			phase += dt * c.speed * (1 + 1.7 * energy);

			// Held long enough without releasing: grow and stay grown.
			if (pressActive && !holdActive && now - pressStart > HOLD_MS) {
				holdActive = true;
				cand = null;
			}

			// Damped spring: target 1 while held / mid-tap, else 0.
			const goal = holdActive || now < holdUntil ? 1 : 0;
			const k = Math.max(c.clickStiffness, 1);
			spring.vel +=
				((goal - spring.pos) * k -
					spring.vel * 2 * c.clickDamping * Math.sqrt(k)) *
				dt;
			spring.pos += spring.vel * dt;
			if (!goal && Math.abs(spring.pos) < 0.001 && Math.abs(spring.vel) < 0.001)
				spring.pos = spring.vel = 0;

			const pulse = spring.pos;
			const radius = RADIUS * c.glassSize * (1 + c.clickScale * pulse);

			const sm = Math.min(Math.max(c.smoothing, 0.01), 1);
			for (const a of ["x", "y"] as const) {
				pull[a] += (target[a] - pull[a]) * sm;
				if (!dragging && Math.abs(pull[a]) < 0.0005) pull[a] = 0;
			}

			const u = program.uniforms;
			sync(program, STRAND_UNIFORMS, c);
			if (c.colors !== lastColors) {
				lastColors = c.colors;
				u.uColors.value = buildPalette(c.colors);
			}
			u.uColorCount.value = Math.min(c.colors.length, MAX_COLORS);
			u.uStrandCount.value = Math.min(
				Math.max(Math.round(c.count), 1),
				MAX_STRANDS,
			);
			u.uTime.value = time;
			u.uScale.value = c.scale * (1 + c.clickScale * pulse);
			u.uPhase.value = phase;
			u.uWaviness.value = c.waviness * (1 + 0.5 * energy);
			u.uAmplitude.value = c.amplitude * (1 + 0.3 * energy);
			u.uSaturation.value = Math.max(
				c.saturation + c.clickSaturation * pulse + 1.5 * energy,
				0,
			);
			u.uPull.value = [pull.x, pull.y];
			u.uGlassRadius.value = radius;

			if (c.glass) {
				renderer.render({ scene: mesh, target: rt });
				sync(glassProgram, GLASS_UNIFORMS, c);
				const g = glassProgram.uniforms;
				g.uScene.value = rt.texture;
				g.uRadius.value = radius;
				g.uPull.value = u.uPull.value;
				g.uTime.value = time;
				renderer.render({ scene: glassMesh });
			} else {
				renderer.render({ scene: mesh });
			}
		};
		raf = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			events.forEach(([k, f]) => ctn.removeEventListener(k, f));
			gl.canvas.remove();
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, []);

	// Static shadow: a separate element behind the canvas, so it never morphs with stretch/wobble/pulse.
	// A soft disc that is darkest at its centre and fades smoothly outward (no ring, no hard edges),
	// shifted down so the shadow sits heavier below the orb.
	const k = (n: number) => `rgba(0,0,0,${(props.shadow * n).toFixed(3)})`;
	const shadowStyle: CSSProperties = {
		position: "absolute",
		left: "50%",
		top: "50%",
		height: `${2 * RADIUS * props.glassSize * 2 * 100}%`, // 2x the orb's diameter
		aspectRatio: "1",
		transform: "translate(-50%, -42%)", // 8% of its height down
		borderRadius: "50%",
		pointerEvents: "none",
		zIndex: -1,
		filter: "blur(6px)",
		background: `radial-gradient(closest-side, ${k(1)} 0%, ${k(1)} 25%, ${k(0.7)} 50%, ${k(0.4)} 65%, ${k(0.15)} 80%, ${k(0.04)} 92%, transparent 100%)`,
	};

	return (
		<div
			ref={ctnDom}
			className={`strands-container ${className}`}
			style={{ position: "relative", isolation: "isolate", ...style }}
		>
			{props.glass && props.shadow > 0 && (
				<div aria-hidden style={shadowStyle} />
			)}
		</div>
	);
}
