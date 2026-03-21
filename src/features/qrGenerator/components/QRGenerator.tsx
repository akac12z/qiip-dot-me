import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import styles from "./qrGenerator.module.css";

type ExportFormat = "png" | "jpeg" | "webp" | "svg";

const FORMAT_OPTIONS: { value: ExportFormat; label: string }[] = [
	{ value: "png", label: "PNG" },
	{ value: "jpeg", label: "JPEG" },
	{ value: "webp", label: "WebP" },
	{ value: "svg", label: "SVG" },
];

export default function QRGenerator() {
	const [text, setText] = useState("");
	const [format, setFormat] = useState<ExportFormat>("png");
	const [hasQR, setHasQR] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const svgRef = useRef<string>("");

	useEffect(() => {
		const prefill = sessionStorage.getItem("qr-prefill");
		if (prefill) {
			setText(prefill);
			sessionStorage.removeItem("qr-prefill");
		}
	}, []);

	useEffect(() => {
		if (!text.trim()) {
			setHasQR(false);
			return;
		}
		const canvas = canvasRef.current;
		if (!canvas) return;

		QRCode.toCanvas(canvas, text, {
			width: 280,
			margin: 2,
			color: { dark: "#000", light: "#fff" },
		})
			.then(() => {
				setHasQR(true);
				return QRCode.toString(text, { type: "svg" });
			})
			.then((svg) => {
				svgRef.current = svg;
			})
			.catch(() => setHasQR(false));
	}, [text]);

	function download() {
		if (!hasQR) return;
		if (format === "svg") {
			const blob = new Blob([svgRef.current], { type: "image/svg+xml" });
			const url = URL.createObjectURL(blob);
			trigger(url, "qr-code.svg");
			URL.revokeObjectURL(url);
			return;
		}
		const canvas = canvasRef.current;
		if (!canvas) return;
		trigger(canvas.toDataURL(`image/${format}`, 1.0), `qr-code.${format}`);
	}

	function trigger(url: string, name: string) {
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
	}

	return (
		<section className={styles.wrapper}>
			{/* Input */}
			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor="qr-input"
				>
					Your URL
				</label>
				<input
					id="qr-input"
					className={styles.input}
					type="text"
					placeholder="https://ejemplo.com"
					value={text}
					onChange={(e) => setText(e.target.value)}
					autoFocus
				/>
				<p className={styles.hint}>Paste a URL you want to encode.</p>
			</div>

			{/* Preview */}
			<div className={styles.preview}>
				<canvas
					ref={canvasRef}
					className={styles.canvas}
					style={{ display: hasQR ? "block" : "none" }}
				/>
				{!hasQR && <p className={styles.placeholder}>The QR will show here!</p>}
			</div>

			{/* Format + download */}
			<div className={styles.exportRow}>
				<div className={styles.formatGroup}>
					{FORMAT_OPTIONS.map((opt) => (
						<button
							key={opt.value}
							className={`${styles.formatBtn} ${format === opt.value ? styles.active : ""}`}
							onClick={() => setFormat(opt.value)}
							type="button"
						>
							{opt.label}
						</button>
					))}
				</div>
				<button
					className={styles.downloadBtn}
					onClick={download}
					disabled={!hasQR}
					type="button"
				>
					Donwload {format.toUpperCase()}
				</button>
			</div>
		</section>
	);
}
