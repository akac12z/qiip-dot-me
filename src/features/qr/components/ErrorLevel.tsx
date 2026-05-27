import styles from "./qr.module.css";

interface ErrLevelProp {
	borderRadius: number;
	setBorderRadius: React.Dispatch<React.SetStateAction<number>>;
}

export default function ErrorLevel({
	borderRadius,
	setBorderRadius,
}: ErrLevelProp) {
	return (
		<div className={styles.field}>
			<div className={styles.sliderHeader}>
				<span className={styles.label}>Border radius</span>
				<span className={styles.sliderVal}>{borderRadius}</span>
			</div>
			<input
				className={styles.slider}
				type="range"
				min={0}
				max={5}
				step={1}
				value={borderRadius}
				onChange={(e) => setBorderRadius(Number(e.target.value))}
			/>
			<div className={styles.sliderRange}>
				<span>0</span>
				<span>5</span>
			</div>
		</div>
	);
}
