interface Tool {
	name: string;
	desc: string;
	href: string;
	onAir: boolean;
	number: number;
}

export const TOOLS: Tool[] = [
	{
		name: "UTM Builder",
		desc: "Build tracking URLs with source, medium & campaign parameters.",
		href: "/build-utms",
		onAir: true,
		number: 1,
	},
	{
		name: "QR Generator",
		desc: "Turn any URL into a downloadable QR code for print and offline.",
		href: "/qr",
		onAir: true,
		number: 2,
	},
	{
		name: "Word Counter",
		desc: "Words, characters, reading time — instantly, as you type.",
		href: "/word-count",
		onAir: true,
		number: 3,
	},
	{
		name: "URL Shortener",
		desc: "Branded short links. qiip.me/yourbrand/campaign — full control.",
		href: "/shorten-urls",
		onAir: false,
		number: 4,
	},
];
