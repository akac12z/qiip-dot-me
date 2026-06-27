import type { APIRoute } from "astro";
import { SITE_INFO, TOOLS } from "@/global/site-info.ts";

const getLlmsTxt = (siteUrl: string) => `# qiip.me

> ${SITE_INFO.description}
> Free, no sign-up required, privacy-first — all processing happens in your browser.

## Tools

- [UTM Builder](${siteUrl}/utm): ${TOOLS.utms.description}
- [QR Code Generator](${siteUrl}/qr): ${TOOLS.qr.description}
- [Word Counter](${siteUrl}/word-count): ${TOOLS.wc.description}
- [URL Shortener](${siteUrl}/shorten-urls): ${TOOLS.su.description}

## About

Built by ${SITE_INFO.author}. All tools are client-side only — no data collection, no backend.
`;

export const GET: APIRoute = ({ site }) => {
	const siteUrl = site ? site.origin : SITE_INFO.url;
	return new Response(getLlmsTxt(siteUrl), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
