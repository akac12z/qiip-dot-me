interface Tool {
	toolName: string;
	desc: string;
	href: string;
	onAir: boolean;
	number: number;
}

export const TOOLS: Tool[] = [
	{
		toolName: "UTM Builder",
		desc: "Build tracking URLs with with your custom parameters.",
		href: "/utm",
		onAir: true,
		number: 1,
	},
	{
		toolName: "QR Generator",
		desc: "Turn any URL into a downloadable QR code for print and offline.",
		href: "/qr",
		onAir: true,
		number: 2,
	},
	{
		toolName: "Word Counter",
		desc: "Words, characters, reading time — instantly.",
		href: "/word-count",
		onAir: false,
		number: 3,
	},
	{
		toolName: "URL Shortener",
		desc: "Beautiful branded links. qiip.me/your_brand/campaign — full control.",
		href: "/shorten-urls",
		onAir: false,
		number: 4,
	},
];
