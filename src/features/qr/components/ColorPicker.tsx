import styles from "./qr.module.css";

interface ColorPickProps {
	fgColor: string;
	bgColor: string;
	setFgColor: (value: React.SetStateAction<string>) => void;
	setBgColor: (value: React.SetStateAction<string>) => void;
}

export default function ColorPicker({
	fgColor,
	bgColor,
	setFgColor,
	setBgColor,
}: ColorPickProps) {
	return (
		<div className={styles.colorRow}>
			<div className={styles.field}>
				<span className={styles.label}>Foreground color</span>
				<label className={styles.colorField}>
					<span className={styles.colorHex}>{fgColor}</span>
					<input
						type="color"
						value={fgColor}
						onChange={(e) => setFgColor(e.target.value)}
						className={styles.colorInput}
					/>
				</label>
			</div>
			<div className={styles.field}>
				<span className={styles.label}>Background color</span>
				<label className={styles.colorField}>
					<span className={styles.colorHex}>{bgColor}</span>
					<input
						type="color"
						value={bgColor}
						onChange={(e) => setBgColor(e.target.value)}
						className={styles.colorInput}
					/>
				</label>
			</div>
		</div>
	);
}
