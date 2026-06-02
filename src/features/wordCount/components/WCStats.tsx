import styles from "./wc.module.css";
import type { WCStats } from "../rules/wc.interfaces.ts";
import { STAT_TOOLTIPS } from "../rules/tootltips-desc.ts";

interface Stat {
	key: keyof WCStats;
	label: string;
	tooltip?: string;
}

const STATS: Stat[] = [
	{ key: "words", label: "Words" },
	{ key: "chars", label: "Characters", tooltip: STAT_TOOLTIPS.characters },
	{ key: "sentences", label: "Sentences", tooltip: STAT_TOOLTIPS.sentences },
	{ key: "paragraphs", label: "Paragraphs", tooltip: STAT_TOOLTIPS.paragraphs },
	{
		key: "readingTime",
		label: "Reading time (min)",
		tooltip: STAT_TOOLTIPS.readingTime,
	},
];

interface Props {
	stats: WCStats;
}

function Tooltip({ text }: { text: string }) {
	return (
		<span className={styles.tooltip}>
			<span
				className={styles.tooltipTrigger}
				tabIndex={0}
			>
				?
			</span>
			<span className={styles.tooltipContent}>{text}</span>
		</span>
	);
}

export default function WCStats({ stats }: Props) {
	return (
		<section className={styles.statsWrap}>
			{STATS.map(({ key, label, tooltip }, i) => (
				<>
					<div
						key={key}
						className={styles.statRow}
					>
						<span className={styles.statLabel}>
							{label}
							{tooltip && <Tooltip text={tooltip} />}
						</span>
						<span className={styles.statValue}>
							{stats[key].toLocaleString()}
						</span>
					</div>
					{i < STATS.length - 1 && <div className={styles.divider} />}
				</>
			))}
		</section>
	);
}
