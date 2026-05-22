import styles from "./utm.module.css";

interface UTMResultProps {
	generatedURL: string | null;
	copyUrl: () => void;
	toQR: () => void;
	// toQR: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function UTMResult({
	generatedURL,
	copyUrl,
	toQR,
}: UTMResultProps) {
	return (
		<section
			className={styles.result}
			data-ready={generatedURL ? "" : undefined}
		>
			<div className={styles.resultHead}>
				<span className={styles.resultLabel}>Generated URL</span>
			</div>
			<div className={styles.resultBody}>
				<div className={styles.resultUrl}>{generatedURL ?? ""}</div>
				<div className={styles.resultActions}>
					<button
						className={styles.btnPrimary}
						onClick={copyUrl}
						disabled={!generatedURL}
					>
						Copy URL
					</button>
					<a
						href="/qr"
						className={styles.btnSecondary}
						onClick={(e) => {
							e.preventDefault();
							toQR();
						}}
					>
						Generate QR →
					</a>
				</div>
			</div>
		</section>
	);
}
