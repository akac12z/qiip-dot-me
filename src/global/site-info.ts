/**
 * Global site constants for qiip.me.
 *
 * - `SITE_INFO` — site-wide metadata (title, description, URL, author, locale).
 * - `TOOLS_INFO` — TypeScript type for per-tool SEO metadata (Zod-validated) - https://zod.dev.
 * - `TOOLS` — per-tool SEO metadata keyed by tool slug, validated at build time.
 *
 * Always import from here instead of hardcoding site strings elsewhere.
 */

import { z } from "astro/zod";

export interface SITE_INFO {
	title: string;
	description: string;
	url: string;
	author: string;
	location: string;
	lang: string;
}

export const SITE_INFO: SITE_INFO = {
	title: "qiip.me - open source attribution tool",
	description:
		"Share your content, track what works, and keep everything under your own domain.",
	url: "https://qiip.me",
	author: "Chema Ferrandez",
	location: "es_ES",
	lang: "es",
};

const TOOLS_INTERFACE = z.object({
	title: z.string().max(50),
	description: z.string().min(110).max(150),
	ogImage: z.string().optional(),
	ogImageAlt: z.string().optional(),
});

export type TOOLS_INFO = z.infer<typeof TOOLS_INTERFACE>;

/**
 * qr: qr generator
 * utms: utm builder
 * su: shorten urls
 * wc: word counter
 */
export const TOOLS = z.record(z.string(), TOOLS_INTERFACE).parse({
	qr: {
		title: "Free QR Code Generator - qiip.me",
		description:
			"Generate QR codes instantly for any URL, text, or link. Free, fast, and customizable — no sign-up required. Keep your data under your domain.",
		ogImage: "/og-tools/og-image-qr.webp",
		ogImageAlt: "",
	},
	utms: {
		title: "UTM Builder - qiip.me",
		description:
			"Build UTM-tagged URLs in seconds. Track your campaigns across Google Analytics, social media, and more — all without leaving your own domain.",
		ogImage: "/og-tools/og-image-utms.webp",
		ogImageAlt: "UTM Builder tool interface on qiip.me",
	},
	su: {
		title: "URL Shortener - qiip.me",
		description:
			"Shorten any URL and share clean, memorable links. Track clicks and keep full control over your links — no third-party redirects, no data leaks.",
		ogImage: "/og-tools/og-image-su.webp",
		ogImageAlt: "URL Shortener tool interface on qiip.me",
	},
	wc: {
		title: "Word Counter - qiip.me",
		description:
			"Count words, characters, sentences, and reading time in real time. A clean, distraction-free writing tool built for writers and content creators.",
		ogImage: "/og-tools/og-image-wc.webp",
		ogImageAlt: "Word Counter tool interface on qiip.me",
	},
});
