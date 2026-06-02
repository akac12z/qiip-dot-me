/**
 * This tooltag is for customs tool colors.
 * The letters who i'll choose to name the tools will always be the initials
 * of the words or the word itself if it has three letters or fewer.
 */
interface ToolTag {
	toolTag: "utm" | "qr" | "wc" | "su";
}

interface Tool {
	toolName: string;
	titlePage: string;
	desc: string;
	href: string;
	onAir: boolean;
	number: number;
	tag: ToolTag;
}

export const TOOLS: Tool[] = [
	{
		toolName: "UTM Builder",
		titlePage: "Build your tracking URL",
		desc: "Fill in the fields and get your UTM URL ready to paste into your campaign.",
		href: "/utm",
		onAir: true,
		number: 1,
		tag: { toolTag: "utm" },
	},
	{
		toolName: "QR Generator",
		titlePage: "Generate your QR code",
		desc: "Turn any URL into a custom QR code and download it in your preferred format!",
		href: "/qr",
		onAir: true,
		number: 2,
		tag: { toolTag: "qr" },
	},
	{
		toolName: "Word Counter",
		titlePage: "Count your words",
		desc: "Words, characters, reading time — instantly.",
		href: "/word-count",
		onAir: true,
		number: 3,
		tag: { toolTag: "wc" },
	},
	{
		toolName: "URL Shortener",
		titlePage: "Shorten your URLs",
		desc: "Beautiful branded UTM links: qiip.me/your_brand/campaign — full control.",
		href: "/shorten-urls",
		onAir: false,
		number: 4,
		tag: { toolTag: "su" },
	},
];
