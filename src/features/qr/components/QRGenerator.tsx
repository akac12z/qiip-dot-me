import { useState } from "react";
import styles from "./qr.module.css";
import { type DOT_LEVEL } from "../rules/dot.ts";
import type { QRLogoConfig } from "../rules/qr.interfaces.ts";
import { useQRRenderer } from "../hooks/useQRRenderer.ts";
import QrDownload from "./QrDownload.tsx";
import QrPreview from "./QrPreview.tsx";
import UrlField from "./UrlField.tsx";
import DotShape from "./DotShape.tsx";
import ErrorLevel from "./ErrorLevel.tsx";
import LogoUpload from "./LogoUpload.tsx";
import ColorPicker from "./ColorPicker.tsx";

export default function QRGenerator() {
	const [baseUrl, setBaseURL] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get("url") ?? "";
	});
	const [DOT_LEVEL, setDOT_LEVEL] = useState<DOT_LEVEL>("M");
	const [fgColor, setFgColor] = useState("#000000");
	const [bgColor, setBgColor] = useState("#ffffff");
	const [logoUrl, setLogoUrl] = useState<string | null>(null);
	const [logoSize, setLogoSize] = useState(22);
	const [logoBorder, setLogoBorder] = useState(true);
	const [borderRadius, setBorderRadius] = useState(0);
	const [format, setFormat] = useState<"png" | "jpeg" | "webp" | "svg">("png");

	const logo: QRLogoConfig | null = logoUrl
		? { url: logoUrl, size: logoSize, hasBorder: logoBorder }
		: null;

	const { canvasRef, hasQR, urlError, download } = useQRRenderer({
		text: baseUrl,
		dotLevel: DOT_LEVEL,
		fgColor,
		bgColor,
		borderRadius,
		logo,
	});

	return (
		<section className={styles.layout}>
			<section className={styles.show}>
				<QrPreview
					canvasRef={canvasRef}
					hasQR={hasQR}
				/>
				<QrDownload
					download={download}
					format={format}
					hasQR={hasQR}
					setFormat={setFormat}
				/>
			</section>

			<section className={styles.controls}>
				<UrlField
					baseURL={baseUrl}
					setBaseURL={setBaseURL}
					errorURL={urlError}
				/>

				<DotShape
					DOT_LEVEL={DOT_LEVEL}
					setDOT_LEVEL={setDOT_LEVEL}
				/>

				<ErrorLevel
					borderRadius={borderRadius}
					setBorderRadius={setBorderRadius}
				/>

				<div className={styles.divider} />

				<LogoUpload
					logo={logoUrl}
					onLogoChange={setLogoUrl}
					size={logoSize}
					setSize={setLogoSize}
					border={logoBorder}
					setBorder={setLogoBorder}
				/>

				<div className={styles.divider} />

				<ColorPicker
					bgColor={bgColor}
					fgColor={fgColor}
					setBgColor={setBgColor}
					setFgColor={setFgColor}
				/>
			</section>
		</section>
	);
}
