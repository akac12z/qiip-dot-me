import styles from "./qr.module.css";

import { QR_FORMATS } from "../rules/format.ts";
import type { QRFormat } from "../rules/qr.interfaces.ts";

interface QRDownProps {
	hasQR: boolean;
	format: QRFormat;
	setFormat: React.Dispatch<React.SetStateAction<QRFormat>>;
	download: ({}: QRFormat) => void;
}

export default function QrDownload({
	setFormat,
	download,
	format,
	hasQR,
}: QRDownProps) {
	return (
		<>
			<section className={styles.downloadRow}>
				{QR_FORMATS.map((formatImg) => (
					<button
						key={formatImg}
						className={`${styles.formatBtns} ${format === formatImg ? styles.dlBtnActive : ""}`}
						onClick={() => setFormat(formatImg)}
						type="button"
					>
						{formatImg.toUpperCase()}
					</button>
				))}
			</section>
			<button
				className={styles.downloadBtn}
				onClick={() => download(format)}
				disabled={!hasQR}
				type="button"
			>
				Download {format.toUpperCase()}
			</button>
		</>
	);
}
