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

const FAQ_INTERFACE = z.object({
	question: z.string(),
	answer: z.string(),
});

const HOWTO_STEP_INTERFACE = z.object({
	name: z.string(),
	text: z.string(),
});

const TOOLS_INTERFACE = z.object({
	title: z.string().max(50),
	description: z.string().min(110).max(150),
	ogImage: z.string().optional(),
	ogImageAlt: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	faqs: z.array(FAQ_INTERFACE).optional(),
	howTo: z.array(HOWTO_STEP_INTERFACE).optional(),
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
		keywords: [
			"qr code generator",
			"free qr code",
			"create qr code online",
			"free qr code generator no sign up",
			"generate qr code for url",
			"qr code maker online free",
		],
		howTo: [
			{ name: "Enter your content", text: "Enter the URL or text you want to encode into the QR code." },
			{ name: "Generate instantly", text: "The QR code is generated instantly in real time as you type." },
			{ name: "Download", text: "Download the QR code as a PNG file, ready for print or digital use." },
		],
		faqs: [
			{
				question: "Is this QR code generator free?",
				answer: "Yes, completely free with no sign-up or account required.",
			},
			{
				question: "What can I encode in a QR code?",
				answer: "Any URL, plain text, email address, or phone number.",
			},
			{
				question: "Do the QR codes expire?",
				answer: "No. QR codes generated here are static images that never expire.",
			},
			{
				question: "What format are QR codes downloaded in?",
				answer: "PNG format, ready to use in any design or print project.",
			},
		],
	},
	utms: {
		title: "UTM Builder - qiip.me",
		description:
			"Build UTM-tagged URLs in seconds. Track your campaigns across Google Analytics, social media, and more — all without leaving your own domain.",
		ogImage: "/og-tools/og-image-utms.webp",
		ogImageAlt: "UTM Builder tool interface on qiip.me",
		keywords: [
			"utm builder",
			"utm generator",
			"utm link builder",
			"utm parameter builder google analytics",
			"build utm tracking url free",
			"utm campaign url builder online",
		],
		howTo: [
			{ name: "Enter the destination URL", text: "Paste the URL you want to track into the URL field." },
			{ name: "Fill in UTM Source", text: "Enter the traffic source, such as google, newsletter, or twitter." },
			{ name: "Fill in UTM Medium", text: "Enter the marketing medium, such as cpc, email, or social." },
			{ name: "Enter a Campaign Name", text: "Add a campaign name to identify this specific campaign." },
			{ name: "Add optional parameters", text: "Optionally fill in UTM Term and UTM Content for extra tracking granularity." },
			{ name: "Copy the UTM URL", text: "Copy the generated UTM URL and use it in your campaign." },
		],
		faqs: [
			{
				question: "What is a UTM builder?",
				answer: "A UTM builder creates URLs with UTM parameters (source, medium, campaign, term, content) so you can track where your traffic comes from in Google Analytics.",
			},
			{
				question: "Are UTM parameters free to use?",
				answer: "Yes, UTM parameters are a free Google Analytics feature available to anyone with a website.",
			},
			{
				question: "Does the UTM builder store my data?",
				answer: "No. All processing happens in your browser — no data is sent to any server.",
			},
			{
				question: "What UTM parameters can I add?",
				answer: "You can add utm_source, utm_medium, utm_campaign, utm_term, and utm_content.",
			},
		],
	},
	su: {
		title: "URL Shortener - qiip.me",
		description:
			"Shorten any URL and share clean, memorable links. Track clicks and keep full control over your links — no third-party redirects, no data leaks.",
		ogImage: "/og-tools/og-image-su.webp",
		ogImageAlt: "URL Shortener tool interface on qiip.me",
		keywords: [
			"url shortener",
			"link shortener",
			"shorten url free",
			"free url shortener no sign up",
			"custom link shortener no redirect",
			"shorten long url online free",
		],
		howTo: [
			{ name: "Paste your URL", text: "Paste the long URL you want to shorten into the input field." },
			{ name: "Shorten the link", text: "Click the shorten button to generate a short link instantly." },
			{ name: "Copy and share", text: "Copy the shortened URL and share it anywhere." },
			{ name: "Track clicks", text: "Monitor click analytics from your dashboard." },
		],
		faqs: [
			{
				question: "Is this URL shortener free?",
				answer: "Yes, completely free with no account or registration required.",
			},
			{
				question: "Do shortened URLs expire?",
				answer: "No, shortened links created here are permanent.",
			},
			{
				question: "Are my shortened links private?",
				answer: "Yes. No third-party services are involved — your links stay under your own domain with no data leaks.",
			},
			{
				question: "Can I track clicks on shortened URLs?",
				answer: "Yes, click tracking is included with every shortened link.",
			},
		],
	},
	wc: {
		title: "Word Counter - qiip.me",
		description:
			"Count words, characters, sentences, and reading time in real time. A clean, distraction-free writing tool built for writers and content creators.",
		ogImage: "/og-tools/og-image-wc.webp",
		ogImageAlt: "Word Counter tool interface on qiip.me",
		keywords: [
			"word counter",
			"character counter",
			"reading time calculator",
			"online word counter free",
			"count words and characters online",
			"word count reading time estimator",
		],
		howTo: [
			{ name: "Paste or type your text", text: "Paste or type your text into the input area." },
			{ name: "Read your stats", text: "Your word count, character count, sentence count, and estimated reading time update in real time." },
		],
		faqs: [
			{
				question: "How does the word counter work?",
				answer: "Paste or type your text and it instantly counts words, characters, sentences, and estimates reading time.",
			},
			{
				question: "Is my text saved or sent anywhere?",
				answer: "No. All counting happens in your browser — your text never leaves your device.",
			},
			{
				question: "How is reading time calculated?",
				answer: "Based on an average reading speed of 200 words per minute.",
			},
			{
				question: "Does it count characters with and without spaces?",
				answer: "Yes, both counts are shown separately.",
			},
		],
	},
});
