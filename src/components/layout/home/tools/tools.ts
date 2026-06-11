/**
 * HOW TO ADD A NEW TOOL
 * ─────────────────────
 * 1. Pick a tag: initials of the tool name, or the path slug if it's ≤3 chars.
 *    e.g. "URL Shortener" → path /shorten-urls → tag "su"
 *
 * 2. Add the color token in src/styles/global.css:
 *    --tool-{tool_tag_name}: #yourcolor;
 *
 * 3. Add the entry to the TOOLS array below.
 *
 * That's it. The header menu, cards, and pulse animation pick it up automatically.
 *
 * ─────────────────────
 * HOW THE COLOR SYSTEM WORKS
 * ─────────────────────
 * Each tool has a `color` field set to a CSS variable reference ("var(--tool-utm)").
 * Components pass this value as both `backgroundColor` and `--card-accent` via inline
 * styles (`as React.CSSProperties`). The `--card-accent` variable is what the pulse
 * animation in tm.module.css reads to glow with the tool's own color.
 */
export interface ToolTag {
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
	color: `var(--tool-${ToolTag["toolTag"]})`;
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
		color: "var(--tool-utm)",
	},
	{
		toolName: "QR Generator",
		titlePage: "Generate your QR code",
		desc: "Turn any URL into a custom QR code and download it in your preferred format!",
		href: "/qr",
		onAir: true,
		number: 2,
		tag: { toolTag: "qr" },
		color: "var(--tool-qr)",
	},
	{
		toolName: "Word Counter",
		titlePage: "Count your words",
		desc: "Words, characters, reading time & tokens count — instantly.",
		href: "/word-count",
		onAir: true,
		number: 3,
		tag: { toolTag: "wc" },
		color: "var(--tool-wc)",
	},
	{
		toolName: "URL Shortener",
		titlePage: "Shorten your URLs",
		desc: "Beautiful branded UTM links: qiip.me/your_brand/campaign — full control.",
		href: "/shorten-urls",
		onAir: false,
		number: 4,
		tag: { toolTag: "su" },
		color: "var(--tool-su)",
	},
];
