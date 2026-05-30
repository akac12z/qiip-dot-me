import type { DOT_LEVEL } from "./dot.ts";

export type QRFormat = "png" | "jpeg" | "webp" | "svg";

export interface QRLogoConfig {
	url: string;
	/** Percentage of the QR canvas (10–25) */
	size: number;
	hasBorder: boolean;
}

export interface QRConfig {
	text: string;
	dotLevel: DOT_LEVEL;
	fgColor: string;
	bgColor: string;
	borderRadius: number;
	format: QRFormat;
	logo: QRLogoConfig | null;
}
