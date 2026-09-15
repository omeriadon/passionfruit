import {
	Airplay,
	Glasses,
	Headphones,
	Home,
	Laptop,
	Monitor,
	Pencil,
	Smartphone,
	Tablet,
	TvMinimal,
	Watch,
	type LucideProps,
} from "lucide-react";

const icons = {
	airpods: Headphones,
	"apple-pencil": Pencil,
	"apple-tv": TvMinimal,
	"apple-watch": Watch,
	homepod: Home,
	ipad: Tablet,
	iphone: Smartphone,
	mac: Laptop,
	"apple-display": Monitor,
	vision: Glasses,
} as const;

export function DeviceTypeIcon({
	category,
	...props
}: LucideProps & { category: string }) {
	const Icon = icons[category as keyof typeof icons] ?? Airplay;
	return <Icon aria-hidden="true" {...props} />;
}
