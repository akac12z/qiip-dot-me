import styles from "./qr.module.css";

import { DOT_LEVELS, type DOT_LEVEL } from "../rules/dot.ts";

interface DotShapeProps {
	DOT_LEVEL: DOT_LEVEL;
	setDOT_LEVEL: React.Dispatch<React.SetStateAction<DOT_LEVEL>>;
}

export default function DotShape({ DOT_LEVEL, setDOT_LEVEL }: DotShapeProps) {
	return (
		<div className={styles.field}>
			<span className={styles.label}>Dot correction level</span>
			<div className={styles.errorToggleGroup}>
				{DOT_LEVELS.map((level) => (
					<button
						key={level.value}
						type="button"
						className={styles.errorToggleBtn}
						data-active={DOT_LEVEL === level.value ? "true" : undefined}
						onClick={() => setDOT_LEVEL(level.value)}
					>
						<span className={styles.errorToggleName}>{level.label}</span>
						<span className={styles.errorTogglePercent}>{level.percent}</span>
					</button>
				))}
			</div>
			<span className={styles.hint}>
				Higher level = more damage resistance while printing
			</span>
		</div>
	);
}
