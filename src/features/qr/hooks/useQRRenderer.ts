import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import type { DOT_LEVEL } from "../rules/dot.ts";
import type { QRFormat, QRLogoConfig } from "../rules/qr.interfaces.ts";

const CANVAS_SIZE = 400;

interface UseQRRendererParams {
	text: string;
	dotLevel: DOT_LEVEL;
	fgColor: string;
	bgColor: string;
	borderRadius: number;
	logo: QRLogoConfig | null;
}

export function useQRRenderer({
	text,
	dotLevel,
	fgColor,
	bgColor,
	borderRadius,
	logo,
}: UseQRRendererParams) {
	const [hasQR, setHasQR] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const svgRef = useRef<string>("");
	const logoRenderToken = useRef<{ cancelled: boolean }>({ cancelled: false });

	const hasText = text.trim().length > 0;
	const isValidUrl = hasText && text.startsWith("https://");
	const urlError = hasText && !isValidUrl;

	useEffect(() => {
		if (!isValidUrl) {
			setHasQR(false);
			canvasRef.current
				?.getContext("2d")
				?.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			return;
		}
		renderQR();
		// logo is an object — list its properties individually so the effect only
		// re-runs when the values change, not when the parent creates a new object reference
	}, [
		text,
		isValidUrl,
		dotLevel,
		fgColor,
		bgColor,
		borderRadius,
		logo?.url,
		logo?.size,
		logo?.hasBorder,
	]);

	function renderQR() {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		try {
			const qr = QRCode.create(text, { errorCorrectionLevel: dotLevel });
			const moduleCount = qr.modules.size;
			const margin = 16;
			const cellSize = (CANVAS_SIZE - margin * 2) / moduleCount;
			const dotRadius = (cellSize / 2) * (borderRadius / 5);

			ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			ctx.fillStyle = fgColor;

			for (let row = 0; row < moduleCount; row++) {
				for (let col = 0; col < moduleCount; col++) {
					if (!qr.modules.get(row, col)) continue;
					const x = margin + col * cellSize;
					const y = margin + row * cellSize;
					if (dotRadius > 0) {
						ctx.beginPath();
						ctx.roundRect(x, y, cellSize, cellSize, dotRadius);
						ctx.fill();
					} else {
						ctx.fillRect(x, y, cellSize, cellSize);
					}
				}
			}

			if (logo) {
				logoRenderToken.current.cancelled = true;
				const token = { cancelled: false };
				logoRenderToken.current = token;
				overlayLogo(canvas, ctx, logo, token);
			}
			setHasQR(true);

			QRCode.toString(text, {
				type: "svg",
				errorCorrectionLevel: dotLevel,
			}).then((svg) => {
				svgRef.current = svg;
			});
		} catch {
			setHasQR(false);
		}
	}

	function overlayLogo(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D,
		logoConfig: QRLogoConfig,
		renderToken: { cancelled: boolean },
	) {
		const img = new Image();
		img.src = logoConfig.url;
		img.onload = () => {
			if (renderToken.cancelled) return;
			const size = CANVAS_SIZE * (logoConfig.size / 100);
			const x = (CANVAS_SIZE - size) / 2;
			const y = (CANVAS_SIZE - size) / 2;

			if (logoConfig.hasBorder) {
				const pad = size * 0.12;
				ctx.fillStyle = bgColor;
				ctx.beginPath();
				ctx.roundRect(x - pad, y - pad, size + pad * 2, size + pad * 2, 6);
				ctx.fill();
			}
			ctx.drawImage(img, x, y, size, size);
		};
	}

	function download(format: QRFormat) {
		if (!hasQR) return;

		if (format === "svg") {
			const blob = new Blob([svgRef.current], { type: "image/svg+xml" });
			const url = URL.createObjectURL(blob);
			triggerDownload(url, "qr-code.svg");
			URL.revokeObjectURL(url);
			return;
		}

		const canvas = canvasRef.current;
		if (!canvas) return;
		triggerDownload(
			canvas.toDataURL(`image/${format}`, 1.0),
			`qr-code.${format}`,
		);
	}

	function triggerDownload(url: string, filename: string) {
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
	}

	return { canvasRef, hasQR, urlError, download };
}
